const express = require("express");
const { getTrendingNews } = require("../controllers/newsController");

const router = express.Router();

router.get("/trending-news", getTrendingNews);

module.exports = router;
