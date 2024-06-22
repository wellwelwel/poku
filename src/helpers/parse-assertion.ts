import { cwd as processCWD, env, exit } from 'node:process';
import path from 'node:path';
import assert from 'node:assert';
import { format } from './format.js';
import { hr } from './hr.js';
import { findFile } from './find-file.js';
/* c8 ignore next */
import { each } from '../configs/each.js';
/* c8 ignore next */
import { indentation } from '../configs/indentation.js';
import { fromEntries, entries } from '../polyfills/object.js';
import { nodeVersion } from './get-runtime.js';
import { write } from './logs.js';
/* c8 ignore next */
import type { ParseAssertionOptions } from '../@types/assert.js';

const cwd = processCWD();

export const parseResultType = (type?: unknown): string => {
  const recurse = (value: unknown): unknown => {
    if (
      typeof value === 'undefined' ||
      typeof value === 'function' ||
      typeof value === 'bigint' ||
      typeof value === 'symbol' ||
      value instanceof RegExp
    )
      return String(value);

    if (Array.isArray(value)) return value.map(recurse);
    if (value instanceof Set) return Array.from(value).map(recurse);
    /* c8 ignore start */
    if (value instanceof Map)
      return recurse(
        !nodeVersion || nodeVersion >= 12
          ? Object.fromEntries(value)
          : fromEntries(value)
      );
    /* c8 ignore stop */

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
  const isPoku = typeof env?.FILE === 'string' && env?.FILE.length > 0;
  const FILE = env.FILE;
  let preIdentation = '';

  if (indentation.hasDescribe || indentation.hasTest) preIdentation += '  ';
  if (indentation.hasIt) preIdentation += '  ';

  try {
    if (typeof each.before.cb === 'function' && each.before.assert) {
      const beforeResult = each.before.cb();
      /* c8 ignore next */
      if (beforeResult instanceof Promise) await beforeResult;
      /* c8 ignore next */
    }

    const cbResult = cb();
    if (cbResult instanceof Promise) await cbResult;

    if (typeof each.after.cb === 'function' && each.after.assert) {
      const afterResult = each.after.cb();
      /* c8 ignore next */
      if (afterResult instanceof Promise) await afterResult;
      /* c8 ignore next */
    }

    if (typeof options.message === 'string') {
      const message = isPoku
        ? `${preIdentation}${format(`${format(`✔ ${options.message}`).bold()} ${format(`› ${FILE}`).success().dim()}`).success()}`
        : `${preIdentation}${format(`✔ ${options.message}`).success().bold()}`;

      write(message);
    }
    /* c8 ignore start */
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

      const finalMessage =
        message?.trim().length > 0
          ? format(`✘ ${message}`).fail().bold()
          : format('✘ No Message').fail().bold();

      write(
        isPoku
          ? `${preIdentation}${finalMessage} ${format(`› ${FILE}`).fail().dim()}`
          : `${preIdentation}${finalMessage}`
      );

      file && write(`${format(`${preIdentation}      File`).dim()} ${file}`);
      write(`${format(`${preIdentation}      Code`).dim()} ${code}`);
      write(`${format(`${preIdentation}  Operator`).dim()} ${operator}\n`);

      if (!options?.hideDiff) {
        const splitActual = parseResultType(actual).split('\n');
        const splitExpected = parseResultType(expected).split('\n');

        write(
          format(`${preIdentation}  ${options?.actual || 'Actual'}:`).dim()
        );
        splitActual.forEach((line) =>
          write(`${preIdentation}  ${format(line).fail().bold()}`)
        );

        write(
          `\n${preIdentation}  ${format(`${options?.expected || 'Expected'}:`).dim()}`
        );
        splitExpected.forEach((line) =>
          write(`${preIdentation}  ${format(line).success().bold()}`)
        );
      }

      if (options.throw) {
        console.error(error);
        hr();
      }

      exit(1);
    }

    // Non-assertion errors
    throw error;
  }
  /* c8 ignore stop */
};
