const userDb = require("../db/user.db");
const { compareData, hashData } = require("../helpers/auth.helper");
const { ErrorHandler } = require("../helpers/error.helper");
const { v4: uuidv4 } = require('uuid');
const otpGenerator = require('otp-generator');
const { OtpExpiryGenerator } = require("../helpers/timestamp.helper")

class UserService {
  
  async signUp( email, username, password, userAuthenticationId ) {

    try {      
      // Find user by username
      const user = await userDb.getUserByUsername(username);

      // Check if user is allready present in db
      if (user) {
        throw new ErrorHandler(401, "Username is allready in use.");
      }

      // Generate UUID
      const id = uuidv4();

      // Hash Password
      const hashedPassword = await hashData( password );

      // Add user to the database
      const newUser = await userDb.createUser( id, email, username, hashedPassword, userAuthenticationId );

      return newUser;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async login(email, password) {

    try {

      // Find user by email
      const user = await userDb.getUserByEmail(email);

      // Check if the user exists
      if (!user) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }

      // Compare passwords
      const isCorrectPassword = await compareData(password, user.password);
      
      // Check if the password is correct
      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }
    
      return user;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async verifyOtp( email , otp ) {
    try {
      // Get hahsed OTP
      const hashedOtp = await userDb.getOtp( email );

      // Compare OTPs
      const isCorrectOtp = await compareData(otp, hashedOtp);

      console.log(isCorrectOtp)
      
      // Check if the password is correct
      if (!isCorrectOtp) {
        throw new ErrorHandler(403, "The inserted OTP code is incorrect.");
      }

      return isCorrectOtp;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async  otpRequest(email, isNewUser) {
    try {
      // Find user by email
      const user = await userDb.getUserByEmail(email);
  
      // Check if user is already present in db
      if ((isNewUser && user) || (!isNewUser && !user)) {
        throw new ErrorHandler(
          401,
          isNewUser
            ? "Email is already linked to an account."
            : "There is no such account with the given email."
        );
      }
  
      // Generate UUID
      const id = uuidv4();
  
      // Generate an OTP code
      const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
  
      console.log("this is my otp code: " + otp);
  
      // Hash OTP
      const hashedOtp = await hashData(otp);
  
      // Generate OTP expiry timestamp
      const expiresTimestamp = OtpExpiryGenerator();
  
      const newUserAuthentication = await userDb.createUserAuthentication(
        id,
        email,
        hashedOtp,
        expiresTimestamp
      );
  
      return newUserAuthentication;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  


  async passwordReset( email, password ) {

    try {      
      
      // Hash Password
      const hashedPassword = await hashData( password );

      // Update user in the database
      const updatedUser = await userDb.updateUserPassword( email, hashedPassword );

      return updatedUser;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
}

module.exports = new UserService();




