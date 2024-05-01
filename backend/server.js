require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const conversationsRoutes = require('./routes/conversations')
const conversationMessages = require('./routes/message')

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/conversations', conversationsRoutes)
app.use('/api/messages', conversationMessages)


// Connect to server
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
