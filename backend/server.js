const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const detectionRoutes = require("./routes/detectionRoutes");

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
app.use("/api", detectionRoutes);

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "Lie_detector backend" });
});

app.use((err, _req, res, _next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.publicMessage || err.message || "Something went wrong while processing the upload.",
  });
});

app.listen(PORT, () => {
  console.log(`Lie_detector backend running on port ${PORT}`);
});
