import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Test from './models/Test.js';
import Appointment from './models/Appointment.js';
import Report from './models/Report.js';

await mongoose.connect(process.env.MONGO_URI);
await Promise.all([User.deleteMany({}), Test.deleteMany({}), Appointment.deleteMany({}), Report.deleteMany({})]);
const password = await bcrypt.hash('password123',10);
const patient = await User.create({name:'Anika Kapoor',email:'anika.kapoor@example.com',password,role:'patient'});
const doctors = await User.insertMany([
 {name:'Dr. Priya Sharma',email:'priya.sharma@mediconnect.com',password,role:'doctor',specialization:'Cardiologist',experience:10,qualification:'MBBS, MD',consultationFee:300},
 {name:'Dr. Arun Kumar',email:'arun.kumar@mediconnect.com',password,role:'doctor',specialization:'General Physician',experience:8,qualification:'MBBS, MD',consultationFee:250},
 {name:'Dr. Meera Iyer',email:'meera.iyer@mediconnect.com',password,role:'doctor',specialization:'Endocrinologist',experience:12,qualification:'MBBS, DM',consultationFee:350}
]);
const tests = await Test.insertMany([
 {name:'Complete Blood Count (CBC)',category:'Blood Test',description:'Measures red cells, white cells, hemoglobin and platelets.',preparation:'No special preparation.',price:450},
 {name:'Lipid Profile',category:'Blood Test',description:'Measures cholesterol and triglyceride levels.',preparation:'Fast for 8–12 hours if advised by your doctor.',price:600},
 {name:'Blood Sugar',category:'Diabetes',description:'Checks blood glucose level.',preparation:'Follow the fasting instructions given during booking.',price:250},
 {name:'Thyroid Profile',category:'Endocrinology',description:'Measures thyroid-related hormones.',preparation:'Usually no special preparation.',price:500}
]);
const appointment = await Appointment.create({patient:patient._id,doctor:doctors[0]._id,test:tests[0]._id,date:'2026-09-30',time:'4:30 PM',status:'scheduled',paymentStatus:'paid',paymentId:'MOCK-SEED-001'});
await Report.create({appointment:appointment._id,patient:patient._id,doctor:doctors[0]._id,test:tests[0]._id,status:'available',reportDate:'2026-09-30',results:[{name:'Hemoglobin',value:'13.2 g/dL',range:'12–16 g/dL'},{name:'WBC',value:'7,200 /µL',range:'4,000–11,000 /µL'},{name:'Platelets',value:'250,000 /µL',range:'150,000–450,000 /µL'}],remarks:'Sample report for the MediConnect prototype.'});
console.log('Seed complete. Patient:',patient.email,'Doctor:',doctors[0].email);
await mongoose.disconnect();
