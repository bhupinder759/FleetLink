const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  capacityKg: {
    type: Number,
    required: true,
    min: 1
  },
  tyres: {
    type: Number,
    required: true,
    min: 2
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
