const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();
const destinationEmail = "ayushsrivastavaup62@gmail.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value) {
  return typeof value === "string" ? value.trim() : "";
}

router.post("/contact", async (req, res, next) => {
  try {
    const name = normalize(req.body.name);
    const email = normalize(req.body.email);
    const message = normalize(req.body.message);

    if (!name || !email || !message || !emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and feedback message are required.",
      });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Lie_detector Feedback" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: destinationEmail,
      subject: "New Lie Detector Feedback",
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Feedback: ${message}`,
        `Date: ${new Date().toISOString()}`,
      ].join("\n"),
    });

    return res.json({
      success: true,
      message: "Feedback submitted successfully.",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
