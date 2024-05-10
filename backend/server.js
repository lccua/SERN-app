require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/user');
const conversationRoutes = require('./routes/conversation')
const messageRoutes = require('./routes/message')

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes)


// Connect to server
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
