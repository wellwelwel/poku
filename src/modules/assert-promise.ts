import * as nodeAssert from 'node:assert';
import {
  parseAssertion,
  ParseAssertionOptions,
} from '../helpers/parseAsssetion.js';
import { each } from './assert.js';

const ok = async (
  value: unknown,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.ok(value), { message });
  if (each.after) await each.after();
};

const equal = async (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.equal(actual, expected), { message });
  if (each.after) await each.after();
};

const deepEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.deepEqual(actual, expected), {
    message,
  });
  if (each.after) await each.after();
};

const strictEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.strictEqual(actual, expected), {
    message,
  });
  if (each.after) await each.after();
};

const deepStrictEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.deepStrictEqual(actual, expected), {
    message,
  });
  if (each.after) await each.after();
};

const doesNotMatch = async (
  value: string,
  regExp: RegExp,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.doesNotMatch(value, regExp), {
    message,
  });
  if (each.after) await each.after();
};

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
      if (each.before) await each.before();
      await nodeAssert.doesNotReject(block, errorOrMessage);
      if (each.after) await each.after();
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
      if (each.before) await each.before();
      await nodeAssert.doesNotReject(block);
      if (each.after) await each.after();
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
async function doesNotThrow(
  block: () => unknown,
  errorOrMessage?: nodeAssert.AssertPredicate | string | Error,
  message?: ParseAssertionOptions['message']
): Promise<Promise<void>> {
  if (
    typeof errorOrMessage === 'function' ||
    errorOrMessage instanceof RegExp ||
    typeof errorOrMessage === 'object'
  ) {
    try {
      if (each.before) await each.before();
      nodeAssert.doesNotThrow(block, errorOrMessage, message);
      if (each.after) await each.after();
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
      if (each.before) await each.before();
      nodeAssert.doesNotThrow(block, msg);
      if (each.after) await each.after();
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
async function throws(
  block: () => unknown,
  errorOrMessage?:
    | nodeAssert.AssertPredicate
    | ParseAssertionOptions['message'],
  message?: ParseAssertionOptions['message']
): Promise<Promise<void>> {
  if (
    typeof errorOrMessage === 'function' ||
    errorOrMessage instanceof RegExp ||
    typeof errorOrMessage === 'object'
  ) {
    try {
      if (each.before) await each.before();
      nodeAssert.throws(block, errorOrMessage, message);
      if (each.after) await each.after();
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
      if (each.before) await each.before();
      nodeAssert.throws(block, message);
      if (each.after) await each.after();
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

const notEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.notEqual(actual, expected), {
    message,
  });
  if (each.after) await each.after();
};

const notDeepEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.notDeepEqual(actual, expected), {
    message,
  });
  if (each.after) await each.after();
};

const notStrictEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.notStrictEqual(actual, expected), {
    message,
  });
  if (each.after) await each.after();
};

const notDeepStrictEqual = async (
  actual: unknown,
  expected: unknown,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.notDeepStrictEqual(actual, expected), {
    message,
  });
  if (each.after) await each.after();
};

const match = async (
  value: string,
  regExp: RegExp,
  message?: ParseAssertionOptions['message']
): Promise<void> => {
  if (each.before) await each.before();
  parseAssertion(() => nodeAssert.match(value, regExp), { message });
  if (each.after) await each.after();
};

const ifError = async (value: unknown): Promise<void> => {
  try {
    if (each.before) await each.before();
    nodeAssert.ifError(value);
    if (each.after) await each.after();
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
      if (each.before) await each.before();
      await nodeAssert.rejects(block, errorOrMessage);
      if (each.after) await each.after();
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
      if (each.before) await each.before();
      await nodeAssert.rejects(block);
      if (each.after) await each.after();
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

export const assertPromise = Object.assign(
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
