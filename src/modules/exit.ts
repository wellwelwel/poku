/* c8 ignore start */
import process from 'node:process';
import { hr } from '../helpers/hr.js';
import { results } from '../configs/poku.js';
import { format } from '../helpers/format.js';
import type { Code } from '../@types/code.js';
import { write } from '../helpers/logs.js';
import { fileResults, finalResults } from '../configs/files.js';
import { setTime, toSecs } from '../helpers/time.js';

export const exit = (code: Code, quiet?: boolean) => {
  const isPoku = results.success > 0 || results.fail > 0;

  !quiet &&
    process.on('exit', (code) => {
      if (isPoku) {
        hr();
        write(
          `    ${format(`Start at › ${format(`${setTime(finalResults.started)}`).bold()}`).dim()}`
        );
        write(
          `    ${format('Duration ›').dim()} ${format(`${finalResults.time}ms`).bold().dim()} ${format(`(±${toSecs(finalResults.time)} seconds)`).dim()}`
        );
        write(
          `  ${format(`Test Files › ${format(String(fileResults.success.size + fileResults.fail.size)).bold()}`).dim()}`
        );
        hr();
        write(
          `${format(` PASS › ${results.success} `).bg(42)} ${format(` FAIL › ${results.fail} `).bg(results.fail === 0 ? 100 : 41)}`
        );
        hr();
      }

      write(
        `${format('Exited with code').dim()} ${format(String(code)).bold()[code === 0 ? 'success' : 'fail']()}\n`
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
