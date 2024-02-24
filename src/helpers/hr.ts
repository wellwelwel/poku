import { EOL } from 'node:os';
import process from 'node:process';

let lastLenght: number = 0;

export const hr = (size?: number) => {
  const pad = 10;
  const limit = process.stdout.columns - pad;
  const fileLenght = typeof size === 'number' ? Math.floor(size / 2) + pad : 0;
  const columns =
    fileLenght > 0 && fileLenght <= limit
      ? fileLenght
      : lastLenght > 0
        ? lastLenght
        : limit;
  const line = '⎯'.repeat(columns);
  lastLenght = columns;

  console.log(`${EOL}\x1b[2m${line}\x1b[0m${EOL}`);
};
