/* c8 ignore next */ // c8 bug
import { padStart } from '../polyfills/pad.js';

export const setTime = (date: Date): string => {
  const hours = padStart(date.getHours().toString(), 2, '0');
  const minutes = padStart(date.getMinutes().toString(), 2, '0');
  const seconds = padStart(date.getSeconds().toString(), 2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

/* c8 ignore next */ // c8 bug
export const toSecs = (milliseconds: string): string => {
  const ms = Number.parseFloat(milliseconds);
  const seconds = (ms / 1000).toFixed(2);

  return seconds;
};
