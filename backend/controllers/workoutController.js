const prisma = require("../db/client/prismaClient")
const workoutService = require("../services/workout.service");
const { ErrorHandler } = require("../helpers/error");



// get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    
    const userId = req.user.id; // Assuming req.user has the user ID
  
    const workouts = await workoutService.getAllWorkouts( userId );
    
    res.status(200).json(workouts);

  }
  catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }

};

// get a single workout
const getWorkout = async (req, res) => {

  try {
    const { workoutId } = req.params;

    const workout = await workoutService.getWorkout( workoutId );

    res.status(200).json(workout);  
    
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
  
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const userId = req.user.id; // Assuming req.user has the user ID

  try {
    const workoutData = { title, load, reps };

    const workout = await workoutService.createWorkout( { workoutData, userId } );

    res.status(200).json(workout);

  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
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
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};
