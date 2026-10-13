import Workout from '../models/Workout.js';

export async function createWorkout(req, res) {
  try {
    const { type, duration, calories, steps, distance, date } = req.body;
    if (!type || !duration || calories === undefined) {
      return res.status(400).json({ message: 'Type, duration and calories are required' });
    }
    const workout = await Workout.create({
      user: req.userId,
      type,
      duration,
      calories,
      steps: steps || 0,
      distance: distance || 0,
      date: date ? new Date(date) : new Date()
    });
    res.status(201).json({ workout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function listWorkouts(req, res) {
  try {
    const workouts = await Workout.find({ user: req.userId }).sort({ date: -1 }).limit(50);
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function dashboard(req, res) {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const [user, todayWorkouts, recentWorkouts] = await Promise.all([
      import('../models/User.js').then(({ default: U }) => U.findById(req.userId)),
      Workout.find({ user: req.userId, date: { $gte: start, $lt: end } }),
      Workout.find({ user: req.userId }).sort({ date: -1 }).limit(7)
    ]);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const totals = todayWorkouts.reduce(
      (acc, w) => ({
        duration: acc.duration + w.duration,
        calories: acc.calories + w.calories,
        steps: acc.steps + w.steps,
        distance: acc.distance + w.distance
      }),
      { duration: 0, calories: 0, steps: 0, distance: 0 }
    );

    const heightM = user.height / 100;
    const bmi = heightM > 0 ? +(user.weight / (heightM * heightM)).toFixed(1) : 0;

    res.json({ user: { ...user.toObject(), password: undefined }, totals, bmi, recentWorkouts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
