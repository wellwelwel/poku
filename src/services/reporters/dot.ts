import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { hr } from '../write.js';
import { format } from '../format.js';
import { stdout } from 'node:process';
import { poku, errors } from './poku.js';

export const dot: ReporterPlugin = (() => {
  return createReporter({
    onRunStart() {
      hr();
    },
    onDescribeAsTitle() {},
    onTodoModifier() {},
    onSkipModifier() {},
    onSkipFile() {},
    onFileResult({ path, status, output }) {
      stdout.write(
        status ? String(format('.')) : String(format('F').bold().code('31'))
      );

      if (!status)
        errors.push({
          file: path.relative,
          output,
        });
    },
    onRunResult(options) {
      stdout.write('\n');
      poku.onRunResult(options);
    },
  });
})();
