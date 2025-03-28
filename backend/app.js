const express = require("express");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes"); 
const promptRoute = require("./routes/promptRoutes"); 
const sessionRoute = require("./routes/sessionRoute"); 

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parses cookies from requests
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use("/api/auth", authRoutes); 
app.use("/api/session", sessionRoute); 
app.use("/api", promptRoute);


module.exports = app;
