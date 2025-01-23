import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { hr, log } from '../write.js';
import { format } from '../format.js';
import { parseTimeToSecs } from '../../parsers/time.js';

export const focus: ReporterPlugin = (() => {
  let countFails = 0;

  return createReporter({
    onRunStart() {},
    onDescribeAsTitle() {},
    onDescribeStart() {},
    onDescribeEnd() {},
    onItStart() {},
    onItEnd() {},
    onAssertionSuccess() {},
    onTodoModifier() {},
    onSkipModifier() {},
    onSkipFile() {},
    onFileResult({ status, output }) {
      if (!status) {
        countFails++;

        if (output) log(output);
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
