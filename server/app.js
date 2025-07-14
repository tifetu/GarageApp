// import express from 'express
const express = require("express");
// import cors from 'cors';
const cors = require("cors");
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to enable CORS
app.use(cors());
const router=require( "./routes/index.js");
app.use(router);
const port = process.env.PORT;
// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the Garage App API!");
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app; // Export the app for testing or further configuration