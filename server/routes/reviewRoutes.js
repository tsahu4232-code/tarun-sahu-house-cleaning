const express = require("express");
const router = express.Router();

const {
createReview,
getReviews,
deleteReview
} = require("../controllers/reviewController");

const { protectAdmin } = require("../middleware/authMiddleware");

router.post("/", createReview);
router.get("/", getReviews);
router.delete("/:id", protectAdmin, deleteReview);

module.exports = router;