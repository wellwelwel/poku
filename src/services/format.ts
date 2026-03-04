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

const BG_CODES: Record<keyof typeof backgroundColor, string> = {
  white: '\x1b[7m\x1b[1m',
  black: '\x1b[40m\x1b[1m',
  grey: '\x1b[100m\x1b[1m',
  red: '\x1b[41m\x1b[1m',
  green: '\x1b[42m\x1b[1m',
  yellow: '\x1b[43m\x1b[1m',
  blue: '\x1b[44m\x1b[1m',
  magenta: '\x1b[45m\x1b[1m',
  cyan: '\x1b[46m\x1b[1m',
  brightRed: '\x1b[101m\x1b[1m',
  brightGreen: '\x1b[102m\x1b[1m',
  brightYellow: '\x1b[103m\x1b[1m',
  brightBlue: '\x1b[104m\x1b[1m',
  brightMagenta: '\x1b[105m\x1b[1m',
  brightCyan: '\x1b[106m\x1b[1m',
} as const;

export class Formatter {
  private parts = '';
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  code(code: string) {
    this.parts += `\x1b[${code}m`;
    return this;
  }

  dim() {
    this.parts += '\x1b[2m';
    return this;
  }

  bold() {
    this.parts += '\x1b[1m';
    return this;
  }

  underline() {
    this.parts += '\x1b[4m';
    return this;
  }

  info() {
    this.parts += '\x1b[94m';
    return this;
  }

  italic() {
    this.parts += '\x1b[3m';
    return this;
  }

  success() {
    this.parts += '\x1b[32m';
    return this;
  }

  fail() {
    this.parts += '\x1b[91m';
    return this;
  }

  gray() {
    this.parts += '\x1b[90m';
    return this;
  }

  cyan() {
    this.parts += '\x1b[96m';
    return this;
  }

  bg(color: keyof typeof backgroundColor) {
    this.parts += BG_CODES[color];
    return this;
  }

  [Symbol.toPrimitive]() {
    return `${this.parts}${this.text}\x1b[0m`;
  }
}

export const format = (text: string) => new Formatter(text);
