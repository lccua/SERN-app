const prisma = require("./client/prismaClient");

class UserDb {
  async createUser(id, email, hashedPassword) {
    const newUser = await prisma.user.create({
      data: {
        id,
        email,
        password: hashedPassword,
      }
    });

    return newUser;
  }

  async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    return user;
  }
}

module.exports = new UserDb();
