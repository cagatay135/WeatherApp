// create express app
const express = require("express");
const app = express();

const config = require("./config/config");

const weatherRoute = require("./routes/weatherRoute");

//create router
app.use("/weather", weatherRoute);
  
app.listen(config.server.port, () => {
    console.log(`Example app listening on port ${config.server.port}`)
  })