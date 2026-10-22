import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (_req,res)=>res.json({name:'MediConnect API',status:'running'}));
app.use('/api/auth', authRoutes);
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(()=>app.listen(PORT,()=>console.log(`MediConnect API running on http://localhost:${PORT}`)))
  .catch(err=>{console.error('MongoDB connection failed:',err.message); process.exit(1);});
