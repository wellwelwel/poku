const pad = (num: number) => String(num).padStart(2, '0');

export const parseTime = (date: Date): string => {
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
};

export const parseTimeToSecs = (milliseconds: number): string =>
  (milliseconds / 1000).toFixed(2);
