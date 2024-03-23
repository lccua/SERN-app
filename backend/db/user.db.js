const prisma = require("../db/prismaClient")

const createUserDb = async ( id, email, hashedPassword ) => {
  const newUser = await prisma.user.create({
    data: {
      id,
      email,
      password: hashedPassword,
    }
  });

  return newUser;

};

const getUserByEmailDb = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  return user;
};


module.exports = {
  createUserDb,
  getUserByEmailDb
};
