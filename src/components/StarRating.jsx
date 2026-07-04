import { useState } from "react";

/**
 * StarRating
 *
 * Display mode (default):
 *   <StarRating rating={4} />
 *
 * Interactive mode (for forms):
 *   <StarRating interactive value={rating} onChange={setRating} />
 */
function StarRating({
  rating = 0,
  value = 0,
  interactive = false,
  onChange,
  size = "text-2xl",
}) {
  const [hovered, setHovered] = useState(0);

  const activeValue = interactive ? (hovered || value) : rating;

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex gap-1 ${size}`}>
      {stars.map((star) => {
        const filled = star <= activeValue;

        if (!interactive) {
          return (
            <span
              key={star}
              className={filled ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          );
        }

        return (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange && onChange(star)}
            className={`transition-transform hover:scale-110 ${
              filled ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;