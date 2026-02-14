const pad = (num: number) => (num < 10 ? `0${num}` : `${num}`);

export const parseTime = (date: Date): string =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

export const parseTimeToSecs = (milliseconds: number): string =>
  (milliseconds / 1000).toFixed(2);
