/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => { // Storing the request object,response object and the callback to the next middleware in the stack.
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token after "Bearer "
    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodes the token and verifies it with the JWT_SECRET token
        req.user = decoded; // Storing the token, so that it can be used by the next middleware.
        next(); // Continue to the next middleware/route.
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};
module.exports = authMiddleware;