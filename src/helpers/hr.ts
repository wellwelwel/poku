import { EOL } from 'os';

export const hr = () => {
  const columns = process.stdout.columns;
  const line = '_'.repeat(columns - 10 || 0);

  console.log(`\x1b[2m${line}\x1b[0m${EOL}`);
};
