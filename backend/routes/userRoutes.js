/* eslint-disable no-undef */
const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();
// Handling GET requests to /dashboard. 
// authMiddleware ensures that only authenticated users are allowed the access/
// async(req,res) ensures that the handler is asynchronous so we can use await for database queries
router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Finding user but excluding the password.
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;