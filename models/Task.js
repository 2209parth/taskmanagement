import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  status: {
    type: String,
    enum: ['open', 'claimed', 'done'],
    default: 'open',
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
