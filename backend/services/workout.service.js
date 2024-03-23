const {
  getAllWorkoutsDb,
  getWorkoutDb,
  createWorkoutDb,
} = require("../db/workout.db");

const { ErrorHandler } = require("../helpers/error");


class WorkoutService {
  async getAllWorkouts( userId ) {

    try {

      // Get all workouts
      const workouts = await getAllWorkoutsDb(userId);

      return workouts;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async getWorkout( workoutId ) {

    try {

      const workout = await getWorkoutDb(workoutId);

      if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
      }

      return workout;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async createWorkout( { workoutData, userId } ) {

    try {

      const workout = await createWorkoutDb( { workoutData, userId } );

      return workout;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

}

module.exports = new WorkoutService();
