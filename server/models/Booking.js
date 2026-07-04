const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
  name: String,
  phone: String,
  services: [String],
  address: String,
  date: String,
  status: {
    type: String,
    default: "Pending"
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);