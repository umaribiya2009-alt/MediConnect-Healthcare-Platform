import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor'], default: 'patient' },
  specialization: String,
  experience: Number,
  qualification: String,
  consultationFee: { type: Number, default: 0 },
  availableSlots: [String]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
