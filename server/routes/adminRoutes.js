const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { protectAdmin } = require("../middleware/authMiddleware");

// Every route below requires a valid admin JWT
router.use(protectAdmin);

router.get("/bookings", async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

router.put("/bookings/:id", async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(booking);
});

router.delete("/bookings/:id", async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);

  res.json({
    message: "Booking deleted successfully",
  });
});

module.exports = router;
