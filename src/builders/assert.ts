import type assert from 'node:assert';
import type { AssertPredicate } from 'node:assert';
import type { ProcessAssertionOptions } from '../@types/assert.js';
import { processAssert, processAsyncAssert } from '../services/assert.js';

export const createAssert = (nodeAssert: typeof assert) => {
  const ok = (
    value: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => processAssert(() => nodeAssert.ok(value), { message });

  const equal = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void => {
    processAssert(() => nodeAssert.equal(actual, expected), { message });
  };

  const deepEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void =>
    processAssert(() => nodeAssert.deepEqual(actual, expected), { message });

  const strictEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void =>
    processAssert(() => nodeAssert.strictEqual(actual, expected), { message });

  const deepStrictEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void =>
    processAssert(() => nodeAssert.deepStrictEqual(actual, expected), {
      message,
    });

  const notEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void =>
    processAssert(() => nodeAssert.notEqual(actual, expected), {
      message,
    });

  const notDeepEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void =>
    processAssert(() => nodeAssert.notDeepEqual(actual, expected), { message });

  const notStrictEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void =>
    processAssert(() => nodeAssert.notStrictEqual(actual, expected), {
      message,
    });

  const notDeepStrictEqual = (
    actual: unknown,
    expected: unknown,
    message?: ProcessAssertionOptions['message']
  ): void =>
    processAssert(() => nodeAssert.notDeepStrictEqual(actual, expected), {
      message,
    });

  const ifError = (
    value: unknown,
    message?: ProcessAssertionOptions['message']
  ): void =>
    processAssert(() => nodeAssert.ifError(value), {
      message,
      defaultMessage: 'Expected no error, but received an error',
      hideDiff: true,
      throw: true,
    });

  const fail = (message?: ProcessAssertionOptions['message']): never => {
    processAssert(() => nodeAssert.fail(message), {
      message,
      defaultMessage: 'Test failed intentionally',
      hideDiff: true,
    });

    process.exit(1);
  };

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
        )
          nodeAssert.doesNotThrow(block, errorOrMessage, message);
        else {
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
    )
      processAssert(() => nodeAssert.throws(block, errorOrMessage), {
        message,
        defaultMessage: 'Expected function to throw',
        hideDiff: true,
      });
    else {
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
    await processAsyncAssert(
      async () => {
        if (
          typeof errorOrMessage === 'function' ||
          errorOrMessage instanceof RegExp ||
          typeof errorOrMessage === 'object'
        )
          await nodeAssert.rejects(block, errorOrMessage, message);
        else {
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
    await processAsyncAssert(
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
    message?: ProcessAssertionOptions['message']
  ): void => {
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
