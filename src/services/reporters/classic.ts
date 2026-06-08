import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { indentation } from '../../configs/indentation.js';
import { format } from '../format.js';
import { hr, log } from '../write.js';
import { poku } from './poku.js';

const formatFile = (
  icon: string,
  status: 'success' | 'fail',
  file: string,
  time: number
): string =>
  `${indentation.test}${format(icon)[status]()} ${format(`${file} ${format(`› ${time.toFixed(6)}ms`)[status]()}`).dim()}`;

export const classic: ReporterPlugin = () => {
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
            .map(([file, time]) => formatFile('✔', 'success', file, time))
            .join('\n')
        );

        return;
      }

      if (files.failed.size > 0) {
        log(
          Array.from(files.failed)
            .map(([file, time]) => formatFile('✘', 'fail', file, time))
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
  })();
};
