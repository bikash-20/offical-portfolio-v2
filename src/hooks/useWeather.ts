import { useEffect, useState } from 'react';

export interface Weather {
  temp: number;
  feels: number;
  code: number;
  wind: number;
  humidity: number;
  isDay: boolean;
}

interface State {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
}

const codeMap: Record<number, { label: string; emoji: string }> = {
  0: { label: 'Clear', emoji: '☀️' },
  1: { label: 'Mainly Clear', emoji: '🌤️' },
  2: { label: 'Partly Cloudy', emoji: '⛅' },
  3: { label: 'Overcast', emoji: '☁️' },
  45: { label: 'Foggy', emoji: '🌫️' },
  48: { label: 'Rime Fog', emoji: '🌫️' },
  51: { label: 'Light Drizzle', emoji: '🌦️' },
  61: { label: 'Light Rain', emoji: '🌧️' },
  63: { label: 'Rain', emoji: '🌧️' },
  65: { label: 'Heavy Rain', emoji: '⛈️' },
  71: { label: 'Light Snow', emoji: '🌨️' },
  73: { label: 'Snow', emoji: '❄️' },
  75: { label: 'Heavy Snow', emoji: '❄️' },
  80: { label: 'Rain Showers', emoji: '🌦️' },
  95: { label: 'Thunderstorm', emoji: '⛈️' },
};

export function describeCode(code: number) {
  return codeMap[code] ?? { label: 'Unknown', emoji: '🌡️' };
}

export function useWeather(lat: number, lon: number): State {
  const [state, setState] = useState<State>({ weather: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const c = data.current ?? {};
        const weather: Weather = {
          temp: Math.round(c.temperature_2m ?? 0),
          feels: Math.round(c.apparent_temperature ?? 0),
          code: c.weather_code ?? 0,
          wind: Math.round(c.wind_speed_10m ?? 0),
          humidity: Math.round(c.relative_humidity_2m ?? 0),
          isDay: Boolean(c.is_day),
        };
        if (!cancelled) setState({ weather, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled)
          setState({ weather: null, loading: false, error: (err as Error).message });
      });

    return () => {
      cancelled = true;
    };
  }, [lat, lon]);

  return state;
}
