const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const calculateRideDuration = require('../utils/rideDuration');

const bookVehicle = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const parsedStart = new Date(startTime);
    const rideDuration = calculateRideDuration(fromPincode, toPincode);
    const bookingEndTime = new Date(parsedStart.getTime() + rideDuration * 60 * 60 * 1000);

    const conflictingBooking = await Booking.findOne({
      vehicleId,
      $or: [
        {
          startTime: { $lt: bookingEndTime },
          endTime: { $gt: parsedStart }
        }
      ]
    });

    if (conflictingBooking) {
      return res.status(409).json({ message: "Vehicle is already booked during this time slot" });
    }

    const booking = new Booking({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: parsedStart,
      endTime: bookingEndTime,
      customerId
    });

    const savedBooking = await booking.save();
    return res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error booking vehicle:", error.message);
    res.status(500).json({ message: "Server error while booking vehicle" });
  }
};

const getBookingsByCustomer = async (req, res) => {
  const { customerId } = req.query;

  try {
    if (!customerId) {
      return res.status(400).json({ message: "customerId is required" });
    }

    const bookings = await Booking.find({ customerId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Failed to delete booking" });
  }
};

module.exports = {
  bookVehicle,
  getBookingsByCustomer,
  deleteBooking
};
