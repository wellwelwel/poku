/* c8 ignore start */

import process from 'node:process';
import { hr } from '../helpers/hr.js';
import { results } from '../services/run-tests.js';
import { format } from '../helpers/format.js';
import type { Code } from '../@types/code.js';
import { write } from '../helpers/logs.js';

export const exit = (code: Code, quiet?: boolean) => {
  const isPoku = results.success > 0 || results.fail > 0;

  !quiet &&
    process.on('exit', (code) => {
      if (isPoku) {
        hr();
        write(
          format.bg(42, `PASS › ${results.success}`) +
            ' ' +
            format.bg(results.fail === 0 ? 100 : 41, `FAIL › ${results.fail}`)
        );
        hr();
      }

      write(
        `${format.dim('Exited with code')} ${format.bold(format?.[code === 0 ? 'success' : 'fail'](String(code)))}`
      );
    });

  process.exit(code === 0 ? 0 : 1);
};

process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  process.exit(1);
});

/* c8 ignore stop */
