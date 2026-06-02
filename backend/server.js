const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const devRoutes = require("./routes/devRoutes");
const detectionRoutes = require("./routes/detectionRoutes");
const newsRoutes = require("./routes/newsRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS origin not allowed"));
    },
  })
);

app.use(express.json({ limit: "1mb" }));
app.use("/api", authRoutes);
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
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing. Add it to backend/.env.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Lie_detector backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup error:", error.message);
    process.exit(1);
  }
}

startServer();
