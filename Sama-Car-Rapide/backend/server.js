const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

// Initialize DB Connection
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Sama Car Rapide API Running');
});

// TODO: Add other routes (users, vehicles, bookings, etc.)
// const userRoutes = require('./src/routes/userRoutes');
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1)); // Consider more graceful shutdown
});
