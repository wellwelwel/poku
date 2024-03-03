import process from 'node:process';
import * as nodeAssert from 'node:assert';
import {
  parseAssertion,
  ParseAssertionOptions,
} from '../helpers/parseAsssetion.js';
import { getRuntime } from '../helpers/get-runtime.js';

const runtime = getRuntime();
const version =
  runtime === 'node'
    ? Number(process.version.match(/v(\d+)\./)?.[1])
    : undefined;

const ok = (
  value: unknown,
  message?: ParseAssertionOptions['message']
): void => {
  parseAssertion(
    () => {
      nodeAssert.ok(value);
    },
    { message }
  );
};

const equal = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void => {
  parseAssertion(
    () => {
      nodeAssert.equal(actual, expected);
    },
    { message }
  );
};

const deepEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void => {
  parseAssertion(() => nodeAssert.deepEqual(actual, expected), { message });
};

const strictEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void => {
  parseAssertion(() => nodeAssert.strictEqual(actual, expected), { message });
};

const deepStrictEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void => {
  parseAssertion(() => nodeAssert.deepStrictEqual(actual, expected), {
    message,
  });
};

const notEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void => {
  parseAssertion(() => nodeAssert.notEqual(actual, expected), {
    message,
  });
};

const notDeepEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void => {
  parseAssertion(() => nodeAssert.notDeepEqual(actual, expected), { message });
};

const notStrictEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void => {
  parseAssertion(() => nodeAssert.notStrictEqual(actual, expected), {
    message,
  });
};

const notDeepStrictEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void => {
  parseAssertion(() => nodeAssert.notDeepStrictEqual(actual, expected), {
    message,
  });
};

const ifError = (value: unknown): void => {
  parseAssertion(
    () => {
      nodeAssert.ifError(value);
    },
    {
      defaultMessage: 'Expected no error, but received an error',
      hideDiff: true,
      throw: true,
    }
  );
};

const fail = (message?: ParseAssertionOptions['message']): void => {
  parseAssertion(
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

function doesNotThrow(
  block: () => unknown,
  message?: string | ParseAssertionOptions['message']
): void;
function doesNotThrow(
  block: () => unknown,
  error: nodeAssert.AssertPredicate,
  message?: ParseAssertionOptions['message']
): void;
function doesNotThrow(
  block: () => unknown,
  errorOrMessage?: nodeAssert.AssertPredicate | string | Error,
  message?: ParseAssertionOptions['message']
): void {
  parseAssertion(
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
  message?: ParseAssertionOptions['message']
): void;
function throws(
  block: () => unknown,
  error: nodeAssert.AssertPredicate,
  message?: ParseAssertionOptions['message']
): void;
function throws(
  block: () => unknown,
  errorOrMessage?:
    | nodeAssert.AssertPredicate
    | ParseAssertionOptions['message'],
  message?: ParseAssertionOptions['message']
): void {
  if (
    typeof errorOrMessage === 'function' ||
    errorOrMessage instanceof RegExp ||
    typeof errorOrMessage === 'object'
  ) {
    parseAssertion(() => nodeAssert.throws(block, errorOrMessage), {
      message,
      defaultMessage: 'Expected function to throw',
      hideDiff: true,
    });
  } else {
    const msg =
      typeof errorOrMessage !== 'undefined' ? errorOrMessage : message;

    parseAssertion(() => nodeAssert.throws(block, message), {
      message: msg,
      defaultMessage: 'Expected function to throw',
      hideDiff: true,
    });
  }
}

function rejects(
  block: (() => Promise<unknown>) | Promise<unknown>,
  message?: string | Error
): Promise<void>;
function rejects(
  block: (() => Promise<unknown>) | Promise<unknown>,
  error: nodeAssert.AssertPredicate,
  message?: string | Error
): Promise<void>;
async function rejects(
  block: (() => Promise<unknown>) | Promise<unknown>,
  errorOrMessage?: nodeAssert.AssertPredicate | string | Error,
  message?: string | Error
): Promise<void> {
  await parseAssertion(
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
  message?: string | Error
): Promise<void>;
function doesNotReject(
  block: (() => Promise<unknown>) | Promise<unknown>,
  error: nodeAssert.AssertPredicate,
  message?: string | Error
): Promise<void>;
async function doesNotReject(
  block: (() => Promise<unknown>) | Promise<unknown>,
  errorOrMessage?: nodeAssert.AssertPredicate | string | Error,
  message?: string | Error
): Promise<void> {
  await parseAssertion(
    async () => {
      if (
        typeof errorOrMessage === 'function' ||
        errorOrMessage instanceof RegExp ||
        typeof errorOrMessage === 'object'
      )
        await nodeAssert.doesNotReject(block, errorOrMessage, message);
      else await nodeAssert.doesNotReject(block, message);
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
  message?: ParseAssertionOptions['message']
): void => {
  if (typeof version === 'number' && version < 12) {
    throw new Error('doesNotMatch is available from Node.js 12 or higher');
  }

  parseAssertion(() => nodeAssert?.match(value, regExp), {
    message,
    actual: 'Value',
    expected: 'RegExp',
    defaultMessage: 'Value should match regExp',
  });
};

const doesNotMatch = (
  value: string,
  regExp: RegExp,
  message?: ParseAssertionOptions['message']
): void => {
  if (typeof version === 'number' && version < 12) {
    throw new Error('doesNotMatch is available from Node.js 12 or higher');
  }

  parseAssertion(() => nodeAssert.doesNotMatch(value, regExp), {
    message,
    actual: 'Value',
    expected: 'RegExp',
    defaultMessage: 'Value should not match regExp',
  });
};

export const assert = Object.assign(
  (value: unknown, message?: ParseAssertionOptions['message']) =>
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
