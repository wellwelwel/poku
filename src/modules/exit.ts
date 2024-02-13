import { hr } from '../helpers/hr.js';
import { Code } from '../@types/code.js';

export const exit = (code: Code, quiet?: boolean) => {
  !quiet &&
    process.on('exit', (code) => {
      console.log(`About to exit with code`, code);
    });

  !quiet && hr();

  if (code !== 0) {
    !quiet && console.log('Some tests failed.');
    process.exit(1);
  }

  !quiet && console.log('All tests passed.');
  process.exit(0);
};

process.stdout.on('resize', hr);

process.on('unhandledRejection', (reason) => {
  console.log('unhandledRejection', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  process.exit(1);
});
