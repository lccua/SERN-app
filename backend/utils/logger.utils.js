// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'error', // Set the minimum level of messages to log
  format: winston.format.json(), // Define the log format as JSON
  transports: [
    new winston.transports.Console(), // Log to the console
    // Add more transports here if needed, such as logging to a file
  ],
});

module.exports = logger;
