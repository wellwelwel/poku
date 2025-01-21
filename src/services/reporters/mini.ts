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
    const { files } = results;

    if (files.failed.size === 0) return;

    hr();
    log(
      Array.from(files.failed)
        .map(
          ([file, time]) =>
            `${indentation.test}${format('✘').fail()} ${format(`${file} ${format(`› ${time}ms`).fail()}`).dim()}`
        )
        .join('\n')
    );
  },
  onExit({ results, code }) {
    const { files, resume } = results;

    if (files.failed.size > 0) hr();

    log(
      `${format(String(resume.passed)).bold().dim()} ${format('test file(s) passed').dim()}`
    );
    log(
      `${format(String(resume.failed)).bold().dim()} ${format('test file(s) failed').dim()}`
    );
    log(
      `${format('Exited with code').dim()} ${format(String(code)).bold()[code === 0 ? 'success' : 'fail']()}\n`
    );
  },
});
