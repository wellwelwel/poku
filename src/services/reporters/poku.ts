import type { DescribeOptions } from '../../@types/describe.js';
import type { ReporterPlugin } from '../../@types/poku.js';
import { relative, resolve } from 'node:path';
import { stdout } from 'node:process';
import { indentation } from '../../configs/indentation.js';
import { GLOBAL } from '../../configs/poku.js';
import { parseResultType } from '../../parsers/assert.js';
import { findFileFromStack } from '../../parsers/find-file-from-stack.js';
import {
  formatDuration,
  parseTime,
  parseTimeToSecs,
} from '../../parsers/time.js';
import {
  fmtBoldDim,
  fmtCyanBold,
  fmtDim,
  fmtFailBold,
  fmtFailDim,
  fmtFailUnderline,
  fmtInfoBold,
  fmtSuccessBold,
  fmtSuccessDim,
  fmtSuccessUnderline,
  format,
} from '../format.js';
import { hr, log } from '../write.js';

const ARROW_PASS = '\x1b[32m\x1b[1m›\x1b[0m';
const ARROW_FAIL = '\x1b[91m\x1b[1m›\x1b[0m';

export const errors: { file: string; output?: string }[] = [];

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

      log(`${indentation.indent}${fmtBoldDim(`◌ ${title}`)}`);
    },
    onDescribeEnd({ title, duration, success = true }) {
      const indent = indentation.indent;
      const dur = `› ${formatDuration(duration)}ms`;

      if (success)
        log(`${indent}${fmtSuccessBold(`● ${title}`)} ${fmtSuccessDim(dur)}`);
      else log(`${indent}${fmtFailBold(`● ${title}`)} ${fmtFailDim(dur)}`);
    },
    onItStart({ title }) {
      if (!title) return;

      log(`${indentation.indent}${fmtDim(`◌ ${title}`)}`);
    },
    onItEnd({ title, duration, success = true }) {
      const indent = indentation.indent;
      const dur = `› ${formatDuration(duration)}ms`;

      if (success)
        log(`${indent}${fmtSuccessBold(`● ${title}`)} ${fmtSuccessDim(dur)}`);
      else log(`${indent}${fmtFailBold(`● ${title}`)} ${fmtFailDim(dur)}`);
    },
    onAssertionSuccess({ message }) {
      log(`${indentation.indent}${fmtSuccessBold(`✔ ${message}`)}`);
    },
    onAssertionFailure({ assertOptions: options, error }) {
      const { cwd } = GLOBAL;

      let preIdentation = indentation.indent;

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
      log(fmtInfoBold(`◯ ${message}`));
    },
    onSkipModifier({ message }) {
      log(`${indentation.indent}${fmtInfoBold(`◯ ${message}`)}`);
    },
    onTodoModifier({ message }) {
      log(`${indentation.indent}${fmtCyanBold(`● ${message}`)}`);
    },
    onFileResult({ status, path, duration, output }) {
      const dur = `› ${formatDuration(duration)}ms`;

      if (status) {
        log(
          `\n${ARROW_PASS} ${fmtSuccessUnderline(path.relative)} ${fmtSuccessDim(dur)}`
        );

        if (output) log(output);
      } else {
        log(
          `\n${ARROW_FAIL} ${fmtFailUnderline(path.relative)} ${fmtFailDim(dur)}`
        );

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
        if (Object.prototype.hasOwnProperty.call(errors, i)) {
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
          `${formatDuration(timespan.duration)}ms`
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
