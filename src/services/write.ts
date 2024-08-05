import type { Formatter } from '../services/format.js';
import { stdout } from 'node:process';

export const Write = {
  log: (data: string | Uint8Array | Formatter) => {
    stdout.write(`${String(data)}\n`);
  },
  hr: () => {
    const line = '⎯'.repeat(stdout.columns - 10 || 40);

    Write.log(`\n\x1b[2m\x1b[90m${line}\x1b[0m\n`);
  },
} as const;
