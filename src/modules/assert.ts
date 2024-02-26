import * as nodeAssert from 'node:assert';
import {
  parseAssertion,
  ParseAssertionOptions,
} from '../helpers/parseAsssetion.js';

const ok = (value: unknown, message?: ParseAssertionOptions['message']): void =>
  parseAssertion(() => nodeAssert.ok(value), { message });

const equal = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.equal(actual, expected), { message });

const deepEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.deepEqual(actual, expected), { message });

const strictEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.strictEqual(actual, expected), { message });

const deepStrictEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.deepStrictEqual(actual, expected), {
    message,
  });

const doesNotMatch = (
  value: string,
  regExp: RegExp,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.doesNotMatch(value, regExp), {
    message,
    actual: 'Value',
    expected: 'RegExp',
    defaultMessage: 'Value should not match regExp',
  });

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
  if (
    typeof errorOrMessage === 'function' ||
    errorOrMessage instanceof RegExp ||
    typeof errorOrMessage === 'object'
  ) {
    try {
      return await nodeAssert.doesNotReject(block, errorOrMessage);
    } catch (error) {
      parseAssertion(
        () => {
          throw error;
        },
        {
          message,
          defaultMessage: 'Got unwanted rejection',
          hideDiff: true,
          throw: true,
        }
      );
    }
  } else {
    try {
      return await nodeAssert.doesNotReject(block);
    } catch (error_1) {
      parseAssertion(
        () => {
          throw error_1;
        },
        {
          message:
            typeof errorOrMessage === 'string' ? errorOrMessage : undefined,
          defaultMessage: 'Got unwanted rejection',
          hideDiff: true,
          throw: true,
        }
      );
    }
  }
}

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
  if (
    typeof errorOrMessage === 'function' ||
    errorOrMessage instanceof RegExp ||
    typeof errorOrMessage === 'object'
  ) {
    try {
      nodeAssert.doesNotThrow(block, errorOrMessage, message);
    } catch (error) {
      parseAssertion(
        () => {
          throw error;
        },
        {
          message: message,
          defaultMessage: 'Expected function not to throw',
          hideDiff: true,
          throw: true,
        }
      );
    }
  } else {
    const msg = typeof errorOrMessage === 'string' ? errorOrMessage : undefined;
    try {
      nodeAssert.doesNotThrow(block, msg);
    } catch (error) {
      parseAssertion(
        () => {
          throw error;
        },
        {
          message: msg,
          defaultMessage: 'Expected function not to throw',
          hideDiff: true,
          throw: true,
        }
      );
    }
  }
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
    try {
      nodeAssert.throws(block, errorOrMessage, message);
    } catch (error) {
      parseAssertion(
        () => {
          throw error;
        },
        {
          message: message,
          defaultMessage: 'Expected function to throw',
          hideDiff: true,
        }
      );
    }
  } else {
    const msg = typeof errorOrMessage === 'string' ? errorOrMessage : undefined;
    try {
      nodeAssert.throws(block, message);
    } catch (error) {
      parseAssertion(
        () => {
          throw error;
        },
        {
          message: msg,
          defaultMessage: 'Expected function to throw',
          hideDiff: true,
        }
      );
    }
  }
}

const notEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.notEqual(actual, expected), {
    message,
  });

const notDeepEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.notDeepEqual(actual, expected), { message });

const notStrictEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.notStrictEqual(actual, expected), {
    message,
  });

const notDeepStrictEqual = (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.notDeepStrictEqual(actual, expected), {
    message,
  });

const match = (
  value: string,
  regExp: RegExp,
  message?: ParseAssertionOptions['message']
): void =>
  parseAssertion(() => nodeAssert.match(value, regExp), {
    message,
    actual: 'Value',
    expected: 'RegExp',
    defaultMessage: 'Value should match regExp',
  });

const ifError = (value: unknown): void => {
  try {
    nodeAssert.ifError(value);
  } catch (error) {
    parseAssertion(
      () => {
        throw error;
      },
      {
        defaultMessage: 'Expected no error, but received an error',
        hideDiff: true,
        throw: true,
      }
    );
  }
};

const fail = (message?: ParseAssertionOptions['message']): void => {
  try {
    nodeAssert.fail(message);
  } catch (error) {
    parseAssertion(
      () => {
        throw error;
      },
      {
        message,
        defaultMessage: 'Test failed intentionally',
        hideDiff: true,
      }
    );
  }
};

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
  if (
    typeof errorOrMessage === 'function' ||
    errorOrMessage instanceof RegExp ||
    typeof errorOrMessage === 'object'
  ) {
    try {
      return await nodeAssert.rejects(block, errorOrMessage);
    } catch (error) {
      parseAssertion(
        () => {
          throw error;
        },
        {
          message,
          defaultMessage:
            'Expected promise to be rejected with specified error',
          hideDiff: true,
        }
      );
    }
  } else {
    const msg = typeof errorOrMessage === 'string' ? errorOrMessage : undefined;
    try {
      return await nodeAssert.rejects(block);
    } catch (error_1) {
      parseAssertion(
        () => {
          throw error_1;
        },
        {
          message: msg,
          defaultMessage: 'Expected promise to be rejected',
          hideDiff: true,
        }
      );
    }
  }
}

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
