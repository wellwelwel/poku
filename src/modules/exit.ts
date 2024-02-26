import process from 'node:process';
import { hr } from '../helpers/hr.js';
import { Code } from '../@types/code.js';
import { results } from '../services/run-tests.js';
import { format } from '../helpers/format.js';

export const exit = (code: Code, quiet?: boolean) => {
  const isPoku = results.success > 0 || results.fail > 0;

  !quiet &&
    process.on('exit', (code) => {
      isPoku &&
        console.log(
          format.bg(42, `PASS › ${results.success}`),
          format.bg(results.fail === 0 ? 100 : 41, `FAIL › ${results.fail}`)
        );

      isPoku && hr();

      console.log(
        `${format.dim('Exited with code')} ${format.bold(format?.[code === 0 ? 'success' : 'fail'](String(code)))}`
      );
    });

  isPoku && !quiet && hr();

  if (code !== 0) process.exit(1);

  process.exit(0);
};

process.on('unhandledRejection', (reason) => {
  console.log('unhandledRejection', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  process.exit(1);
});
