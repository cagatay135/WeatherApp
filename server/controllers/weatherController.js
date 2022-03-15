const { default: axios } = require("axios");

const config = require("../config/config");

const db = require("../models/database");
const Location = db.location;

exports.getLocation = (req, res) => {
    axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + "Istanbul" + ".json?access_token=" + config.api.mapbox_api_key)
        .then(response => {
            var latitude = response.data.features[0].center[1];
            var longitude = response.data.features[0].center[0];
            res.send({
                latitude: latitude,
                longitude: longitude
            });
        })
        .catch(err => {
            res.send(err);
        });
};

exports.getWeather = (req, res) => {
    const longitude = 28.96028 
    const latitude = 41.01
    axios.get(`http://api.weatherstack.com/current?access_key=${config.api.weatherstack_api_key}&query=${latitude},${longitude}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            res.send(err);
        });
}