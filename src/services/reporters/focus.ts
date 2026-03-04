import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { parseTimeToSecs } from '../../parsers/time.js';
import { format } from '../format.js';
import { hr, log } from '../write.js';

const LABEL_FILES_PASSED = '\x1b[2mtest file(s) passed\x1b[0m';
const LABEL_FILES_FAILED = '\x1b[2mtest file(s) failed\x1b[0m';

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

      log(`${format(String(results.passed)).bold().dim()} ${LABEL_FILES_PASSED}`);
      log(`${format(String(results.failed)).bold().dim()} ${LABEL_FILES_FAILED}`);
      log(
        `${format(`Finished in ±${parseTimeToSecs(timespan.duration)} seconds`).dim()}`
      );
    },
  });
})();
