import './Weather.css'
import { getDescription } from './Descriptions';
import { Moon } from "lunarphase-js";

const timeToFloat = (str) => {
  return parseFloat(str.replace(":", "."))
}

const MoonPhase = () => {
  return (
    <div className='horizontal black-rounded'>
      <h1 className='horizontal-text'>{Moon.lunarPhaseEmoji()}</h1>     
      <h2 className='horizontal-text'>{Moon.lunarPhase().toLowerCase()}</h2> 
    </div>
  );
}

const Bike = (props) => {
  if (!(props.data.hourly.rain[30] > 0))
    return (<h1 className='bike horizontal-text'>🚲</h1>);
}

const Tomorrow = (props) => {
  const data = props.data;

  const weatherCode = data.daily.weather_code[0];
  const description = getDescription(weatherCode, 1);
  const maxTemperature = data.daily.temperature_2m_max[1].toFixed(0);
  const minTemperature = data.daily.temperature_2m_min[1].toFixed(0);

  return (
    <div className='horizontal black-rounded'>
      <div>
        <div className='horizontal'>
          <img className='small weather-icon' src={description.at(1)} />
          <div>
            <h3 className='horizontal-text'>{description.at(0).toLowerCase()}</h3>
            <h3 className='horizontal-text'>{maxTemperature} • {minTemperature}</h3>
          </div>
        </div>
      </div>
      <Bike data={data}/>
    </div>
  );
}

const Sun = (props) => {
  const daily = props.data.daily;
  const sunrise = daily.sunrise[1].split("T")[1];
  const sunset = daily.sunset[0].split("T")[1];
  const currentTime = `${(new Date()).getHours()}:${(new Date()).getMinutes()}`;

  const lessThanSunrise = (timeToFloat(currentTime) <= timeToFloat(sunrise));
  const moreThanSunset = (timeToFloat(currentTime) >= timeToFloat(sunset));

  if (lessThanSunrise | moreThanSunset) {
    return (
      <div className='black-rounded sun'>
        <h3>{sunrise}</h3>
        <h2>▲</h2>
        <h2>☀️</h2>
      </div>
    );
  }

  return (
      <div className='black-rounded sun'>
        <h2>☀️</h2>
        <h2>▼</h2>
        <h3>{sunset}</h3>
      </div>
  );
}

const Weather = (props) => {
    const data = props.data;

    const weatherCode = data.current.weather_code;
    const isDay = data.current.is_day;
    const description = getDescription(weatherCode, isDay);
    const temperature = data.current.temperature_2m.toFixed(0);
    const maxTemperature = data.daily.temperature_2m_max[0].toFixed(0);
    const minTemperature = data.daily.temperature_2m_min[0].toFixed(0);

    return (
      <div>
        <div className='flex'>
          <MoonPhase/>
        </div>

        <div className='flex'>
          <Sun data={data}/>
          <div className='black-rounded now'>
            <img className='now-icon weather-icon' src={description.at(1)} alt="weather icon"/>
            <h1 className='temperature'>{temperature}</h1>
            <h3 className='weather-description'>{description.at(0).toLowerCase()}</h3>
          </div>

          <div className='black-rounded max-and-min'>
            <div className='max'>
              <h3 className='arrow'>▲</h3>
              <h2>{maxTemperature}</h2>
            </div>

            <h2>{minTemperature}</h2>
            <h3 className='arrow'>▼</h3>
          </div>
        </div>

        <div className='flex'>
          <Tomorrow data={data}/>
        </div>
      </div>
    );
}

export default Weather;
