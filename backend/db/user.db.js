const prisma = require("./client/prismaClient");

class UserDb {
  async createUser(id, username, hashedPassword) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: username,
        password: hashedPassword,
        created_at: new Date(),
        otp: null,
        expires_at: null
      },
    });
  
    return updatedUser;
  }
  

  async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async getUserByUsername(username) {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user;
  }

  async getOtp( email ) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { otp: true },
    });

    const otp = user ? user.otp : null;

    return otp; 
  }

  async updateUserVerification(email) {
    const user = await prisma.user.update({
      where: { email },
      data: { created_at: new Date() },
    });

    return user;
  }

  async initializeUser( id, email, hashedOtp, expiresTimestamp) {

    const newUser = await prisma.user.create({
      data: {
        id,
        email,
        password: null,
        created_at: null,
        updated_at: null,
        otp: hashedOtp,
        expires_at: expiresTimestamp,
      },
    });
    return newUser;

  }
}

module.exports = new UserDb();
