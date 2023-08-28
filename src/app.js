// app.js
const express = require('express');
const { container, TYPES } = require('./app-container');

const app = express();

// Create a new Container instance for each request
app.use((req, res, next) => {
  req.container = container;
  next();
});

app.get('/users/:id', (req, res) => {
  const userController = req.container.get(TYPES.UserController);
  userController.getUser(req, res);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});