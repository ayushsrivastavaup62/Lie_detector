const express = require("express");
const { deleteHistoryItem, getDashboard } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", protect, getDashboard);
router.delete("/dashboard/history/:id", protect, deleteHistoryItem);

module.exports = router;
