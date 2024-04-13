const userDb = require("../db/user.db");
const { compareData, hashData } = require("../helpers/auth.helper");
const { ErrorHandler } = require("../helpers/error.helper");
const { v4: uuidv4 } = require('uuid');
const otpGenerator = require('otp-generator');
const { OtpExpiryGenerator } = require("../helpers/timestamp.helper")

class UserService {
  async signUp(email, username, password, userAuthenticationId) {
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
      const hashedPassword = await hashData(password);

      // Add user to the database
      const newUser = await userDb.createUser(
        id,
        email,
        username,
        hashedPassword,
        userAuthenticationId
      );

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

  async verifyOtp(email, enteredOtp) {
    try {
      // Get hashed OTP and timestamp
      const { otp, expiresAt } = await userDb.getOtp(email);

      // Check if the OTP has expired
      const currentTime = Date.now();
      if (expiresAt && currentTime > expiresAt.getTime()) {
        throw new ErrorHandler(403, "The OTP has expired.");
      }

      // Compare OTPs
      const isCorrectOtp = await compareData(enteredOtp, otp);

      // Check if the OTP is correct
      if (!isCorrectOtp) {
        throw new ErrorHandler(403, "The entered OTP code is incorrect.");
      }

      // Set request_count to 0
      await userDb.updateOtpRequestStatus(email);

      return isCorrectOtp;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async otpRequest(email, isNewUser) { //TODO: make sure that the otp generation request is seperate from this, when the user allready exists in userverification table, it still needs to be able to send and otp to the user and store that new otp in the database table
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

      // get otp request status
      const requestStatus = await userDb.getOtpRequestStatus(email);
      if (requestStatus !== null) {

        if (requestStatus.requestCount >= 2) { // if request count is bigger or equal to 3 go to next if

          if (requestStatus.lastRequest > new Date()) {
            // if last request time is greater than currentime

            //set requestcount to 0 //set lastRequestTime to currentime
            await userDb.resetOtpRequestStatus(email);

            // Generate an OTP code
            const otp = otpGenerator.generate(6, {
              digits: true,
              lowerCaseAlphabets: false,
              upperCaseAlphabets: false,
              specialChars: false,
            });

            console.log("this is your new otp code: " + otp);

            // Hash OTP
            const hashedOtp = await hashData(otp);

            // Generate OTP expiry timestamp
            const expiresTimestamp = OtpExpiryGenerator();

            const userVerification = await userDb.updateOtpCode(
              email,
              hashedOtp,
              expiresTimestamp
            );

            return userVerification;
          } 
          else {
            console.log("To many requests have been made, wait 24 hours.")
            throw new ErrorHandler(
              403,
              "To many requests have been made, wait 24 hours."
            );

          }
        } 
        else {
          //add 1 to the requestcount //set lastrequest to currentime
          await userDb.updateOtpRequestStatus(email);

          // Generate an OTP code
          const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          });

          console.log("this is your new otp code: " + otp);

          // Hash OTP
          const hashedOtp = await hashData(otp);

          // Generate OTP expiry timestamp
          const expiresTimestamp = OtpExpiryGenerator();

          const userVerification = await userDb.updateOtpCode(
            email,
            hashedOtp,
            expiresTimestamp
          );


          return userVerification;
        }
      } 
      else { // IMPORTANT: first otp request when creating the account isn't added to the otp request count
        console.log("createing user..");

        // Generate UUID
        const id = uuidv4();

        // Generate an OTP code
        const otp = otpGenerator.generate(6, {
          digits: true,
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });

        console.log("this is your new otp code: " + otp)

        // Hash OTP
        const hashedOtp = await hashData(otp);

        // Generate OTP expiry timestamp
        const expiresTimestamp = OtpExpiryGenerator();

        const userVerification = await userDb.createUserAuthentication(
          id,
          email,
          hashedOtp,
          expiresTimestamp
        );

        return userVerification;
      }
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async passwordReset(email, password) {
    try {
      // Hash Password
      const hashedPassword = await hashData(password);

      // Update user in the database
      const updatedUser = await userDb.updateUserPassword(
        email,
        hashedPassword
      );

      return updatedUser;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
}

module.exports = new UserService();




