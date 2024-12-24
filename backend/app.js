const express = require("express");
const app = express();
require('dotenv').config();
const connectDB = require("./config/db");
const redis = require("./config/redis");
const authRoutes = require("./routes/authRoutes"); 
const messageRoute = require("./routes/messageRoute"); 
const sessionRoute = require("./routes/sessionRoute"); 

connectDB();

app.use(express.json());

//  Routes
app.use("/api/auth", authRoutes); 
app.use("/api/session", sessionRoute); 
app.use("/api", messageRoute);


module.exports = app;
