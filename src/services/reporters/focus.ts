import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { log } from '../write.js';
import { summaryFooter } from './summary.js';

export const focus: ReporterPlugin = () => {
  let countFails = 0;

  return createReporter({
    onRunStart() {},
    onDescribeAsTitle() {},
    onTodoModifier() {},
    onSkipModifier() {},
    onSkipFile() {},
    onRetryStart() {},
    onRetryEnd() {},
    onFileResult({ status, output }) {
      if (!status) {
        countFails++;

        if (output) log(output);
      }
    },
    onExit({ timespan, results }) {
      summaryFooter(countFails, { timespan, results });
    },
  })();
};
