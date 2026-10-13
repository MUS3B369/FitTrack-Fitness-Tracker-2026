import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    age: { type: Number, default: 20, min: 1, max: 120 },
    height: { type: Number, default: 170, min: 50, max: 250 },
    weight: { type: Number, default: 70, min: 20, max: 300 },
    dailyStepGoal: { type: Number, default: 8000, min: 1000 },
    dailyCalorieGoal: { type: Number, default: 500, min: 50 }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
