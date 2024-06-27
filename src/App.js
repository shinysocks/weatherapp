import Weather from './Weather';
import react from 'react';
import { useWeather } from './useWeather';
import { styled, keyframes } from 'styled-components'

const LoaderAnim = keyframes`
  0% {
    width: 200px;
  }

  50% {
    width: 275px;
  }

  100% {
    width: 200px;
  }
`;


const Background = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  position: absolute;
  text-align: center;
`;

const Loading = styled.svg`
  animation: 1s infinite linear;
  animation-name: ${LoaderAnim};
  filter: drop-shadow(0 0 0.4rem black);
`;

const Loader = () => {
  return (
    <Loading>
      <circle r='20%' cx='50%' cy='50%' />
    </Loading>
  );
}

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
    <Background>
      { data ? <Weather data={data} /> : <Loader /> }
    </ Background>
  );
}

export default App;
