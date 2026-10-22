import mongoose from 'mongoose';
const reportSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  status: { type: String, enum: ['processing','available','reviewed'], default: 'processing' },
  results: [{ name: String, value: String, range: String }],
  remarks: { type: String, default: '' },
  reportDate: String
}, { timestamps: true });
export default mongoose.model('Report', reportSchema);
