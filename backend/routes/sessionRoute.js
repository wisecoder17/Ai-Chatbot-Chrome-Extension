///////////
const express = require('express');
const router = express.Router();
const { createSession, endSession } = require('../controllers/sessionController');

router.post('/sessions', createSession);
router.put('/sessions/end', endSession);

module.exports = router;

//  Middleware: Validate Session Before Processing Requests
// Now, every protected API route should verify sessionId from Redis before allowing access.

// const redisClient = require("../config/redis");

// const sessionMiddleware = async (req, res, next) => {
//   const sessionId = req.headers["x-session-id"]; // Get sessionId from request headers

//   if (!sessionId) {
//     return res.status(401).json({ message: "Unauthorized: Session ID missing." });
//   }

//   try {
//     const sessionData = await redisClient.get(sessionId);

//     if (!sessionData) {
//       return res.status(401).json({ message: "Session expired. Please log in again." });
//     }

//     req.user = JSON.parse(sessionData); // Attach user data to request
//     next();
//   } catch (error) {
//     console.error("Session validation error:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// module.exports = sessionMiddleware;
// ✅ How It Works?

// Checks if sessionId exists in Redis.
// If not found, returns 401 Unauthorized (expired session).
// If valid, allows request to continue.
// 🔹 Use Middleware in Protected Routes
// In your route files (e.g., routes/userRoutes.js), use the session middleware.

// javascript
// Copy
// Edit
// const express = require("express");
// const router = express.Router();
// const sessionMiddleware = require("../middleware/sessionMiddleware");

// router.get("/profile", sessionMiddleware, async (req, res) => {
//   res.json({ message: "Profile data", user: req.user });
// });

// module.exports = router;
// ✅ Now, every request to /profile must have a valid session!