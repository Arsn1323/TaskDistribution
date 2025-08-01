import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import agentRoutes from './routes/agent.js';
import listRoutes from './routes/list.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes);


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
 
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

app.listen(process.env.PORT,()=>{
    console.log(`server is listen on ${process.env.PORT}`)
    connectDB()
  })






  