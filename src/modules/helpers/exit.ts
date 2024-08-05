import type { Code } from '../../@types/code.js';
import process from 'node:process';
import { results } from '../../configs/poku.js';
import { format } from '../../services/format.js';
import { Write } from '../../services/write.js';
import { fileResults, finalResults } from '../../configs/files.js';
import { parseTime, parseTimeToSecs } from '../../parsers/time.js';

export const exit = (code: Code, quiet?: boolean): never => {
  const isPoku = results.success > 0 || results.fail > 0;
  const success = ` PASS › ${results.success - results.skip || 0} `;
  const failure = ` FAIL › ${results.fail} `;
  const skips = ` SKIP › ${results.skip} `;
  const plans = ` TODO › ${results.todo} `;
  const inline = results.skip === 0 || results.todo === 0;

  let message = '';

  if (inline) {
    message += `${format(success).bg('green')} ${format(failure).bg(results.fail === 0 ? 'grey' : 'brightRed')}`;

    if (results.skip) {
      message += ` ${format(skips).bg('brightBlue')}`;
    }

    if (results.todo) {
      message += ` ${format(plans).bg('brightBlue')}`;
    }
  } else {
    message += `${format(success).success().bold()}\n`;
    message +=
      results.fail === 0
        ? format(`${failure}\n`).bold()
        : `${format(failure).fail().bold()}\n`;
    message += `${format(skips).info().bold()}\n`;
    message += `${format(plans).info().bold()}`;
  }

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
        Write.log(message);
        Write.hr();
      }

      Write.log(
        `${format('Exited with code').dim()} ${format(String(code)).bold()[code === 0 ? 'success' : 'fail']()}\n`
      );
    });

  process.exit(code === 0 ? 0 : 1);
};

/* c8 ignore next 4 */ // Unknown external error
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection', reason);
  process.exit(1);
});

/* c8 ignore next 4 */ // Unknown external error
process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  process.exit(1);
});
