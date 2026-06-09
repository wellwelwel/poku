import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter, silentHooks } from '../../builders/reporter.js';
import { log } from '../write.js';
import { summaryFooter } from './summary.js';

export const focus: ReporterPlugin = () => {
  return createReporter({
    ...silentHooks,
    onFileResult({ status, output }) {
      if (!status && output) log(output);
    },
    onExit({ timespan, results }) {
      summaryFooter({ timespan, results });
    },
  })();
};
