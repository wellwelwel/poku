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
const RESET = '\x1b[0m';

const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const ITALIC = '\x1b[3m';
const UNDERLINE = '\x1b[4m';

const SUCCESS = '\x1b[32m';
const GRAY = '\x1b[90m';
const FAIL = '\x1b[91m';
const INFO = '\x1b[94m';
const CYAN = '\x1b[96m';

export class Formatter {
  private prefix = '';
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  code(value: string) {
    this.prefix += `${ESC}${value}m`;
    return this;
  }

  counter(current: number, total: number, padChar = '0') {
    const totalDigits = String(total).length;
    this.prefix += String(current).padStart(totalDigits, padChar);
    return this;
  }

  dim() {
    this.prefix += DIM;
    return this;
  }

  bold() {
    this.prefix += BOLD;
    return this;
  }

  underline() {
    this.prefix += UNDERLINE;
    return this;
  }

  info() {
    this.prefix += INFO;
    return this;
  }

  italic() {
    this.prefix += ITALIC;
    return this;
  }

  success() {
    this.prefix += SUCCESS;
    return this;
  }

  fail() {
    this.prefix += FAIL;
    return this;
  }

  gray() {
    this.prefix += GRAY;
    return this;
  }

  cyan() {
    this.prefix += CYAN;
    return this;
  }

  bg(color: keyof typeof backgroundColor) {
    return this.code(String(backgroundColor[color])).bold();
  }

  [Symbol.toPrimitive]() {
    return `${this.prefix}${this.text}${RESET}`;
  }
}

export const format = (text: string) => new Formatter(text);

export const getLargestStringLength = (strings: string[]): number => {
  let maxLength = 0;
  const count = strings.length;

  for (let i = 0; i < count; i++)
    if (strings[i].length > maxLength) maxLength = strings[i].length;

  return maxLength;
};
