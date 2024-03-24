const prisma = require("./client/prismaClient");
const { ErrorHandler } = require("../helpers/error.helper");


class WorkoutDb {
  async getAllWorkouts(user_id) {
    try {
      const workouts = await prisma.workout.findMany({
        where: { user_id },
      });
      return workouts;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async getWorkout(id) {
    try {
      const workout = await prisma.workout.findUnique({
        where: { id }
      });
      return workout;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async createWorkout({ workoutData, userId }) {
    try {
      const { title, load, reps } = workoutData;
      const workout = await prisma.workout.create({
        data: {
          title: title,
          load: parseInt(load), // Convert load to integer
          reps: parseInt(reps), // Convert reps to integer
          user: { connect: { id: userId } } // Connect the workout to the user
        }
      });
      return workout;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async deleteWorkout(id) {
    try {
      const workout = await prisma.workout.delete({
        where: { id }
      });
      return workout;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async updateWorkout({ id, updatedWorkout }) {
    try {
      const workout = await prisma.workout.update({
        where: { id },
        data: updatedWorkout
      });
      return workout;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
}

module.exports = new WorkoutDb();
