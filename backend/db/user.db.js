const prisma = require("./client/prismaClient");

class UserDb {
  async createUser(id, email, hashedPassword, hashedOtp) {
    const newUser = await prisma.user.create({
      data: {
        id,
        email,
        password: hashedPassword,
        hashedOtp,
        expiryTimestamp,
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

  async getOtp(id) {

    const otp = await prisma.user.findFirst({
      where: { id },
      select: { otp: true }
    });
  
    return otp; 
  }
  
}

module.exports = new UserDb();
