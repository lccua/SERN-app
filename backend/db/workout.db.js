const prisma = require("./client/prismaClient")

const getAllWorkoutsDb = async ( user_id ) => {
 
  const workouts = await prisma.workout.findMany({
    where: { user_id },
  });

  return workouts;

};

const getWorkoutDb = async ( id ) => {
 
  const workout = await prisma.workout.findUnique({
    where: { id }
  });

  return workout;

};

const createWorkoutDb = async ( { workoutData, userId } ) => {
  
  const {title, load, reps} = workoutData;
  
  const workout = await prisma.workout.create({
    data: {
      title : title,
      load: parseInt(load), // Convert load to integer
      reps: parseInt(reps), // Convert reps to integer
      user: { connect: { id: userId } } // Connect the workout to the user
    }
  });

  return workout;

};



module.exports = {
  getAllWorkoutsDb,
  getWorkoutDb,
  createWorkoutDb,
  
};
