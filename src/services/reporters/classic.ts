import type { ReporterPlugin } from '../../@types/poku.js';
import { indentation } from '../../configs/indentation.js';
import { log, hr } from '../write.js';
import { format } from '../format.js';
import { createReporter } from '../../builders/reporter.js';
import { poku } from './poku.js';

export const classic: ReporterPlugin = createReporter({
  onRunStart() {
    hr();
    log(`${format('Running Tests').bold()}\n`);
  },
  onFileStart() {},
  onFileResult({ output }) {
    if (output) log(output);
  },
  onRunResult({ results }) {
    const { files } = results;

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
