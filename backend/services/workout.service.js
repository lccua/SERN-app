const workoutDb = require("../db/workout.db");
const { ErrorHandler } = require("../helpers/error.helper");


class WorkoutService {

  async getAllWorkouts( userId ) {

    try {

      // Get all workouts
      const workouts = await workoutDb.getAllWorkouts(userId);

      return workouts;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async getWorkout( id ) {

    try {

      const workout = await workoutDb.getWorkout( id );

      return workout;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async createWorkout( { workoutData, userId } ) {

    try {

      const workout = await workoutDb.createWorkout( { workoutData, userId } );


      return workout;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async deleteWorkout( id ) {

    try {

      const workout = await workoutDb.deleteWorkout( id );

  
      return workout;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async updateWorkout( {id, updatedWorkout} ) {

    try {

      const workout = await workoutDb.updateWorkout( {id, updatedWorkout} );
  
      return workout;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

}

module.exports = new WorkoutService();
