import type { Code } from '../../@types/code.js';
import process from 'node:process';
import { results } from '../../configs/poku.js';
import { format } from '../../services/format.js';
import { Write } from '../../services/write.js';
import { fileResults, finalResults } from '../../configs/files.js';
import { parseTime, parseTimeToSecs } from '../../parsers/time.js';

export const exit = (code: Code, quiet?: boolean) => {
  const isPoku = results.success > 0 || results.fail > 0;

  !quiet &&
    process.on('exit', (code) => {
      if (isPoku) {
        Write.hr();
        Write.log(
          `    ${format(`Start at › ${format(`${parseTime(finalResults.started)}`).bold()}`).dim()}`
        );
        Write.log(
          `    ${format('Duration ›').dim()} ${format(`${finalResults.time}ms`).bold().dim()} ${format(`(±${parseTimeToSecs(finalResults.time)} seconds)`).dim()}`
        );
        Write.log(
          `  ${format(`Test Files › ${format(String(fileResults.success.size + fileResults.fail.size)).bold()}`).dim()}`
        );
        Write.hr();
        Write.log(
          `${format(` PASS › ${results.success} `).bg('green')} ${format(` FAIL › ${results.fail} `).bg(results.fail === 0 ? 'grey' : 'red')}`
        );
        Write.hr();
      }

      Write.log(
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
