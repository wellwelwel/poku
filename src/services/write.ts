import type { Formatter } from '../services/format.js';
import { stdout } from 'node:process';

const columns = Math.max((stdout.columns || 50) - 10, 40);

export const log = (data: string | Uint8Array | Formatter) =>
  stdout.write(`${String(data)}\n`);

export const hr = () => {
  const line = '─'.repeat(columns);

  log(`\n\x1b[2m\x1b[90m${line}\x1b[0m\n`);
};
