import type { Formatter } from '../services/format.js';
import { stdout } from 'node:process';

const columns = Math.max((stdout.columns || 50) - 10, 40);
const hrLine = `\n\x1b[2m\x1b[90m${'─'.repeat(columns)}\x1b[0m\n`;

export const log = (data: string | Uint8Array | Formatter) =>
  stdout.write(`${String(data)}\n`);

export const hr = () => {
  log(hrLine);
};
