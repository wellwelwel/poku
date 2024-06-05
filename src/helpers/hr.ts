/* c8 ignore start */

import { EOL } from 'node:os';
import process from 'node:process';

export const hr = () => {
  const line = '⎯'.repeat(process.stdout.columns - 10 || 40);

  console.log(`${EOL}\x1b[2m\x1b[90m${line}\x1b[0m${EOL}`);
};

/* c8 ignore stop */
