/* c8 ignore next */ // Types
import type { ProcessAssertionOptions } from '../@types/assert.js';
import { cwd as processCWD, env, exit } from 'node:process';
import path from 'node:path';
import { AssertionError } from 'node:assert';
import { findFile } from '../parsers/find-file-from-stack.js';
import { parseResultType } from '../parsers/assert.js';
import { indentation } from '../configs/indentation.js';
import { format } from './format.js';
import { Write } from './write.js';

const cwd = processCWD();
const regexFile = /file:(\/\/)?/;

export const processAssert = async (
  cb: () => void | Promise<void>,
  options: ProcessAssertionOptions
) => {
  const isPoku = typeof env?.FILE === 'string' && env?.FILE.length > 0;
  const FILE = env.FILE;
  let preIdentation = '';

  if (indentation.hasDescribe || indentation.hasTest) {
    preIdentation += '  ';
  }

  if (indentation.hasIt) {
    preIdentation += '  ';
  }

  try {
    const cbResult = cb();

    /* c8 ignore next 3 */
    if (cbResult instanceof Promise) {
      await cbResult;
    }

    if (typeof options.message === 'string') {
      const message =
        isPoku &&
        !indentation.hasDescribe &&
        !indentation.hasIt &&
        /* c8 ignore next 2 */
        !indentation.hasTest
          ? `${preIdentation}${format(`${format(`✔ ${options.message}`).bold()} ${format(`› ${FILE}`).success().dim()}`).success()}`
          : `${preIdentation}${format(`✔ ${options.message}`).success().bold()}`;

      Write.log(message);
    }
    /* c8 ignore start */
  } catch (error) {
    if (error instanceof AssertionError) {
      const { code, actual, expected, operator } = error;
      const absoultePath = findFile(error).replace(regexFile, '');
      const file = path.relative(path.resolve(cwd), absoultePath);

      let message = '';

      if (typeof options.message === 'string') {
        message = options.message;
      } else if (options.message instanceof Error) {
        message = options.message.message;
      } else if (typeof options.defaultMessage === 'string') {
        message = options.defaultMessage;
      }

      const finalMessage =
        message?.trim().length > 0
          ? format(`✘ ${message}`).fail().bold()
          : format('✘ No Message').fail().bold();

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
          format(`${preIdentation}  ${options?.actual || 'Actual'}:`).dim()
        );

        for (const line of splitActual) {
          Write.log(`${preIdentation}  ${format(line).fail().bold()}`);
        }

        Write.log(
          `\n${preIdentation}  ${format(`${options?.expected || 'Expected'}:`).dim()}`
        );

        for (const line of splitExpected) {
          Write.log(`${preIdentation}  ${format(line).success().bold()}`);
        }
      }

      if (options.throw) {
        console.error(error);
        Write.hr();
      }

      exit(1);
    }

    // Non-assertion errors
    throw error;
  }
  /* c8 ignore stop */
};
