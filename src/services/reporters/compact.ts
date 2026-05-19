import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { parseTimeToSecs } from '../../parsers/time.js';
import { format } from '../format.js';
import { hr, log } from '../write.js';
import { errors } from './poku.js';

const BADGE_PASS = '\x1b[102m\x1b[1m PASS \x1b[0m';
const BADGE_FAIL = '\x1b[101m\x1b[1m FAIL \x1b[0m';
const LABEL_FILES_PASSED = '\x1b[2mtest file(s) passed\x1b[0m';
const LABEL_FILES_FAILED = '\x1b[2mtest file(s) failed\x1b[0m';

export const compact: ReporterPlugin = (() => {
  let countFails = 0;

  return createReporter({
    onRunStart() {},
    onFileStart() {},
    onDescribeAsTitle() {},
    onSkipFile() {},
    onSkipModifier() {},
    onTodoModifier() {},
    onFileResult({ status, path, output }) {
      log(`${status ? BADGE_PASS : BADGE_FAIL} ${path.relative}`);

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
        `${format(String(results.passed)).bold().dim()} ${LABEL_FILES_PASSED}`
      );
      log(
        `${format(String(results.failed)).bold().dim()} ${LABEL_FILES_FAILED}`
      );
      log(
        `${format(`Finished in ±${parseTimeToSecs(timespan.duration)} seconds`).dim()}`
      );
    },
  });
})();
