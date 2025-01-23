import type { ReporterPlugin } from '../../@types/poku.js';
import { indentation } from '../../configs/indentation.js';
import { parseTime, parseTimeToSecs } from '../../parsers/time.js';
import { log, hr } from '../write.js';
import { format } from '../format.js';
import { GLOBAL } from '../../configs/poku.js';
import { findFile } from '../../parsers/find-file-from-stack.js';
import { relative, resolve } from 'node:path';
import { parseResultType } from '../../parsers/assert.js';
import type { DescribeOptions } from '../../@types/describe.js';
import { stdout } from 'node:process';

const regexFile = /file:(\/\/)?/;

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
      indentation.hasDescribe = true;

      log(format(`◌ ${title}`).bold().dim());
    },
    onDescribeEnd({ title, duration }) {
      indentation.hasDescribe = false;

      log(
        `${format(`● ${title}`).success().bold()} ${format(`› ${duration}ms`).success().dim()}`
      );
    },
    onItStart({ title }) {
      if (title) {
        indentation.hasItOrTest = true;

        log(
          `${indentation.hasDescribe ? '  ' : ''}${format(`◌ ${title}`).dim()}`
        );
      }
    },
    onItEnd({ title, duration }) {
      indentation.hasItOrTest = false;

      log(
        `${indentation.hasDescribe ? '  ' : ''}${format(`● ${title}`).success().bold()} ${format(`› ${duration}ms`).success().dim()}`
      );
    },
    onAssertionSuccess({ message }) {
      let preIdentation = '';

      if (indentation.hasDescribe) preIdentation += '  ';
      if (indentation.hasItOrTest) preIdentation += '  ';

      const output = `${preIdentation}${format(`✔ ${message}`).success().bold()}`;

      log(output);
    },
    onAssertionFailure({ assertOptions: options, error }) {
      const { cwd } = GLOBAL;

      let preIdentation = '';

      const { code, actual, expected, operator } = error;
      const absolutePath = findFile(error).replace(regexFile, '');
      const file = relative(resolve(cwd), absolutePath);

      if (indentation.hasDescribe) preIdentation += '  ';
      if (indentation.hasItOrTest) preIdentation += '  ';

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
      if (!message) return;

      log(format(`◯ ${message}`).info().bold());
    },
    onSkipModifier({ message }) {
      log(
        `${indentation.hasDescribe ? '  ' : ''}${format(`◯ ${message}`).info().bold()}`
      );
    },
    onTodoModifier({ message }) {
      log(
        `${indentation.hasDescribe ? '  ' : ''}${format(`● ${message}`).cyan().bold()}`
      );
    },
    onFileResult({ status, path, output }) {
      stdout.write('\n');

      if (status) {
        log(
          `${format(' › ').bg('brightGreen')} ${format(path.relative).success().underline()}`
        );

        if (output) log(output);
      } else
        log(
          `${format(' › ').bg('brightRed')} ${format(path.relative).fail().underline()}`
        );

      if (!status)
        errors.push({
          file: path.relative,
          output,
        });
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
      const { files, resume } = results;
      const success = ` PASS › ${resume.passed} `;
      const failure = ` FAIL › ${resume.failed} `;
      const skips = ` SKIP › ${resume.skipped} `;
      const plans = ` TODO › ${resume.todo} `;
      const inline = resume.skipped === 0 || resume.todo === 0;

      let message = '';

      if (inline) {
        message += `${format(success).bg('green')} ${format(failure).bg(resume.failed === 0 ? 'grey' : 'brightRed')}`;

        if (resume.skipped) message += ` ${format(skips).bg('brightBlue')}`;
        if (resume.todo) message += ` ${format(plans).bg('brightBlue')}`;
      } else {
        message += `${format(success.trim()).success().bold()}\n`;
        message +=
          resume.failed === 0
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
        `${format('Duration  ›  ').dim()}${format(`${timespan.duration}ms`).bold().dim()} ${format(`(±${parseTimeToSecs(timespan.duration)} seconds)`).dim()}`
      );
      log(
        `${format(`Files     ›  ${format(String(files.passed.size + files.failed.size)).bold()}`).dim()}`
      );
      log(`\n${message}\n`);
    },
  };
})();
