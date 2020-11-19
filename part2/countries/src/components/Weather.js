import React, { useEffect, useState }  from 'react';
import axios from 'axios';

const Weather = ({country}) => {
    const [weather, setWeather] = useState("")
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect( () => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then( (res) => {
            setWeather(res.data);
        });
    }, [api_key, country.capital]);
   
    if (!weather) return <div>loading...</div>
    else {
        return (
            <div>
            <p><strong>temperature:</strong> {weather.current.temperature}°C</p>
            <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions} />
            <p><strong>wind:</strong> {weather.current.wind_speed}mph, direction {weather.current.wind_dir}</p>
            </div>
        )

    }

}

export default Weather;