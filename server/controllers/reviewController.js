const Review = require("../models/Review");

exports.createReview = async (req, res) => {
try {
const { name, rating, review } = req.body;

if (!name || !name.trim() || !review || !review.trim()) {
  return res.status(400).json({ message: "Name and review are required" });
}

if (name.length > 80) {
  return res.status(400).json({ message: "Name is too long" });
}

if (review.length > 1000) {
  return res.status(400).json({ message: "Review is too long (max 1000 characters)" });
}

const numericRating = Number(rating);
if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
  return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
}

const createdReview = await Review.create({
  name: name.trim(),
  rating: numericRating,
  review: review.trim(),
});

res.status(201).json(createdReview);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.getReviews = async (req, res) => {
try {
const reviews = await Review.find().sort({ createdAt: -1 });
res.json(reviews);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.deleteReview = async (req, res) => {
try {
const review = await Review.findByIdAndDelete(req.params.id);

if (!review) {
  return res.status(404).json({ message: "Review not found" });
}

res.json({ message: "Review deleted" });
} catch (error) {
res.status(500).json({ message: error.message });
}
};