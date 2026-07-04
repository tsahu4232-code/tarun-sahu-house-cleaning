import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";

function ReviewsList({ newReview }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (newReview) {
      setReviews((prev) => [newReview, ...prev]);
    }
  }, [newReview]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to load reviews", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No reviews yet. Be the first to leave one!
      </p>
    );
  }

  const averageRating =
    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  return (
    <div className="mt-10">
      <div className="flex flex-col items-center mb-8">
        <div className="text-3xl font-bold">{averageRating.toFixed(1)} / 5</div>
        <StarRating rating={Math.round(averageRating)} />
        <p className="text-gray-500 text-sm mt-1">
          Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            name={review.name}
            review={review.review}
            rating={review.rating}
            date={review.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewsList;