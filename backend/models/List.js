import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstName: String,
  phone: String,
  notes: String,
});

export default mongoose.model('List', listSchema);