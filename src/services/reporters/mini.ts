import type { ReporterPlugin } from '../../@types/poku.js';
import { createReporter } from '../../builders/reporter.js';
import { indentation } from '../../configs/indentation.js';
import { hr, log } from '../write.js';
import { format } from '../format.js';

export const mini: ReporterPlugin = createReporter({
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
  onRunResult({ results }) {
    if (results.fail.size === 0) return;

    hr();
    log(
      Array.from(results.fail)
        .map(
          ([file, time]) =>
            `${indentation.test}${format('✘').fail()} ${format(`${file} ${format(`› ${time}ms`).fail()}`).dim()}`
        )
        .join('\n')
    );
  },
  onExit({ results, fileResults, code }) {
    if (fileResults.fail.size > 0) hr();

    log(
      `${format(String(results.success)).bold().dim()} ${format('test file(s) passed').dim()}`
    );
    log(
      `${format(String(results.fail)).bold().dim()} ${format('test file(s) failed').dim()}`
    );
    log(
      `${format('Exited with code').dim()} ${format(String(code)).bold()[code === 0 ? 'success' : 'fail']()}\n`
    );
  },
});
