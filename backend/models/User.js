/* eslint-disable no-undef */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String, unique: true, sparse: true },
    spendingHabits: { type: String },
    spendingCategories: [String], // Array of selected categories
    transactions: [
        {
            category: String,
            amount: Number,
            date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
