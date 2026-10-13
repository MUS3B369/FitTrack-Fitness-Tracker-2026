import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    steps: { type: Number, default: 0, min: 0 },
    distance: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Workout', workoutSchema);
