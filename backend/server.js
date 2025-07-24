const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Default Route
app.get('/', (req, res) => {
  res.send('FleetLink API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
