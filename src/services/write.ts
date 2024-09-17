import type { Formatter } from '../services/format.js';
import { stdout } from 'node:process';
import { Buffer } from 'node:buffer';

export const Write = {
  log: (data: string | Buffer | Uint8Array | Formatter) => {
    const buffer = Buffer.isBuffer(data)
      ? data
      : Buffer.from(`${String(data)}\n`);

    stdout.write(buffer);
  },
  hr: () => {
    const line = '─'.repeat(stdout.columns - 10 || 40);

    Write.log(`\n\x1b[2m\x1b[90m${line}\x1b[0m\n`);
  },
} as const;
