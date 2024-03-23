const prisma = require("../db/prismaClient")


// get all workouts
const getWorkouts = async (req, res) => {
  
  const user_id = req.user.id; // Assuming req.user has the user ID
  const workouts = await prisma.workout.findMany({
    where: { user_id },
  });

  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  const workout = await prisma.workout.findUnique({
    where: { id }
  });

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  if (!title || !load || !reps) {
    return res.status(400).json({ error: 'Please fill in all the fields' });
  }

  try {
    const user_id = req.user.id; // Assuming req.user has the user ID
    const workout = await prisma.workout.create({
      data: {
        title,
        load: parseInt(load), // Convert load to integer
        reps: parseInt(reps), // Convert load to integer
        user: { connect: { id: user_id } } // Connect the workout to the user
      }
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  const workout = await prisma.workout.delete({
    where: { id }
  });

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await prisma.workout.update({
      where: { id },
      data: { ...req.body }
    });

    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: 'No such workout' });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};
