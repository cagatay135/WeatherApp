const express = require("express");
const router = express.Router();
const app = express();

const weatherController = require("../controllers/weatherController");

router
  .route("/location")
  .get(weatherController.getLocation)

router
    .route("/weather")
    .get(weatherController.getWeather)

module.exports = router;

