const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const { protectAdmin } = require("../middleware/authMiddleware");

router.post("/", protectAdmin, createService);
router.get("/", getServices);
router.put("/:id", protectAdmin, updateService);
router.delete("/:id", protectAdmin, deleteService);

module.exports = router;
