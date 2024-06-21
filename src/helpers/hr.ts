/* c8 ignore start */
import { stdout } from 'node:process';
import { write } from './logs.js';

export const hr = () => {
  const line = '⎯'.repeat(stdout.columns - 10 || 40);

  write(`\n\x1b[2m\x1b[90m${line}\x1b[0m\n`);
};
/* c8 ignore stop */
