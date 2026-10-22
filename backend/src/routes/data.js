import express from 'express';
import Test from '../models/Test.js';
import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import Report from '../models/Report.js';
import { auth, role } from '../middleware/auth.js';

const router = express.Router();

router.get('/tests', auth, async (_req,res) => res.json(await Test.find().sort({name:1})));
router.get('/doctors', auth, async (_req,res) => res.json(await User.find({role:'doctor'}).select('-password')));

router.post('/appointments', auth, role('patient'), async (req,res) => {
  try {
    const { doctorId, testId, date, time } = req.body;
    const exists = await Appointment.findOne({ doctor: doctorId, date, time, status: 'scheduled' });
    if (exists) return res.status(409).json({message:'That time slot is already booked'});
    const appointment = await Appointment.create({ patient:req.user._id, doctor:doctorId, test:testId, date, time });
    const full = await Appointment.findById(appointment._id).populate('doctor','name specialization consultationFee').populate('test','name price');
    res.status(201).json(full);
  } catch(e) { res.status(500).json({message:e.message}); }
});

router.get('/appointments', auth, async (req,res) => {
  const filter = req.user.role === 'patient' ? {patient:req.user._id} : {doctor:req.user._id};
  const data = await Appointment.find(filter).populate('patient','name email').populate('doctor','name specialization consultationFee').populate('test','name price').sort({date:1,time:1});
  res.json(data);
});

router.post('/appointments/:id/pay', auth, role('patient'), async (req,res) => {
  const appt = await Appointment.findOne({_id:req.params.id, patient:req.user._id});
  if (!appt) return res.status(404).json({message:'Appointment not found'});
  appt.paymentStatus='paid'; appt.paymentId='MOCK-'+Date.now(); await appt.save();
  res.json({message:'Payment successful', paymentId:appt.paymentId, appointment:appt});
});

router.get('/reports', auth, async (req,res) => {
  const filter = req.user.role === 'patient' ? {patient:req.user._id} : {doctor:req.user._id};
  const reports = await Report.find(filter).populate('patient','name email').populate('doctor','name specialization').populate('test','name').sort({createdAt:-1});
  res.json(reports);
});

router.patch('/reports/:id/review', auth, role('doctor'), async (req,res) => {
  const report = await Report.findOne({_id:req.params.id, doctor:req.user._id});
  if (!report) return res.status(404).json({message:'Report not found'});
  report.status='reviewed'; report.remarks=req.body.remarks || report.remarks; await report.save();
  res.json(report);
});

router.get('/dashboard', auth, async (req,res) => {
  if (req.user.role === 'patient') {
    const appointments = await Appointment.find({patient:req.user._id}).populate('doctor','name specialization').populate('test','name price');
    const reports = await Report.find({patient:req.user._id}).populate('doctor','name').populate('test','name');
    return res.json({ appointments, reports });
  }
  const appointments = await Appointment.find({doctor:req.user._id}).populate('patient','name email').populate('test','name');
  const reports = await Report.find({doctor:req.user._id}).populate('patient','name').populate('test','name');
  res.json({appointments,reports});
});

export default router;
