import './TomorrowWeather.css'
import { getDescription } from './Descriptions';

const Bike = (props) => {
  if (props.data.hourly.rain[30] > 0) {
    return (
      <h1>CANNOT BIKE :(</h1>
    );
  }

  return (
      <h1>CAN BIKE!!</h1>
  );
}

const TomorrowWeather = (props) => {
  if (props.data) {
    const data = props.data;

    const weatherCode = data.daily.weather_code[0];
    const description = getDescription(weatherCode, 1);
    const maxTemperature = data.daily.temperature_2m_max[1].toFixed(0);
    const minTemperature = data.daily.temperature_2m_min[1].toFixed(0);

    return (
      <div>
        <br />
        <br />
        <h1>tomorrow</h1>
        <img src={description.at(1)} alt="weather icon"/>
        <h3>{description.at(0)}</h3>
        <h4>maxTemp: {maxTemperature}, minTemp: {minTemperature}</h4>
        {props.data ? <Bike data={data}/> : ""}
      </div>
    );
  }
}

export default TomorrowWeather;
