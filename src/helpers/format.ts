import { padStart } from './pad.js';

export const backgroundColor = {
  white: 7,
  black: 40,
  grey: 100,
  red: 41,
  green: 42,
  yellow: 43,
  blue: 44,
  magenta: 45,
  cyan: 46,
  brightRed: 101,
  brightGreen: 102,
  brightYellow: 103,
  brightBlue: 104,
  brightMagenta: 105,
  brightCyan: 106,
} as const;

export const format = {
  counter: (current: number, total: number, pad = '0') => {
    const totalDigits = String(total).length;
    return padStart(String(current), totalDigits, pad);
  },
  dim: (value: string) => `\x1b[2m${value}\x1b[0m`,
  bold: (value: string) => `\x1b[1m${value}\x1b[0m`,
  underline: (value: string) => `\x1b[4m${value}\x1b[0m`,
  info: (value: string) => `\x1b[94m${value}\x1b[0m`,
  italic: (value: string) => `\x1b[3m${value}\x1b[0m`,
  success: (value: string) => `\x1b[32m${value}\x1b[0m`,
  fail: (value: string) => `\x1b[91m${value}\x1b[0m`,
  bg: (bg: number, text: string) => {
    const padding = ' '.repeat(1);
    const paddedText = `${padding}${text}${padding}`;

    return `\x1b[${bg}m\x1b[1m${paddedText}\x1b[0m`;
  },
};

export const getLargestStringLength = (arr: string[]): number =>
  arr.reduce((max, current) => Math.max(max, current.length), 0);
