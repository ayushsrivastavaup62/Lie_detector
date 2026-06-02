const axios = require("axios");

const GNEWS_SEARCH_URL = "https://gnews.io/api/v4/search";
const CACHE_TTL_MS = 30 * 60 * 1000;
const TRENDING_QUERY = "deepfake AI misinformation";
const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85";

const FALLBACK_ARTICLES = [
  {
    title: "Synthetic disaster footage spreads across short-video platforms",
    category: "Public Safety",
    riskLevel: "Critical",
    description: "Multiple accounts shared computer-generated emergency scenes before official agencies could publish corrections.",
    publishedAt: "2026-05-28T00:00:00Z",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    source: "Lie_detector sample",
    url: "",
  },
  {
    title: "AI-generated celebrity endorsement used in crypto promotion",
    category: "Finance",
    riskLevel: "High",
    description: "A realistic fake video imitated a public figure to push a suspicious investment link.",
    publishedAt: "2026-05-24T00:00:00Z",
    image: "https://images.unsplash.com/photo-1642790551116-18e150f248e1?auto=format&fit=crop&w=900&q=85",
    source: "Lie_detector sample",
    url: "",
  },
  {
    title: "Fabricated protest images amplified by coordinated accounts",
    category: "Civic Integrity",
    riskLevel: "High",
    description: "Image artifacts and inconsistent signage suggested the viral gallery was synthetically produced.",
    publishedAt: "2026-05-19T00:00:00Z",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=85",
    source: "Lie_detector sample",
    url: "",
  },
  {
    title: "Deepfake product recall notice confuses online shoppers",
    category: "Consumer Trust",
    riskLevel: "Medium",
    description: "A counterfeit announcement page used AI-generated packaging images and false safety claims.",
    publishedAt: "2026-05-12T00:00:00Z",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
    source: "Lie_detector sample",
    url: "",
  },
];

let cachedNews = null;
let cacheExpiresAt = 0;

function getRiskLevel(article) {
  const haystack = `${article.title || ""} ${article.description || ""} ${article.content || ""}`.toLowerCase();

  const highKeywords = ["deepfake", "scam", "fraud", "fake video", "misinformation", "election", "celebrity fake"];
  const mediumKeywords = ["ai generated", "synthetic media", "fake image"];

  if (highKeywords.some((keyword) => haystack.includes(keyword))) return "High";
  if (mediumKeywords.some((keyword) => haystack.includes(keyword))) return "Medium";
  return "Low";
}

function normalizeArticle(article) {
  return {
    title: article.title || "Untitled article",
    description: article.description || "No description available.",
    content: article.content || "",
    url: article.url || "",
    image: article.image || PLACEHOLDER_IMAGE,
    source: article.source?.name || "Unknown source",
    publishedAt: article.publishedAt || "",
    category: "Deepfake / AI Misinformation",
    riskLevel: getRiskLevel(article),
  };
}

function dedupeArticles(articles) {
  const seen = new Set();

  return articles.filter((article) => {
    const key = (article.url || article.title || "").toLowerCase().trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchTrendingArticles(apiKey) {
  try {
    const response = await axios.get(GNEWS_SEARCH_URL, {
      params: {
        q: TRENDING_QUERY,
        lang: "en",
        max: 10,
        sortby: "publishedAt",
        apikey: apiKey,
      },
      timeout: 12000,
    });

    const articles = Array.isArray(response.data?.articles) ? response.data.articles : [];

    console.info(
      "[GNews] Query response",
      JSON.stringify({
        query: TRENDING_QUERY,
        status: response.status,
        totalArticles: response.data?.totalArticles ?? null,
        articleCount: articles.length,
        firstTitle: articles[0]?.title || null,
      })
    );

    return articles;
  } catch (error) {
    console.error(
      "[GNews] Query error",
      JSON.stringify({
        query: TRENDING_QUERY,
        status: error.response?.status || null,
        message: error.message,
        response: error.response?.data || null,
      })
    );

    throw error;
  }
}

async function getTrendingNews(_req, res) {
  try {
    if (cachedNews && Date.now() < cacheExpiresAt) {
      res.json({
        success: true,
        articles: cachedNews,
        cached: true,
        message: "Trending news loaded from the 30-minute cache.",
      });
      return;
    }

    const apiKey = process.env.GNEWS_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        success: false,
        message: "GNews API key is missing. Add GNEWS_API_KEY to backend/.env.",
      });
      return;
    }

    const articles = await fetchTrendingArticles(apiKey);
    const normalizedArticles = dedupeArticles(articles)
      .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
      .slice(0, 12)
      .map(normalizeArticle);

    console.info(
      "[GNews] Trending summary",
      JSON.stringify({
        query: TRENDING_QUERY,
        receivedCount: articles.length,
        dedupedCount: normalizedArticles.length,
      })
    );

    if (!normalizedArticles.length) {
      res.status(404).json({
        success: false,
        message: "No trending AI-fake news articles were found right now.",
      });
      return;
    }

    cachedNews = normalizedArticles;
    cacheExpiresAt = Date.now() + CACHE_TTL_MS;

    res.json({
      success: true,
      articles: normalizedArticles,
      cached: false,
      message: "Trending news loaded from GNews.",
    });
  } catch (error) {
    console.error(
      "[GNews] Trending endpoint error",
      JSON.stringify({
        message: error.message,
        status: error.response?.status || null,
        response: error.response?.data || null,
      })
    );

    if (error.response?.status === 429) {
      if (cachedNews?.length) {
        res.json({
          success: false,
          articles: cachedNews,
          cached: true,
          message: "GNews rate limit reached. Showing cached trending articles.",
        });
        return;
      }

      res.json({
        success: false,
        articles: FALLBACK_ARTICLES,
        cached: false,
        fallback: true,
        message: "GNews rate limit reached and no cached articles are available. Showing fallback sample articles.",
      });
      return;
    }

    res.status(502).json({
      success: false,
      message: "Live trending news could not be loaded right now.",
    });
  }
}

module.exports = { getTrendingNews };
