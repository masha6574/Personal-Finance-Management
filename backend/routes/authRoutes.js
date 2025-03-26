/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// 📌 Mail Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 📌 Store OTP Temporarily (for real-world apps, store in DB with expiry)
const otpStore = {};

// ✅ **Route: Sign Up (Register User)**
router.post("/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, spendingHabits, spendingCategories } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            spendingHabits,
            spendingCategories,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// ✅ **Route: Log In with Password**
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ **Route: Send OTP**
router.post("/send-otp", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = otp;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Login",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error sending OTP" });
    }
});

// ✅ **Route: Verify OTP & Log In**
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!otpStore[email] || otpStore[email] !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        delete otpStore[email];

        res.status(200).json({ message: "OTP verified, login successful" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
