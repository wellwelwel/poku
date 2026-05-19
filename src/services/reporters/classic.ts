import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { indentation } from '../../configs/indentation.js';
import { format } from '../format.js';
import { hr, log } from '../write.js';
import { poku } from './poku.js';

export const classic: ReporterPlugin = (() => {
  const files = {
    passed: new Map<string, number>(),
    failed: new Map<string, number>(),
  };

  return createReporter({
    onRunStart() {
      hr();
      log(`${format('Running Tests').bold()}\n`);
    },
    onFileStart() {},
    onFileResult({ status, path, duration, output }) {
      if (status) files.passed.set(path.relative, duration);
      else files.failed.set(path.relative, duration);

      if (output) log(output);
    },
    onRunResult() {
      hr();

      if (files.passed.size > 0 && files.failed.size === 0) {
        log(
          Array.from(files.passed)
            .map(
              ([file, time]) =>
                `${indentation.test}${format('✔').success()} ${format(`${file} ${format(`› ${time.toFixed(6)}ms`).success()}`).dim()}`
            )
            .join('\n')
        );

        return;
      }

      if (files.failed.size > 0) {
        log(
          Array.from(files.failed)
            .map(
              ([file, time]) =>
                `${indentation.test}${format('✘').fail()} ${format(`${file} ${format(`› ${time.toFixed(6)}ms`).fail()}`).dim()}`
            )
            .join('\n')
        );
      }
    },
    onExit(options) {
      const { code } = options;

      poku.onExit(options);
      log(
        `${format('Exited with code').dim()} ${format(String(code)).bold()[code === 0 ? 'success' : 'fail']()}\n`
      );
    },
  });
})();
