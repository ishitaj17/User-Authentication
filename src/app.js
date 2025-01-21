const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

// Load environment variables from .env
// import dotenv from "dotenv";
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("JWT_SECRET in server file:", process.env.JWT_SECRET);

// Initialize the app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Set up routes
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Export the app for use in server.js
module.exports = app;
// Add this at the end of your route definitions in app.js
app.get("/", (req, res) => {
  res.send("Welcome to the User Management System API!");
});
