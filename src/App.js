import CurrentWeather from './CurrentWeather';
import TomorrowWeather from './TomorrowWeather';
import MoonPhase from './MoonPhase';
import react from 'react';
import { useWeather } from './useWeather';

function App() {
  // fix later??
  const [url, setUrl] = react.useState(null);

  react.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        setUrl(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code&hourly=rain&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=${timezone}&forecast_days=2`);
      });
    }
  }, []);

  const data = useWeather(url);

  return (
    <div className='background'>
      <CurrentWeather data={data} />
      <TomorrowWeather data={data} />
      <MoonPhase />
    </div>
  );
}

export default App;
