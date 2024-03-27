const userDb = require("../db/user.db");
const { compareData, hashData } = require("../helpers/auth.helper");
const { ErrorHandler } = require("../helpers/error.helper");
const { v4: uuidv4 } = require('uuid');
const otpGenerator = require('otp-generator');




class UserService {
  
  async signUp( email, password ) {

    try {

      // Find user by email
      const user = await userDb.getUserByEmail(email);

      // Check if user is allready present in db
      if (user) {
        throw new ErrorHandler(401, "Email is allready in use.");
      }

      // Hash Password
      const hashedPassword = await hashData( password );

      // Generate UUID
      const id = uuidv4();

      // Generate an OTP code
      const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

      // Hash OTP
      const hashedOtp = await hashData( otp );

      // Generate OTP expiry timestamp
      const expiryTimestamp = new Date();
      expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 15);

      // Add user to the database
      const newUser = await userDb.createUser( id, email, hashedPassword, hashedOtp, expiryTimestamp );

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

  async otpVerification( userId, insertedOtp ) {
    try {

     
      const otp = await userDb.getOtp( userId );

    
  
      if (!otp) {
        throw new ErrorHandler(403, "Email or password incorrect.");

      }
    
      // Compare passwords
      const isCorrectOtp = await compareData(insertedOtp, otp);
      
      // Check if the password is correct
      if (!isCorrectOtp) {
        throw new ErrorHandler(403, "The inserted OTP code is incorrect.");
      }
    
      return otp;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

}

module.exports = new UserService();




