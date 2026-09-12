import { useEffect, useState } from 'react';

export interface LocalTime {
  time: string; // HH:mm:ss
  weekday: string;
  date: string; // dd MMM yyyy
}

function format(timeZone: string): LocalTime {
  const now = new Date();
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);
  const weekday = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'long',
  }).format(now);
  const date = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(now);
  return { time, weekday, date };
}

export function useLocalTime(timeZone: string): LocalTime {
  const [value, setValue] = useState<LocalTime>(() => format(timeZone));

  useEffect(() => {
    setValue(format(timeZone));
    const id = window.setInterval(() => setValue(format(timeZone)), 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return value;
}
