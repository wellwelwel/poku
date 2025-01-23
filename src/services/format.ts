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

const ESC = '\x1b[';

export class Formatter {
  private parts = '';
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  code(code: string) {
    this.parts += `${ESC}${code}m`;
    return this;
  }

  static create(text: string) {
    return new Formatter(text);
  }

  counter(current: number, total: number, pad = '0') {
    const totalDigits = String(total).length;
    this.parts += String(current).padStart(totalDigits, pad);
    return this;
  }

  dim() {
    return this.code('2');
  }

  bold() {
    return this.code('1');
  }

  underline() {
    return this.code('4');
  }

  info() {
    return this.code('94');
  }

  italic() {
    return this.code('3');
  }

  success() {
    return this.code('32');
  }

  fail() {
    return this.code('91');
  }

  gray() {
    return this.code('90');
  }

  cyan() {
    return this.code('96');
  }

  bg(color: keyof typeof backgroundColor) {
    return this.code(String(backgroundColor[color])).bold();
  }

  [Symbol.toPrimitive]() {
    return `${this.parts}${this.text}${ESC}0m`;
  }
}

export const format = (text: string) => Formatter.create(text);

export const getLargestStringLength = (arr: string[]): number =>
  arr.reduce((max, current) => Math.max(max, current.length), 0);
