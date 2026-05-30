const express = require("express");
const { detectMedia } = require("../controllers/detectionController");
const { uploadMedia } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/detect", uploadMedia, detectMedia);

module.exports = router;
