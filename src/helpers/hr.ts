import { EOL } from 'node:os';
import process from 'node:process';

export const hr = () => {
  const columns = process.stdout.columns;
  const line = '⎯'.repeat(columns - 10 || 30);

  console.log(`\x1b[2m${line}\x1b[0m${EOL}`);
};
