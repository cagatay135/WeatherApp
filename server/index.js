const express = require("express");
const cors = require("cors");

const config = require("./config/config");
const db = require("./models/database");

const weatherRoute = require("./routes/weatherRoute");

// Create express app
const app = express();

// Middleware
app.use(cors());

// Routes path
app.use("", weatherRoute);

// Listen for requests
app.listen(config.server.port, () => {
  console.log(`Example app listening on port ${config.server.port}`);
});
