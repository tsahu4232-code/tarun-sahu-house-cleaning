const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const { name, phone, address } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }

  if (!phone || !/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({
      message: "Phone number must be exactly 10 digits",
    });
  }

  if (!address || !address.trim()) {
    return res.status(400).json({ message: "Address is required" });
  }

  if (name.length > 80 || address.length > 300) {
    return res.status(400).json({ message: "Name or address is too long" });
  }

  const booking = await Booking.create({
    ...req.body,
    name: name.trim(),
    address: address.trim(),
  });

  res.json(booking);
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};

exports.updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);

  res.json({
    message: "Booking deleted successfully",
  });
};
