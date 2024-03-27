const bcrypt = require("bcrypt");

const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashedData = await bcrypt.hash(data, salt);
  return hashedData;
};

const compareData = async (data, hashedData) => {
  const isCorrectData = await bcrypt.compare(data, hashedData);
  return isCorrectData;
};

module.exports = { hashData, compareData };
