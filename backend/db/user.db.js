const prisma = require("./client/prismaClient");

class UserDb {
  async createUser(id, email, username, hashedPassword, userAuthenticationId) {
    const newUser = await prisma.user.create({
      data: {
        id: id,
        email: email,
        username: username,
        password: hashedPassword,
        created_at: new Date(),
        userAuthentication: {
          connect: { id: userAuthenticationId },
        }, 
      },
    });

    return newUser;
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

  async getOtp(email) {
    const user = await prisma.userAuthentication.findUnique({
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

  async createUserAuthentication(id, email, hashedOtp, expiresTimestamp) {
    const newUserAuthentication = await prisma.userAuthentication.upsert({
      where: { email },
      update: {
        id,
        otp: hashedOtp,
        expires_at: expiresTimestamp,
      },
      create: {
        id,
        email,
        otp: hashedOtp,
        expires_at: expiresTimestamp,
      },
    });
    return newUserAuthentication;
  }
  


  async updateUserPassword( email, hashedPassword ){
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return user;
  }
}

module.exports = new UserDb();
