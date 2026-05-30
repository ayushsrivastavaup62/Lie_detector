const fs = require("fs/promises");
const path = require("path");
const { analyzeWithSightengine } = require("../utils/sightengineClient");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm"]);
const IMAGE_LIMIT = 10 * 1024 * 1024;
const VIDEO_LIMIT = 50 * 1024 * 1024;

function getMediaType(file) {
  const extension = path.extname(file.originalname).toLowerCase();
  if (IMAGE_EXTENSIONS.has(extension)) return "image";
  if (VIDEO_EXTENSIONS.has(extension)) return "video";
  return null;
}

async function removeTemporaryFile(file) {
  if (!file?.path) return;
  try {
    await fs.unlink(file.path);
  } catch {
    // Temporary upload cleanup should never hide the API response from the user.
  }
}

async function detectMedia(req, res, next) {
  const file = req.file;

  try {
    if (!file) {
      const error = new Error("No file selected. Please upload an image or video to analyze.");
      error.statusCode = 400;
      error.publicMessage = error.message;
      throw error;
    }

    const mediaType = getMediaType(file);
    if (!mediaType) {
      const error = new Error("Unsupported file type. Please upload JPG, PNG, WEBP, MP4, MOV, or WEBM.");
      error.statusCode = 400;
      error.publicMessage = error.message;
      throw error;
    }

    if (mediaType === "image" && file.size > IMAGE_LIMIT) {
      const error = new Error("Image file is too large. Please upload an image under 10MB.");
      error.statusCode = 400;
      error.publicMessage = error.message;
      throw error;
    }

    if (mediaType === "video" && file.size > VIDEO_LIMIT) {
      const error = new Error("Video file is too large. Please upload a video under 50MB.");
      error.statusCode = 400;
      error.publicMessage = error.message;
      throw error;
    }

    const result = await analyzeWithSightengine(file, mediaType);
    res.json(result);
  } catch (error) {
    next(error);
  } finally {
    await removeTemporaryFile(file);
  }
}

module.exports = { detectMedia };
