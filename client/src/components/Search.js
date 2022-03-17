import React from "react";
import axios from "axios";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import moment from "moment";

import { Container } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

function Search() {
  const { t } = useTranslation();

  // State create for css transition
  const [showWeather, setShowWeather] = useState(false);

  // Result state for response weather data from api
  const [weatherInfo, setWeatherInfo] = useState();

  // Input state
  const [location, setLocation] = useState("");

  const didChange = (e) => {
    setLocation(e.target.value);
  };

  // Image array for weather icon, reference public/images/
  const imageData = ["Partly cloudy", "Light Rain", "Clear", "Sunny", "Mist"];

  // Function for get weather data from api
  const getWeather = async (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:3000/location", { params: { name: location } })
      .then(function (response) {
        const { latitude, longitude } = response.data;
        if (latitude) {
          axios
            .get("http://localhost:3000/weather/", {
              params: { latitude: latitude, longitude: longitude },
            })
            .then(function (response) {
              const result = response.data;
              setWeatherInfo(result);
              setShowWeather(true);
            });
        } else {
          setWeatherInfo(null);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Container className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <form className="form-inline my-2 my-lg-0" onSubmit={getWeather}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder={t("search")}
            aria-label="Search"
            value={location}
            onChange={didChange}
          />
        </form>
        {weatherInfo && (
          <>
            <CSSTransition
              in={showWeather}
              timeout={300}
              classNames="alert"
              unmountOnExit
              onExited={() => setShowWeather(true)}
            >
              <Container className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <div>
                  <h4 className="alert-heading">
                    {weatherInfo && weatherInfo.location.region}
                  </h4>
                  <span>
                    {t("today")}{" "}
                    {weatherInfo &&
                      moment(weatherInfo.location.localtime).format("HH:mm")}
                  </span>
                </div>
                <div className="my-4">
                  {imageData.includes(
                    weatherInfo.current.weather_descriptions[0]
                  ) ? (
                    <img
                      src={`./images/${weatherInfo.current.weather_descriptions[0].replace(
                        /\s/g,
                        ""
                      )}.png`}
                      width={90}
                      height={90}
                      className="me-2"
                      alt="weather icon"
                    />
                  ) : (
                    <img
                      src={`./images/Clear.png`}
                      width={90}
                      height={90}
                      className="me-2"
                      alt="weather icon"
                    />
                  )}

                  <h1 className="display-4 fw-normal text-degree">
                    {weatherInfo && weatherInfo.current.temperature}&deg;
                  </h1>
                  <p className="fs-5">
                    {t(
                      weatherInfo && weatherInfo.current.weather_descriptions[0]
                    )}
                  </p>
                </div>
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                  <div className="col-md-6  col-sm-6">
                    <div className="card mb-4 rounded-5 shadow-sm">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4 col-sm-6 align-self-center">
                            <i
                              className="bi bi-wind text-black"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </div>
                          <div className="col-md-8 col-sm-6">
                            <p className="fs-6 text-muted">{t("wind")}</p>
                            <p className="fs-6 text-muted">
                              {weatherInfo && weatherInfo.current.wind_speed}{" "}
                              km/h
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6  col-xs-6">
                    <div className="card mb-4 rounded-5 shadow-sm">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4 col-sm-6 align-self-center">
                            <i
                              className="bi bi-sun text-black"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </div>
                          <div className="col-md-8 col-sm-6">
                            <p className="fs-6 text-muted">{t("uv_index")}</p>
                            <p className="fs-6 text-muted">
                              {weatherInfo && weatherInfo.current.uv_index}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6  col-sm-6">
                    <div className="card mb-4 rounded-5 shadow-sm">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4 col-sm-6 align-self-center">
                            <i
                              className="bi bi-thermometer text-black"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </div>
                          <div className="col-md-8 col-sm-6">
                            <p className="fs-6 text-muted">
                              {t("feels_like")}
                            </p>
                            <p className="fs-6 text-muted">
                              {weatherInfo && weatherInfo.current.feelslike}
                              &deg;
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="card mb-4 rounded-5 shadow-sm">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4 col-sm-6 align-self-center">
                            <i
                              className="bi bi-droplet text-black"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </div>
                          <div className="col-md-8 col-sm-6">
                            <p className="fs-6 text-muted">{t("humidity")}</p>
                            <p className="fs-6 text-muted">
                              {weatherInfo && weatherInfo.current.humidity}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </CSSTransition>
          </>
        )}
      </Container>
    </div>
  );
}

export default Search;
