import type { ReporterPlugin } from '../../@types/poku.js';
import { hr, log } from '../write.js';
import { format } from '../format.js';
import { createReporter } from '../../builders/reporter.js';
import { errors, poku } from './poku.js';
import { parseTimeToSecs } from '../../parsers/time.js';
import { stdout } from 'node:process';

export const compact: ReporterPlugin = (() => {
  return createReporter({
    onRunStart() {},
    onFileStart() {},
    onDescribeAsTitle() {},
    onDescribeStart() {},
    onDescribeEnd() {},
    onItStart() {},
    onItEnd() {},
    onAssertionSuccess() {},
    onSkipFile() {},
    onSkipModifier() {},
    onTodoModifier() {},
    onFileResult({ status, path, output }) {
      log(
        `${status ? format(' PASS ').bg('brightGreen') : format(' FAIL ').bg('brightRed')} ${path.relative}`
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
    onExit({ timespan, results }) {
      const { files, resume } = results;

      if (files.failed.size > 0) hr();

      log(
        `${format(String(resume.passed)).bold().dim()} ${format('test file(s) passed').dim()}`
      );
      log(
        `${format(String(resume.failed)).bold().dim()} ${format('test file(s) failed').dim()}`
      );
      log(
        `${format(`Finished in ±${parseTimeToSecs(timespan.duration)} seconds.`).dim()}`
      );
    },
  });
})();
