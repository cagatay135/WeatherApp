// create express app
const express = require("express");
const app = express();
var cors = require('cors');

const config = require("./config/config");

const weatherRoute = require("./routes/weatherRoute");

app.use(cors());

//create router
app.use("", weatherRoute);
  
app.listen(config.server.port, () => {
    console.log(`Example app listening on port ${config.server.port}`)
  })