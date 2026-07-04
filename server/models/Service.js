const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    price: {
      type: String,
      required: true,
      trim: true,
    },
    note: String,
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
