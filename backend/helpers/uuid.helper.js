const { v4: uuidv4 } = require('uuid');

const UUIDv4Generator = () => {
  return uuidv4();
};

module.exports = { UUIDv4Generator };
