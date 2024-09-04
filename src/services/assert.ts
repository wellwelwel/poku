import type { ProcessAssertionOptions } from '../@types/assert.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import path from 'node:path';
import { findFile } from '../parsers/find-file-from-stack.js';
import { parseResultType } from '../parsers/assert.js';
import { indentation } from '../configs/indentation.js';
import { format } from './format.js';
import { Write } from './write.js';

const cwd = process.cwd();
const regexFile = /file:(\/\/)?/;

const assertProcessor = () => {
  const isPoku =
    typeof process.env?.FILE === 'string' && process.env?.FILE.length > 0;
  const FILE = process.env.FILE;

  let preIdentation = '';

  const handleSuccess = (options: ProcessAssertionOptions) => {
    if (typeof options.message === 'string') {
      if (indentation.hasDescribe) preIdentation += '  ';
      if (indentation.hasItOrTest) preIdentation += '  ';

      const message =
        isPoku && !indentation.hasDescribe && !indentation.hasItOrTest
          ? `${preIdentation}${format(`${format(`✔ ${options.message}`).bold()} ${format(`› ${FILE}`).success().dim()}`).success()}`
          : `${preIdentation}${format(`✔ ${options.message}`).success().bold()}`;

      Write.log(message);
    }

    preIdentation = '';
  };

  const handleError = (error: unknown, options: ProcessAssertionOptions) => {
    process.exitCode = 1;

    if (error instanceof AssertionError) {
      const { code, actual, expected, operator } = error;
      const absolutePath = findFile(error).replace(regexFile, '');
      const file = path.relative(path.resolve(cwd), absolutePath);

      if (indentation.hasDescribe) preIdentation += '  ';
      if (indentation.hasItOrTest) preIdentation += '  ';

      let message = '';

      if (typeof options.message === 'string') message = options.message;
      else if (options.message instanceof Error)
        message = options.message.message;
      else if (typeof options.defaultMessage === 'string')
        message = options.defaultMessage;

      const finalMessage =
        message?.trim().length > 0
          ? format(`✘ ${message}`).fail().bold()
          : format('✘ Assertion Error').fail().bold();

      Write.log(
        isPoku
          ? `${preIdentation}${finalMessage} ${format(`› ${FILE}`).fail().dim()}`
          : `${preIdentation}${finalMessage}`
      );

      file &&
        Write.log(`${format(`${preIdentation}      File`).dim()} ${file}`);
      Write.log(`${format(`${preIdentation}      Code`).dim()} ${code}`);
      Write.log(`${format(`${preIdentation}  Operator`).dim()} ${operator}\n`);

      if (!options?.hideDiff) {
        const splitActual = parseResultType(actual).split('\n');
        const splitExpected = parseResultType(expected).split('\n');

        Write.log(
          format(`${preIdentation}  ${options?.actual ?? 'Actual'}:`).dim()
        );

        for (const line of splitActual)
          Write.log(`${preIdentation}  ${format(line).fail().bold()}`);

        Write.log(
          `\n${preIdentation}  ${format(`${options?.expected ?? 'Expected'}:`).dim()}`
        );

        for (const line of splitExpected)
          Write.log(`${preIdentation}  ${format(line).success().bold()}`);

        preIdentation = '';
      }

      if (options.throw) {
        console.error(error);
        Write.hr();
      }

      if (isPoku) throw error;
    }

    /* c8 ignore next */ // Unknown external error
    throw error;
  };

  const processAssert = (cb: () => void, options: ProcessAssertionOptions) => {
    try {
      cb();
      handleSuccess(options);
    } catch (error) {
      handleError(error, options);
    }
  };

  const processAsyncAssert = async (
    cb: () => Promise<void>,
    options: ProcessAssertionOptions
  ) => {
    try {
      await cb();
      handleSuccess(options);
    } catch (error) {
      handleError(error, options);
    }
  };

  return { processAssert, processAsyncAssert };
};

export const { processAssert, processAsyncAssert } = assertProcessor();
