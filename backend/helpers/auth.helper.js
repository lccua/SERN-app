const { ErrorHandler } = require("../helpers/error.helper");
const bcrypt = require("bcrypt");

const hashData = async (data) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
    
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

const compareData = async (data, hashedData) => {
  try {
    const isCorrectData = await bcrypt.compare(data, hashedData);
    return isCorrectData;
  
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

module.exports = { hashData, compareData };
