import React from 'react'
import axios from 'axios';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Container, Button, Alert } from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';

function Search() {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');

  const [showWeather, setShowWeather] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  
  const [weatherInfo, setWeatherInfo] = useState();
  const data = ["Partly cloudy","Light Rain","Clear","Sunny","Mist"]

  const didChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeather = async (e) => {
    e.preventDefault();
    axios.get('http://localhost:3000/location', {params: {name: location.toLocaleLowerCase()}})
    .then(function (response) {
      const {latitude, longitude} = response.data;
      if (latitude){
      axios.get('http://localhost:3000/weather/' , {params: {latitude: latitude,longitude: longitude}})
      .then(function (response) {
        const result = response.data;
        console.log(result)
          setWeatherInfo(result);
          setShowMessage(true)
      }
      )
    }
    else {
        setWeatherInfo(null);
    }
    }
    )
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (
    <div>
      <Container className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <form class="form-inline my-2 my-lg-0" onSubmit={getWeather}>
          <input className="form-control mr-sm-2" type="search" placeholder={t('search')} aria-label="Search" value={location} onChange={didChange}/>
          </form>
      {weatherInfo &&
      <>
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowWeather(false)}
        onExited={() => setShowWeather(true)}
      >
        <Container className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <div>
            <h4 className="alert-heading">{weatherInfo && weatherInfo.location.region}</h4>
            <span>{t('today')} {weatherInfo && moment(weatherInfo.location.localtime).format('HH:mm')}</span>
            </div>
            <div className='my-4'>
            {data.includes(weatherInfo.current.weather_descriptions[0]) ?
            <img src={`./images/${weatherInfo.current.weather_descriptions[0].replace(/\s/g,"")}.png`} width={90} height={90} className="me-2" />
            :
            <img src={`./images/Sunny.png`} width={90} height={90} className="me-2" />
            }

            <h1 className="display-4 fw-normal text-degree">{weatherInfo && weatherInfo.current.temperature}&deg;</h1>
            <p className="fs-5 text-muted">{weatherInfo && weatherInfo.current.weather_description}</p>
          </div>
          <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
          <div class="col-md-6  col-sm-6">
              <div class="card mb-4 rounded-5 shadow-sm">
                <div class="card-body">
              <div className="row">
                <div className="col-md-4 col-sm-6 align-self-center">
                  <i class="bi bi-wind text-black" style={{fontSize:"2rem"}}></i>
                </div>
                <div className="col-md-8 col-sm-6">
                <p className="fs-6 text-muted">{t('wind')}</p>
                <p className="fs-6 text-muted">{weatherInfo && weatherInfo.current.wind_speed} km/h</p>
                </div>
              </div>
                </div>
              </div>
            </div>
            <div class="col-md-6  col-sm-6">
              <div class="card mb-4 rounded-5 shadow-sm">
                <div class="card-body">
              <div className="row">
                <div className="col-md-4 col-sm-6 align-self-center">
                  <i class="bi bi-sun text-black" style={{fontSize:"2rem"}}></i>
                </div>
                <div className="col-md-8 col-sm-6">
                <p className="fs-6 text-muted">{t('uv_index')}</p>
                <p className="fs-6 text-muted">{weatherInfo && weatherInfo.current.uv_index}</p>
                </div>
              </div>
                </div>
              </div>
            </div>
            <div class="col-md-6  col-sm-6">
              <div class="card mb-4 rounded-5 shadow-sm">
                <div class="card-body">
              <div className="row">
                <div className="col-md-4 col-sm-6 align-self-center">
                  <i class="bi bi-thermometer text-black" style={{fontSize:"2rem"}}></i>
                </div>
                <div className="col-md-8 col-sm-6">
                <p className="fs-6 text-muted">{t('temperature')}</p>
                <p className="fs-6 text-muted">{weatherInfo && weatherInfo.current.temperature}&deg;</p>
                </div>
              </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="card mb-4 rounded-5 shadow-sm">
                <div class="card-body">
              <div className="row">
                <div className="col-md-4 col-sm-6 align-self-center">
                  <i class="bi bi-droplet text-black" style={{fontSize:"2rem"}}></i>
                </div>
                <div className="col-md-8 col-sm-6">
                <p className="fs-6 text-muted">{t('humidity')}</p>
                <p className="fs-6 text-muted">{weatherInfo && weatherInfo.current.humidity}%</p>
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </CSSTransition>
      </>
  }
    </Container>
    </div>
  )
}

export default Search