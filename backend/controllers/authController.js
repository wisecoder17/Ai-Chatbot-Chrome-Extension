const bcrypt = require("bcrypt");
const User = require("../models/user");
const redis = require("../config/redis");

// Sign Up
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const user = new User({
      username,
      email,
      passwordHash: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    // Generate session ID
    const sessionId = `session_${user._id}`;

    // Store session in Redis (expires in 1 hour)
    await redis.set(sessionId, JSON.stringify({ userId: user._id }));

    // Set session cookie
    res.cookie("sessionId", sessionId, {
      httpOnly: true, // Prevents JavaScript access (more secure)
      secure: false, // Only send over HTTPS (enable in production)
      sameSite: "Strict",
      //maxAge: 3600000, // 1 hour expiration
    });

    res.status(200).json({message: "Login successful!"});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Logout
exports.logout = async (req, res) => {
  const sessionId = req.cookies.sessionId;

  if (sessionId) {
    await redis.del(sessionId); // Remove session from Redis
    res.clearCookie("sessionId"); // Clear cookie
  }

  res.status(200).json({ message: "Logout successful!" });
};

