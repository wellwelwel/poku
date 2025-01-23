import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { format } from '../format.js';
import { log } from '../write.js';
import { poku } from './poku.js';

export const verbose: ReporterPlugin = (() => {
  return createReporter({
    onRunStart() {
      log(`${format('Running Tests').bold()}\n`);
    },
    onFileResult({ status, path, output }) {
      poku.onFileResult({ status, path, output });

      if (!status && output) log(output);
    },
  });
})();
