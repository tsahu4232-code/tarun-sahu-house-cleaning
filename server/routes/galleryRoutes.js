const express = require("express");
const router = express.Router();

const {
  createImage,
  getGallery,
  updateImage,
  deleteImage,
} = require("../controllers/galleryController");

const { protectAdmin } = require("../middleware/authMiddleware");

router.post("/", protectAdmin, createImage);
router.get("/", getGallery);
router.put("/:id", protectAdmin, updateImage);
router.delete("/:id", protectAdmin, deleteImage);

module.exports = router;
