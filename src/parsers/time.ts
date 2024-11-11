const pad = (num: number): string => String(num).padStart(2, '0');

export const parseTime = (date: Date): string => {
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
};

export const parseTimeToSecs = (milliseconds: string): string => {
  const ms = Number(milliseconds);

  return (ms / 1000).toFixed(2);
};
