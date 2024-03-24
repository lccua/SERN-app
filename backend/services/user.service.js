const userDb = require("../db/user.db");
const { comparePassword, hashPassword } = require("../helpers/password.helper");
const { ErrorHandler } = require("../helpers/error.helper");
const { v4: uuidv4 } = require('uuid');



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
      const hashedPassword = await hashPassword( password );

      // Generate UUID
      const id = uuidv4();

      const newUser = await userDb.createUser( id, email, hashedPassword );

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
      const isCorrectPassword = await comparePassword(password, user.password);
      
      // Check if the password is correct
      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }
    
      return user;

    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

}

module.exports = new UserService();




