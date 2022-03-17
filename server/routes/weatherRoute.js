const express = require("express");
const router = express.Router();

const weatherController = require("../controllers/weatherController");

// Weather route
router.route("/location").get(weatherController.getLocation);

router.route("/weather").get(weatherController.getWeather);

module.exports = router;
