const { v4: uuidv4 } = require('uuid');
//todo: try to make it so that the database queries do this job
const UUIDv4Generator = () => {
  return uuidv4();
};

module.exports = { UUIDv4Generator };
