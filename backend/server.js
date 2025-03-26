/* eslint-disable no-undef */
require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // User-related routes (dashboard, profile)
const authRoutes = require("./routes/authRoutes"); // Authentication routes (login, signup)

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/user", userRoutes); // User routes (dashboard, profile, transactions)

// Root Route (Health Check)
app.get("/", (req, res) => {
    res.send("🚀 Server is Running!");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
