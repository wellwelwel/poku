/* c8 ignore start */
import { padStart } from '../polyfills/pad.js';

export const setTime = (date: Date): string => {
  const hours = padStart(date.getHours().toString(), 2, '0');
  const minutes = padStart(date.getMinutes().toString(), 2, '0');
  const seconds = padStart(date.getSeconds().toString(), 2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export const toSecs = (milliseconds: string): string => {
  const ms = parseFloat(milliseconds);
  const seconds = (ms / 1000).toFixed(2);

  return seconds;
};
/* c8 ignore stop */
