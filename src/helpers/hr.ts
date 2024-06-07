/* c8 ignore start */

import process from 'node:process';
import { EOL } from 'node:os';
import { write } from './logs.js';

export const hr = () => {
  const line = '⎯'.repeat(process.stdout.columns - 10 || 40);

  write(`${EOL}\x1b[2m\x1b[90m${line}\x1b[0m${EOL}`);
};

/* c8 ignore stop */
