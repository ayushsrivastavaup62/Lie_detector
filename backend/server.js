const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const devRoutes = require("./routes/devRoutes");
const detectionRoutes = require("./routes/detectionRoutes");
const newsRoutes = require("./routes/newsRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const requiredEnvVars = [
  "MONGO_URI",
  "JWT_SECRET",
  "SIGHTENGINE_API_USER",
  "SIGHTENGINE_API_SECRET",
  "GNEWS_API_KEY",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
];

function getAllowedOrigins() {
  return [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ...(process.env.FRONTEND_URL || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  ];
}

function validateStartupEnv() {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }
}

app.use(
  cors({
    origin(origin, callback) {
      const allowedOrigins = getAllowedOrigins();

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      const error = new Error("CORS origin not allowed");
      error.statusCode = 403;
      error.publicMessage = "CORS origin not allowed.";
      callback(error);
    },
  })
);

app.use(express.json({ limit: "1mb" }));
app.use("/api", authRoutes);
app.use("/api", contactRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", devRoutes);
app.use("/api", detectionRoutes);
app.use("/api", newsRoutes);
app.use("/api", paymentRoutes);

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "Lie_detector backend" });
});

app.use((err, _req, res, _next) => {
  let status = err.statusCode || 500;
  let message = err.publicMessage || err.message || "Something went wrong while processing the upload.";

  if (err.code === 11000 && err.keyPattern?.email) {
    status = 409;
    message = "An account with this email already exists.";
  }

  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors)
      .map((validationError) => validationError.message)
      .join(" ");
  }

  res.status(status).json({
    success: false,
    message,
  });
});

async function startServer() {
  try {
    validateStartupEnv();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Mongoose will attempt to reconnect if possible.");
    });

    app.listen(PORT, () => {
      console.log(`Lie_detector backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup error:", error.message);
    process.exit(1);
  }
}

startServer();

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});
