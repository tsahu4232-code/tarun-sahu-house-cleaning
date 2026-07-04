import { useState } from "react";
import API from "../utils/axiosConfig";
import StarRating from "./StarRating";

function ReviewForm({ onReviewAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    review: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (star) => {
    setFormData({
      ...formData,
      rating: star,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.review.trim()) {
      setError("Please fill in your name and review.");
      return;
    }

    if (!formData.rating) {
      setError("Please select a star rating.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await API.post("/reviews", formData);

      setFormData({
        name: "",
        rating: 0,
        review: "",
      });

      if (onReviewAdded) {
        onReviewAdded(res.data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto"
    >
      <h3 className="text-xl font-bold">Leave a Review</h3>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <div>
        <p className="text-sm text-gray-600 mb-1">Your Rating</p>
        <StarRating
          interactive
          value={formData.rating}
          onChange={handleRatingChange}
        />
      </div>

      <textarea
        name="review"
        placeholder="Write your review"
        value={formData.review}
        onChange={handleChange}
        rows={4}
        className="w-full border p-3 rounded"
      />

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;