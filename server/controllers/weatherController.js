const { default: axios } = require("axios");

const config = require("../config/config");

const db = require("../models/database");
const Location = db.location;

exports.getLocation = (req, res) => {
    let name = req.query.name
    if (name != undefined) {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?limit=1&language=tr&access_token=${config.api.mapbox_api_key}`)
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
    }
    else {
        res.send({
            "error": "No name provided"
        });
    }
};

exports.getWeather = (req, res) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    axios.get(`http://api.weatherstack.com/current?access_key=${config.api.weatherstack_api_key}&query=${latitude},${longitude}`)
        .then(response => {
            Location.create({
                latitude: response.data.location.lat,
                longitude: response.data.location.lon,
                current_weather: response.data.current.temperature
            })     
            res.send(response.data);
        })
        .catch(err => {
            res.send(err);
        });
}