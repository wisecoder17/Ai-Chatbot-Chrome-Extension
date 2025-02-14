const express = require("express");
const cookieParser = require("cookie-parser");
// require('dotenv').config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes"); 
const messageRoute = require("./routes/messageRoute"); 
const sessionRoute = require("./routes/sessionRoute"); 

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parses cookies from requests

//  Routes
app.use("/api/auth", authRoutes); 
app.use("/api/session", sessionRoute); 
app.use("/api", messageRoute);


module.exports = app;
