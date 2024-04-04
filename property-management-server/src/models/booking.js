const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  propertyId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
});

let Booking = (module.exports = mongoose.model(
  "Booking",
  bookingSchema,
  "Bookings"
));
