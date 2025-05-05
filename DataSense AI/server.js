require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/task-manager';

mongoose.connect(mongoURI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/', taskRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});