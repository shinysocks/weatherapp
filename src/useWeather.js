import axios from 'axios';
import { useEffect,  useState } from 'react';

export const useWeather = (URL) => {
    const [state, setState] = useState(null);

    const fetchWeather = async() => {
      setState(null);
      const weather = await axios.get(URL).catch(() => {});
      if (weather)
        setState(weather.data);
    }

    useEffect(() => {
      fetchWeather();
    }, [URL]);

    return state;
};
