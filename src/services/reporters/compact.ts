import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { log } from '../write.js';
import { errors } from './poku.js';
import { summaryFooter } from './summary.js';

const BADGE_PASS = '\x1b[102m\x1b[1m PASS \x1b[0m';
const BADGE_FAIL = '\x1b[101m\x1b[1m FAIL \x1b[0m';

export const compact: ReporterPlugin = () => {
  let countFails = 0;

  return createReporter({
    onRunStart() {},
    onFileStart() {},
    onDescribeAsTitle() {},
    onSkipFile() {},
    onSkipModifier() {},
    onTodoModifier() {},
    onRetryStart() {},
    onRetryEnd() {},
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
      summaryFooter(countFails, { timespan, results });
    },
  })();
};
