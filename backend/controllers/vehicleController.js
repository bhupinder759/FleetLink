const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const calculateRideDuration = require('../utils/rideDuration');

const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;

    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVehicle = new Vehicle({ name, capacityKg, tyres });
    const savedVehicle = await newVehicle.save();

    return res.status(201).json(savedVehicle);
  } catch (error) {
    console.error("Error adding vehicle:", error.message);
    res.status(500).json({ message: "Server error while adding vehicle" });
  }
};

const getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ message: "Missing required query parameters" });
    }

    const parsedStart = new Date(startTime);
    const rideDuration = calculateRideDuration(fromPincode, toPincode);
    const endTime = new Date(parsedStart.getTime() + rideDuration * 60 * 60 * 1000); 

    // Find all vehicles matching capacity
    const eligibleVehicles = await Vehicle.find({
      capacityKg: { $gte: Number(capacityRequired) }
    });

    //  Filter out booked ones
    const availableVehicles = [];

    for (let vehicle of eligibleVehicles) {
      const overlappingBookings = await Booking.findOne({
        vehicleId: vehicle._id,
        $or: [
          {
            startTime: { $lt: endTime },
            endTime: { $gt: parsedStart }
          }
        ]
      });

      if (!overlappingBookings) {
        availableVehicles.push({
          ...vehicle._doc,
          estimatedRideDurationHours: rideDuration
        });
      }
    }

    res.status(200).json(availableVehicles);
  } catch (error) {
    console.error("Error finding available vehicles:", error.message);
    res.status(500).json({ message: "Server error while checking availability" });
  }
};

module.exports = {
  addVehicle,
  getAvailableVehicles
};
