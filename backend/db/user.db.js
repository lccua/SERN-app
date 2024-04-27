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
        user_verification: {
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
    const user = await prisma.user_verification.findUnique({
        where: { email },
        select: { otp: true, expires_at: true },
    });

    const userVerification = user ? { otp: user.otp, expiresAt: user.expires_at } : null;

    return userVerification;
  }


  async updateUserVerification(email) {
    const user = await prisma.user.update({
      where: { email },
      data: { created_at: new Date() },
    });

    return user;
  }

  async createUserAuthentication(id, email, hashedOtp, expiresTimestamp) {
    const newUserAuthentication = await prisma.user_verification.upsert({
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

  async resetOtpRequestStatus(email) {
    const userVerification = await prisma.user_verification.update({
        where: { email },
        data: {
            request_count: 0,
            last_request: new Date()
        }
    });

    return userVerification
  }

  async updateOtpRequestStatus(email) {
   const userVerification = await prisma.user_verification.update({
        where: { email },
        data: {
            request_count: {
                increment: 1
            },
            last_request: new Date()
        }
    });
    return userVerification

  }

  async getOtpRequestStatus(email) {
    const userVerification = await prisma.user_verification.findUnique({
        where: { email },
        select: { request_count: true, last_request: true },
    });

    if (!userVerification) {
      // Handle case where user is not found
      return null;
    }

    return { requestCount: userVerification.request_count, lastRequest: userVerification.last_request }
  }

  async updateOtpCode(email, hashedOtp, expiresTimestamp) {
    const userVerification = await prisma.user_verification.update({
      where: { email },
      data: { otp: hashedOtp, expires_at: expiresTimestamp },
    });

    return userVerification
  }


}

module.exports = new UserDb();
