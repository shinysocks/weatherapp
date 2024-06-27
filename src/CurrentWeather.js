import './CurrentWeather.css'
import { getDescription } from './Descriptions';

const timeToFloat = (str) => {
  return parseFloat(str.replace(":", "."))
}

const Sun = (props) => {
  const daily = props.data.daily;
  const sunrise = daily.sunrise[1].split("T")[1];
  const sunset = daily.sunset[0].split("T")[1];
  const currentTime = `${(new Date()).getHours()}:${(new Date()).getMinutes()}`;

  const lessThanSunrise = (timeToFloat(currentTime) <= timeToFloat(sunrise));
  const moreThanSunset = (timeToFloat(currentTime) >= timeToFloat(sunset));

  if (moreThanSunset || lessThanSunrise) {
    return (
      <h4>sunrise: {sunrise}</h4>
    );
  }

  return (
    <h4>sunset: {sunset}</h4>
  );
}

const CurrentWeather = (props) => {
  if (props.data) {
    const data = props.data;

    const weatherCode = data.current.weather_code;
    const isDay = data.current.is_day;
    const description = getDescription(weatherCode, isDay);
    const temperature = data.current.temperature_2m.toFixed(0);
    const maxTemperature = data.daily.temperature_2m_max[0].toFixed(0);
    const minTemperature = data.daily.temperature_2m_min[0].toFixed(0);

    return (
      <div>
        <img src={description.at(1)} alt="weather icon"/>
        <h1>{temperature}°</h1>
        <h3>{description.at(0).toLowerCase()}</h3>
        <h4>maxTemp: {maxTemperature}, minTemp: {minTemperature}</h4>
        {props.data ? <Sun data={data}/> : ""}
      </div>
    );
  }
}

export default CurrentWeather;
