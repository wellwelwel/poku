import type { DescribeOptions } from '../../@types/describe.js';
import type { ReporterPlugin } from '../../@types/poku.js';
import { relative, resolve } from 'node:path';
import { stdout } from 'node:process';
import { cwd } from '../../configs/cwd.js';
import { indentation } from '../../configs/indentation.js';
import { getSharedState } from '../../configs/shared-state.js';
import { parseResultType } from '../../parsers/assert.js';
import { findFileFromStack } from '../../parsers/find-file-from-stack.js';
import { parseTime, parseTimeToSecs } from '../../parsers/time.js';
import { format } from '../format.js';
import { hr, log } from '../write.js';

const ARROW_PASS = '\x1b[32m\x1b[1m›\x1b[0m';
const ARROW_FAIL = '\x1b[91m\x1b[1m›\x1b[0m';

const getIndent = () =>
  indentation.test.repeat(indentation.describeDepth + indentation.itDepth);

export const errors = getSharedState<{ file: string; output?: string }[]>(
  'errors',
  []
);

export const poku: ReturnType<ReporterPlugin> = (() => {
  return {
    onRunStart() {},
    onFileStart() {},
    onDescribeAsTitle(title, options) {
      const { background, icon } =
        options ?? (Object.create(null) as DescribeOptions);

      const message = `${icon ?? '☰'} ${format(title).bold()}`;
      const noBackground = !background;

      if (noBackground) log(format(message).bold());
      else
        log(
          format(` ${message} `).bg(
            typeof background === 'string' ? background : 'grey'
          )
        );
    },
    onDescribeStart({ title }) {
      if (!title) return;

      const indent = getIndent();

      log(`${indent}${format(`◌ ${title}`).bold().dim()}`);
    },
    onDescribeEnd({ title, duration, success = true }) {
      const status = success ? 'success' : 'fail';

      const indent = getIndent();

      log(
        `${indent}${format(`● ${title}`)[status]().bold()} ${format(
          `› ${duration.toFixed(6)}ms`
        )
          [status]()
          .dim()}`
      );
    },
    onItStart({ title }) {
      if (!title) return;

      const indent = getIndent();

      log(`${indent}${format(`◌ ${title}`).dim()}`);
    },
    onItEnd({ title, duration, success = true }) {
      const status = success ? 'success' : 'fail';

      const indent = getIndent();

      log(
        `${indent}${format(`● ${title}`)[status]().bold()} ${format(
          `› ${duration.toFixed(6)}ms`
        )
          [status]()
          .dim()}`
      );
    },
    onAssertionSuccess({ message }) {
      const preIdentation = getIndent();

      const output = `${preIdentation}${format(`✔ ${message}`).success().bold()}`;

      log(output);
    },
    onAssertionFailure({ assertOptions: options, error }) {
      let preIdentation = getIndent();

      const { code, actual, expected, operator } = error;
      const fileRef = findFileFromStack(error.stack, {
        skipInternal: true,
      });
      const absolutePath =
        fileRef.indexOf('file://') === 0 ? fileRef.slice(7) : fileRef;
      const file = relative(resolve(cwd), absolutePath);

      let message = '';

      if (typeof options.message === 'string') message = options.message;
      else if (options.message instanceof Error)
        message = options.message.message;
      else if (typeof options.defaultMessage === 'string')
        message = options.defaultMessage;

      const output =
        message?.trim().length > 0
          ? format(`✘ ${message}`).fail().bold()
          : format('✘ Assertion Error').fail().bold();

      log(`${preIdentation}${output}`);

      file && log(`${format(`${preIdentation}      File`).dim()} ${file}`);
      log(`${format(`${preIdentation}      Code`).dim()} ${code}`);
      log(`${format(`${preIdentation}  Operator`).dim()} ${operator}\n`);

      if (!options?.hideDiff) {
        const splitActual = parseResultType(actual).split('\n');
        const splitExpected = parseResultType(expected).split('\n');

        log(format(`${preIdentation}  ${options?.actual ?? 'Actual'}:`).dim());

        for (const line of splitActual)
          log(`${preIdentation}  ${format(line).fail().bold()}`);

        log(
          `\n${preIdentation}  ${format(`${options?.expected ?? 'Expected'}:`).dim()}`
        );

        for (const line of splitExpected)
          log(`${preIdentation}  ${format(line).success().bold()}`);

        preIdentation = '';
      }

      if (options.throw) {
        console.error(error);
        hr();
      }
    },
    onSkipFile({ message }) {
      log(format(`◯ ${message}`).info().bold());
    },
    onSkipModifier({ message }) {
      const indent = getIndent();

      log(`${indent}${format(`◯ ${message}`).info().bold()}`);
    },
    onTodoModifier({ message }) {
      const indent = getIndent();

      log(`${indent}${format(`● ${message}`).cyan().bold()}`);
    },
    onRetryStart({ attempt, total }) {
      const indent = indentation.test.repeat(
        indentation.describeDepth + indentation.itDepth
      );

      log(`${indent}${format(`↻ Retry ${attempt}/${total}`).dim()}`);
    },
    onRetryEnd({ attempt, success }) {
      if (success && attempt > 1) {
        const indent = indentation.test.repeat(
          indentation.describeDepth + indentation.itDepth
        );

        log(`${indent}${format(`✔ Retry succeeded`).success().dim()}`);
      }
    },
    onFileResult({ status, path, duration, output }) {
      stdout.write('\n');

      if (status) {
        log(
          `${ARROW_PASS} ${format(path.relative).success().underline()} ${format(
            `› ${duration.toFixed(6)}ms`
          )
            .success()
            .dim()}`
        );

        if (output) log(output);
      } else
        log(
          `${ARROW_FAIL} ${format(path.relative).fail().underline()} ${format(
            `› ${duration.toFixed(6)}ms`
          )
            .fail()
            .dim()}`
        );

      if (!status) {
        errors.push({
          file: path.relative,
          output,
        });

        if (output) log(output);
      }
    },
    onRunResult() {
      if (errors.length === 0) return;

      hr();
      log(
        `${format(String(errors.length)).fail().bold()} ${format('test file(s) failed:').bold()}\n`
      );

      for (const i in errors) {
        const { file, output } = errors[i];
        const index = +i;

        index > 0 && stdout.write('\n');

        log(
          `${format(`${index + 1})`)
            .dim()
            .bold()} ${format(file).underline()}`
        );

        output && log(`\n${output}`);
      }
    },
    onExit({ results, timespan }) {
      const success = ` PASS › ${results.passed} `;
      const failure = ` FAIL › ${results.failed} `;
      const skips = ` SKIP › ${results.skipped} `;
      const plans = ` TODO › ${results.todo} `;
      const inline = results.skipped === 0 || results.todo === 0;

      let message = '';

      if (inline) {
        message += `${format(success).bg('green')} ${format(failure).bg(results.failed === 0 ? 'grey' : 'brightRed')}`;

        if (results.skipped) message += ` ${format(skips).bg('brightBlue')}`;
        if (results.todo) message += ` ${format(plans).bg('brightBlue')}`;
      } else {
        message += `${format(success.trim()).success().bold()}\n`;
        message +=
          results.failed === 0
            ? format(`${failure.trim()}\n`).bold()
            : `${format(failure.trim()).fail().bold()}\n`;
        message += `${format(skips.trim()).info().bold()}\n`;
        message += `${format(plans.trim()).info().bold()}`;
      }

      hr();
      log(
        `${format(`Start at  ›  ${format(`${parseTime(timespan.started)}`).bold()}`).dim()}`
      );
      log(
        `${format('Duration  ›  ').dim()}${format(
          `${timespan.duration.toFixed(6)}ms`
        )
          .bold()
          .dim()} ${format(`(±${parseTimeToSecs(timespan.duration)} seconds)`).dim()}`
      );
      log(
        `${format(`Files     ›  ${format(String(results.passed + results.failed)).bold()}`).dim()}`
      );
      log(`\n${message}\n`);
    },
  };
})();
