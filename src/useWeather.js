import axios from 'axios';
import { useEffect,  useState } from 'react';

export const useWeather = (URL) => {
    const [state, setState] = useState({ data: null, isLoading: false });

    const fetchWeather = async() => {
      setState({ data: null, isLoading: true });
      const weather = await axios.get(URL).catch(() => {});
      if (weather)
        setState({ data: weather.data, isLoading: false });
    }

    useEffect(() => {
      fetchWeather();
    }, [URL]);

    return state;
};
