/* c8 ignore next */ // Types
import type { ProcessAssertionOptions } from '../../@types/assert.js';
import * as nodeAssert from 'node:assert';
import { processAssert } from '../../services/assert.js';
import { nodeVersion } from '../../parsers/get-runtime.js';

const ok = async (
  value: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(
    () => {
      nodeAssert.ok(value);
    },
    { message }
  );
};

const equal = async (
  actual: unknown,
  expected: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(
    () => {
      nodeAssert.equal(actual, expected);
    },
    { message }
  );
};

const deepEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(() => nodeAssert.deepEqual(actual, expected), {
    message,
  });
};

const strictEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(() => nodeAssert.strictEqual(actual, expected), {
    message,
  });
};

const deepStrictEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(() => nodeAssert.deepStrictEqual(actual, expected), {
    message,
  });
};

const notEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(() => nodeAssert.notEqual(actual, expected), {
    message,
  });
};

const notDeepEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(() => nodeAssert.notDeepEqual(actual, expected), {
    message,
  });
};

const notStrictEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(() => nodeAssert.notStrictEqual(actual, expected), {
    message,
  });
};

const notDeepStrictEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(() => nodeAssert.notDeepStrictEqual(actual, expected), {
    message,
  });
};

const ifError = async (
  value: unknown,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(
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
const fail = async (
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  await processAssert(
    () => {
      nodeAssert.fail(message);
    },
    {
      message,
      defaultMessage: 'Test failed intentionally',
      hideDiff: true,
    }
  );
};
/* c8 ignore stop */

function doesNotThrow(
  block: () => unknown,
  message?: string | ProcessAssertionOptions['message']
): Promise<void>;
function doesNotThrow(
  block: () => unknown,
  error: nodeAssert.AssertPredicate,
  message?: ProcessAssertionOptions['message']
): Promise<void>;
async function doesNotThrow(
  block: () => unknown,
  errorOrMessage?:
    | nodeAssert.AssertPredicate
    | ProcessAssertionOptions['message'],
  message?: ProcessAssertionOptions['message']
): Promise<void> {
  await processAssert(
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
): Promise<void>;
function throws(
  block: () => unknown,
  error: nodeAssert.AssertPredicate,
  message?: ProcessAssertionOptions['message']
): Promise<void>;
async function throws(
  block: () => unknown,
  errorOrMessage?:
    | nodeAssert.AssertPredicate
    | ProcessAssertionOptions['message'],
  message?: ProcessAssertionOptions['message']
): Promise<void> {
  if (
    typeof errorOrMessage === 'function' ||
    errorOrMessage instanceof RegExp ||
    typeof errorOrMessage === 'object'
  ) {
    await processAssert(() => nodeAssert.throws(block, errorOrMessage), {
      message,
      defaultMessage: 'Expected function to throw',
      hideDiff: true,
    });
  } else {
    const msg =
      typeof errorOrMessage !== 'undefined' ? errorOrMessage : message;

    await processAssert(() => nodeAssert.throws(block, message), {
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
  error: nodeAssert.AssertPredicate,
  message?: ProcessAssertionOptions['message']
): Promise<void>;
async function rejects(
  block: (() => Promise<unknown>) | Promise<unknown>,
  errorOrMessage?:
    | nodeAssert.AssertPredicate
    | ProcessAssertionOptions['message'],
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
  error: nodeAssert.AssertPredicate,
  message?: ProcessAssertionOptions['message']
): Promise<void>;
async function doesNotReject(
  block: (() => Promise<unknown>) | Promise<unknown>,
  errorOrMessage?:
    | nodeAssert.AssertPredicate
    | ProcessAssertionOptions['message'],
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

const match = async (
  value: string,
  regExp: RegExp,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  /* c8 ignore next 3 */
  if (typeof nodeVersion === 'number' && nodeVersion < 12) {
    throw new Error('match is available from Node.js 12 or higher');
  }

  await processAssert(() => nodeAssert?.match(value, regExp), {
    message,
    actual: 'Value',
    expected: 'RegExp',
    defaultMessage: 'Value should match regExp',
  });
};

const doesNotMatch = async (
  value: string,
  regExp: RegExp,
  message?: ProcessAssertionOptions['message']
): Promise<void> => {
  /* c8 ignore next 3 */
  if (typeof nodeVersion === 'number' && nodeVersion < 12) {
    throw new Error('doesNotMatch is available from Node.js 12 or higher');
  }

  await processAssert(() => nodeAssert.doesNotMatch(value, regExp), {
    message,
    actual: 'Value',
    expected: 'RegExp',
    defaultMessage: 'Value should not match regExp',
  });
};

export const assertPromise = Object.assign(
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
  /* c8 ignore next */ // ?
);
