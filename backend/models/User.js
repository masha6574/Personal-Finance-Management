const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String }, // Password authentication
    phone: { type: String, unique: true, sparse: true }, // Phone for OTP login
    otp: { type: String }, // Temporary OTP storage
    otpExpiry: { type: Date }, // OTP expiration time
});

module.exports = mongoose.model("User", userSchema);
