import StarRating from "./StarRating";

function ReviewCard({ name, review, rating = 5, date }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
      <StarRating rating={rating} size="text-lg" />

      <h3 className="font-bold text-xl mt-3">{name}</h3>

      <p className="text-gray-600 mt-3">{review}</p>

      {date && (
        <p className="text-gray-400 text-xs mt-3">
          {new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  );
}

export default ReviewCard;