import mongoose from 'mongoose';
const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  description: String,
  preparation: String,
  price: Number
}, { timestamps: true });
export default mongoose.model('Test', testSchema);
