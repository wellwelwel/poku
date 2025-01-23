import type { ReporterPlugin } from '../../@types/poku.js';
import { hr, log } from '../write.js';
import { format } from '../format.js';
import { createReporter } from '../../builders/reporter.js';
import { errors } from './poku.js';
import { parseTimeToSecs } from '../../parsers/time.js';

export const compact: ReporterPlugin = (() => {
  let countFails = 0;

  return createReporter({
    onRunStart() {},
    onFileStart() {},
    onDescribeAsTitle() {},
    onDescribeStart() {},
    onDescribeEnd() {},
    onItStart() {},
    onItEnd() {},
    onAssertionSuccess() {},
    onSkipFile() {},
    onSkipModifier() {},
    onTodoModifier() {},
    onFileResult({ status, path, output }) {
      log(
        `${status ? format(' PASS ').bg('brightGreen') : format(' FAIL ').bg('brightRed')} ${path.relative}`
      );

      if (!status) {
        countFails++;

        errors.push({
          file: path.relative,
          output,
        });
      }
    },
    onExit({ timespan, results }) {
      if (countFails > 0) hr();

      log(
        `${format(String(results.passed)).bold().dim()} ${format('test file(s) passed').dim()}`
      );
      log(
        `${format(String(results.failed)).bold().dim()} ${format('test file(s) failed').dim()}`
      );
      log(
        `${format(`Finished in ±${parseTimeToSecs(timespan.duration)} seconds`).dim()}`
      );
    },
  });
})();
