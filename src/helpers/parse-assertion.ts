import process from 'node:process';
import path from 'node:path';
import assert from 'node:assert';
import { EOL } from 'node:os';
import { format } from './format.js';
import { hr } from './hr.js';
import { findFile } from './find-file.js';
import { each } from '../configs/each.js';
import { describeCounter } from '../modules/describe.js';
import { fromEntries, entries } from '../polyfills/object.js';
import { nodeVersion } from './get-runtime.js';
import { write } from './logs.js';
/* c8 ignore next */
import type { ParseAssertionOptions } from '../@types/assert.js';

const cwd = process.cwd();

export const parseResultType = (type?: unknown): string => {
  const recurse = (value: unknown): unknown => {
    if (typeof value === 'undefined') return 'undefined';

    if (
      typeof value === 'function' ||
      typeof value === 'bigint' ||
      value instanceof RegExp
    )
      return String(value);

    if (Array.isArray(value)) return value.map(recurse);

    /* c8 ignore start */
    if (value !== null && typeof value === 'object') {
      if (!nodeVersion || nodeVersion >= 12)
        return Object.fromEntries(
          Object.entries(value).map(([key, val]) => [key, recurse(val)])
        );

      return fromEntries(
        entries(value).map(([key, val]) => [key, recurse(val)])
      );
    }
    /* c8 ignore stop */

    return value;
  };

  const result = recurse(type);

  return typeof result === 'string' ? result : JSON.stringify(result, null, 2);
};

export const parseAssertion = async (
  cb: () => void | Promise<void>,
  options: ParseAssertionOptions
) => {
  const isPoku =
    typeof process.env?.FILE === 'string' && process.env?.FILE.length > 0;
  const FILE = process.env.FILE;
  const preIdentation = describeCounter > 0 ? '  ' : '';

  try {
    if (typeof each.before.cb === 'function' && each.before.assert) {
      const beforeResult = each.before.cb();
      if (beforeResult instanceof Promise) await beforeResult;
    }

    const cbResult = cb();
    if (cbResult instanceof Promise) await cbResult;

    if (typeof each.after.cb === 'function' && each.after.assert) {
      const afterResult = each.after.cb();
      if (afterResult instanceof Promise) await afterResult;
    }

    if (typeof options.message === 'string') {
      const message = isPoku
        ? `${preIdentation}${format.bold(format.success(`✔ ${options.message}`))} ${format.dim(format.success(`› ${FILE}`))}`
        : `${preIdentation}${format.bold(format.success(`✔ ${options.message}`))}`;

      write(message);
    }
  } catch (error) {
    if (error instanceof assert.AssertionError) {
      const { code, actual, expected, operator } = error;
      const absoultePath = findFile(error).replace(/file:(\/\/)?/, '');
      const file = path.relative(path.resolve(cwd), absoultePath);

      let message: string = '';

      if (typeof options.message === 'string') message = options.message;
      else if (options.message instanceof Error)
        message = options.message.message;
      else if (typeof options.defaultMessage === 'string')
        message = options.defaultMessage;

      /* c8 ignore start */
      const finalMessage =
        message?.trim().length > 0
          ? format.bold(format.fail(`✘ ${message}`))
          : format.bold(format.fail('✘ No Message'));

      write(
        isPoku
          ? `${preIdentation}${finalMessage} ${format.dim(format.fail(`› ${FILE}`))}`
          : `${preIdentation}${finalMessage}`
      );

      file && write(`${format.dim(`${preIdentation}      File`)} ${file}`);
      write(`${format.dim(`${preIdentation}      Code`)} ${code}`);
      write(`${format.dim(`${preIdentation}  Operator`)} ${operator}${EOL}`);

      if (!options?.hideDiff) {
        const splitActual = parseResultType(actual).split('\n');
        const splitExpected = parseResultType(expected).split('\n');

        write(format.dim(`${preIdentation}  ${options?.actual || 'Actual'}:`));
        splitActual.forEach((line) =>
          write(`${preIdentation}  ${format.bold(format.fail(line))}`)
        );

        write(
          `${EOL}${preIdentation}  ${format.dim(`${options?.expected || 'Expected'}:`)}`
        );
        splitExpected.forEach((line) =>
          write(`${preIdentation}  ${format.bold(format.success(line))}`)
        );
      }

      if (options.throw) {
        console.error(error);
        hr();
      }

      process.exit(1);
    }

    // Non-assertion errors
    throw error;
  }
  /* c8 ignore stop */
  /* c8 ignore next */
};
