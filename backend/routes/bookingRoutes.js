const express = require('express');
const router = express.Router();
const { bookVehicle, getBookingsByCustomer, deleteBooking } = require('../controllers/bookingController');

router.post('/', bookVehicle);
router.get("/get", getBookingsByCustomer);
router.delete("/:id", deleteBooking);

module.exports = router;
