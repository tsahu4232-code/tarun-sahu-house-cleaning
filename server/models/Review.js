const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
name: String,
rating: Number,
review: String
},
{
timestamps: true
}
);

module.exports = mongoose.model("Review", reviewSchema);