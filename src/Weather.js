import './Weather.css'
import { useEffect, useState } from 'react';
import { useWeather } from './useWeather';
import DESCRIPTIONS from './Descriptions';

const Current = (data) => {
  const weatherCode = data?.current.weather_code;
  const isDay = data?.current.is_day;
  
  return (
    <div>{weatherCode}</div>
  );
}

const Weather = () => {
    const [url, setUrl] = useState(null);
    const { data, isLoading } = useWeather(url);

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          setUrl(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,temperature_2m,is_day,rain&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,precipitation_hours&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=${timezone}&forecast_days=2`);
        });
      }
    }, []);

    return (
      <div>
        {isLoading ? null : Current(data)}
      </div>
    );
}
  

export default Weather;
