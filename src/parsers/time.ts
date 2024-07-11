/* c8 ignore next */ // ?
export const parseTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

/* c8 ignore next */ // ?
export const parseTimeToSecs = (milliseconds: string): string => {
  const ms = Number.parseFloat(milliseconds);
  const seconds = (ms / 1000).toFixed(2);

  return seconds;
};
