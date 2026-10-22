import mongoose from 'mongoose';
const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['scheduled','completed','cancelled'], default: 'scheduled' },
  paymentStatus: { type: String, enum: ['pending','paid'], default: 'pending' },
  paymentId: String
}, { timestamps: true });
export default mongoose.model('Appointment', appointmentSchema);
