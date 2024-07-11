/* c8 ignore next 3 */ // Types
import type { ProcessAssertionOptions } from '../@types/assert.js';
import type assert from 'node:assert';
import type { AssertPredicate } from 'node:assert';
import { AssertionError } from 'node:assert';
import { cwd as processCWD, env, exit } from 'node:process';
import path from 'node:path';
import { findFile } from '../parsers/find-file-from-stack.js';
import { parseResultType } from '../parsers/assert.js';
import { nodeVersion } from '../parsers/get-runtime.js';
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

/* c8 ignore next */ // ?
export const createAssert = (nodeAssert: typeof assert) => {
  const ok = (
    value: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(
      () => {
        nodeAssert.ok(value);
      },
      { message }
    );
  };

  const equal = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(
      () => {
        nodeAssert.equal(actual, expected);
      },
      { message }
    );
  };

  const deepEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(() => nodeAssert.deepEqual(actual, expected), { message });
  };

  const strictEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(() => nodeAssert.strictEqual(actual, expected), { message });
  };

  const deepStrictEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(() => nodeAssert.deepStrictEqual(actual, expected), {
      message,
    });
  };

  const notEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(() => nodeAssert.notEqual(actual, expected), {
      message,
    });
  };

  const notDeepEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(() => nodeAssert.notDeepEqual(actual, expected), { message });
  };

  const notStrictEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(() => nodeAssert.notStrictEqual(actual, expected), {
      message,
    });
  };

  const notDeepStrictEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(() => nodeAssert.notDeepStrictEqual(actual, expected), {
      message,
    });
  };

  const ifError = (
    value: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(
      () => {
        nodeAssert.ifError(value);
      },
      {
        message,
        defaultMessage: 'Expected no error, but received an error',
        hideDiff: true,
        throw: true,
      }
    );
  };

  /* c8 ignore start */
  const fail = (message?: ProcessAssertionOptions['message']): never => {
    processAssert(
      () => {
        nodeAssert.fail(message);
      },
      {
        message,
        defaultMessage: 'Test failed intentionally',
        hideDiff: true,
      }
    );

    process.exit(1);
  };
  /* c8 ignore stop */

  function doesNotThrow(
    block: () => unknown,
    message?: string | ProcessAssertionOptions['message']
  ): void;
  function doesNotThrow(
    block: () => unknown,
    error: AssertPredicate,
    message?: ProcessAssertionOptions['message']
  ): void;
  function doesNotThrow(
    block: () => unknown,
    errorOrMessage?: AssertPredicate | ProcessAssertionOptions['message'],
    message?: ProcessAssertionOptions['message']
  ): void {
    processAssert(
      () => {
        if (
          typeof errorOrMessage === 'function' ||
          errorOrMessage instanceof RegExp ||
          typeof errorOrMessage === 'object'
        ) {
          nodeAssert.doesNotThrow(block, errorOrMessage, message);
        } else {
          const msg =
            typeof errorOrMessage === 'string' ? errorOrMessage : message;
          nodeAssert.doesNotThrow(block, msg);
        }
      },
      {
        message: typeof errorOrMessage === 'string' ? errorOrMessage : message,
        defaultMessage: 'Expected function not to throw',
        hideDiff: true,
        throw: true,
      }
    );
  }

  function throws(
    block: () => unknown,
    message?: ProcessAssertionOptions['message']
  ): void;
  function throws(
    block: () => unknown,
    error: AssertPredicate,
    message?: ProcessAssertionOptions['message']
  ): void;
  function throws(
    block: () => unknown,
    errorOrMessage?: AssertPredicate | ProcessAssertionOptions['message'],
    message?: ProcessAssertionOptions['message']
  ): void {
    if (
      typeof errorOrMessage === 'function' ||
      errorOrMessage instanceof RegExp ||
      typeof errorOrMessage === 'object'
    ) {
      processAssert(() => nodeAssert.throws(block, errorOrMessage), {
        message,
        defaultMessage: 'Expected function to throw',
        hideDiff: true,
      });
    } else {
      const msg =
        typeof errorOrMessage !== 'undefined' ? errorOrMessage : message;

      processAssert(() => nodeAssert.throws(block, message), {
        message: msg,
        defaultMessage: 'Expected function to throw',
        hideDiff: true,
      });
    }
  }

  function rejects(
    block: (() => Promise<unknown>) | Promise<unknown>,
    message?: ProcessAssertionOptions['message']
  ): Promise<void>;
  function rejects(
    block: (() => Promise<unknown>) | Promise<unknown>,
    error: AssertPredicate,
    message?: ProcessAssertionOptions['message']
  ): Promise<void>;
  async function rejects(
    block: (() => Promise<unknown>) | Promise<unknown>,
    errorOrMessage?: AssertPredicate | ProcessAssertionOptions['message'],
    message?: ProcessAssertionOptions['message']
  ): Promise<void> {
    await processAssert(
      async () => {
        if (
          typeof errorOrMessage === 'function' ||
          errorOrMessage instanceof RegExp ||
          typeof errorOrMessage === 'object'
        ) {
          await nodeAssert.rejects(block, errorOrMessage, message);
        } else {
          const msg =
            typeof errorOrMessage === 'string' ? errorOrMessage : message;
          await nodeAssert.rejects(block, msg);
        }
      },
      {
        message: typeof errorOrMessage === 'string' ? errorOrMessage : message,
        defaultMessage: 'Expected promise to be rejected with specified error',
        hideDiff: true,
        throw: true,
      }
    );
  }

  function doesNotReject(
    block: (() => Promise<unknown>) | Promise<unknown>,
    message?: ProcessAssertionOptions['message']
  ): Promise<void>;
  function doesNotReject(
    block: (() => Promise<unknown>) | Promise<unknown>,
    error: AssertPredicate,
    message?: ProcessAssertionOptions['message']
  ): Promise<void>;
  async function doesNotReject(
    block: (() => Promise<unknown>) | Promise<unknown>,
    errorOrMessage?: AssertPredicate | ProcessAssertionOptions['message'],
    message?: ProcessAssertionOptions['message']
  ): Promise<void> {
    await processAssert(
      async () => {
        if (
          typeof errorOrMessage === 'function' ||
          errorOrMessage instanceof RegExp ||
          typeof errorOrMessage === 'object'
        ) {
          await nodeAssert.doesNotReject(block, errorOrMessage, message);
        } else {
          await nodeAssert.doesNotReject(block, message);
        }
      },
      {
        message: typeof errorOrMessage === 'string' ? errorOrMessage : message,
        defaultMessage: 'Got unwanted rejection',
        hideDiff: true,
        throw: true,
      }
    );
  }

  const match = (
    value: string,
    regExp: RegExp,
    message?: ProcessAssertionOptions['message']
  ): void => {
    /* c8 ignore next 3 */
    if (typeof nodeVersion === 'number' && nodeVersion < 12) {
      throw new Error('match is available from Node.js 12 or higher');
    }

    processAssert(() => nodeAssert?.match(value, regExp), {
      message,
      actual: 'Value',
      expected: 'RegExp',
      defaultMessage: 'Value should match regExp',
    });
  };

  const doesNotMatch = (
    value: string,
    regExp: RegExp,
    message?: ProcessAssertionOptions['message']
  ): void => {
    /* c8 ignore next 3 */
    if (typeof nodeVersion === 'number' && nodeVersion < 12) {
      throw new Error('doesNotMatch is available from Node.js 12 or higher');
    }

    processAssert(() => nodeAssert.doesNotMatch(value, regExp), {
      message,
      actual: 'Value',
      expected: 'RegExp',
      defaultMessage: 'Value should not match regExp',
    });
  };

  const assert = Object.assign(
    (value: unknown, message?: ProcessAssertionOptions['message']) =>
      ok(value, message),
    {
      ok,
      equal,
      deepEqual,
      strictEqual,
      deepStrictEqual,
      doesNotMatch,
      doesNotReject,
      throws,
      doesNotThrow,
      notEqual,
      notDeepEqual,
      notStrictEqual,
      notDeepStrictEqual,
      match,
      ifError,
      fail,
      rejects,
    }
  );

  return assert;
};
