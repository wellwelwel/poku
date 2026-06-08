import type assert from 'node:assert';
import type { AssertPredicate } from 'node:assert';
import type {
  AssertEqual,
  AssertionMessage,
  AssertMatch,
  AssertRejects,
  AssertThrows,
  AssertValue,
  AsyncBlock,
} from '../@types/assert.js';
import { processAssert, processAsyncAssert } from '../services/assert.js';

const isPredicate = (
  value: unknown
): value is AssertPredicate | RegExp | object =>
  typeof value === 'function' ||
  value instanceof RegExp ||
  typeof value === 'object';

const resolveMessage = (
  errorOrMessage: AssertPredicate | AssertionMessage | undefined,
  message: AssertionMessage | undefined
): AssertionMessage | undefined =>
  typeof errorOrMessage === 'string' ? errorOrMessage : message;

export const createAssert = (nodeAssert: typeof assert) => {
  const ok: AssertValue = (value, message) =>
    processAssert(() => nodeAssert.ok(value), { message });

  const equal: AssertEqual = (actual, expected, message) => {
    processAssert(() => nodeAssert.equal(actual, expected), { message });
  };

  const deepEqual: AssertEqual = (actual, expected, message) =>
    processAssert(() => nodeAssert.deepEqual(actual, expected), { message });

  const strictEqual: AssertEqual = (actual, expected, message) =>
    processAssert(() => nodeAssert.strictEqual(actual, expected), { message });

  const deepStrictEqual: AssertEqual = (actual, expected, message) =>
    processAssert(() => nodeAssert.deepStrictEqual(actual, expected), {
      message,
    });

  const notEqual: AssertEqual = (actual, expected, message) =>
    processAssert(() => nodeAssert.notEqual(actual, expected), {
      message,
    });

  const notDeepEqual: AssertEqual = (actual, expected, message) =>
    processAssert(() => nodeAssert.notDeepEqual(actual, expected), { message });

  const notStrictEqual: AssertEqual = (actual, expected, message) =>
    processAssert(() => nodeAssert.notStrictEqual(actual, expected), {
      message,
    });

  const notDeepStrictEqual: AssertEqual = (actual, expected, message) =>
    processAssert(() => nodeAssert.notDeepStrictEqual(actual, expected), {
      message,
    });

  const ifError: AssertValue = (value, message) =>
    processAssert(() => nodeAssert.ifError(value), {
      message,
      defaultMessage: 'Expected no error, but received an error',
      hideDiff: true,
      throw: true,
    });

  const fail = (message?: AssertionMessage): never => {
    processAssert(() => nodeAssert.fail(message), {
      message,
      defaultMessage: 'Test failed intentionally',
      hideDiff: true,
    });

    process.exit(1);
  };

  const doesNotThrow: AssertThrows = ((
    block: () => unknown,
    errorOrMessage?: AssertPredicate | AssertionMessage,
    message?: AssertionMessage
  ): void => {
    processAssert(
      () => {
        if (isPredicate(errorOrMessage))
          nodeAssert.doesNotThrow(block, errorOrMessage, message);
        else
          nodeAssert.doesNotThrow(
            block,
            resolveMessage(errorOrMessage, message)
          );
      },
      {
        message: resolveMessage(errorOrMessage, message),
        defaultMessage: 'Expected function not to throw',
        hideDiff: true,
        throw: true,
      }
    );
  }) as AssertThrows;

  const throws: AssertThrows = ((
    block: () => unknown,
    errorOrMessage?: AssertPredicate | AssertionMessage,
    message?: AssertionMessage
  ): void => {
    if (isPredicate(errorOrMessage))
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
  }) as AssertThrows;

  const rejects: AssertRejects = (async (
    block: AsyncBlock,
    errorOrMessage?: AssertPredicate | AssertionMessage,
    message?: AssertionMessage
  ): Promise<void> => {
    await processAsyncAssert(
      async () => {
        if (isPredicate(errorOrMessage))
          await nodeAssert.rejects(block, errorOrMessage, message);
        else
          await nodeAssert.rejects(
            block,
            resolveMessage(errorOrMessage, message)
          );
      },
      {
        message: resolveMessage(errorOrMessage, message),
        defaultMessage: 'Expected promise to be rejected with specified error',
        hideDiff: true,
        throw: true,
      }
    );
  }) as AssertRejects;

  const doesNotReject: AssertRejects = (async (
    block: AsyncBlock,
    errorOrMessage?: AssertPredicate | AssertionMessage,
    message?: AssertionMessage
  ): Promise<void> => {
    await processAsyncAssert(
      async () => {
        if (isPredicate(errorOrMessage))
          await nodeAssert.doesNotReject(block, errorOrMessage, message);
        else await nodeAssert.doesNotReject(block, message);
      },
      {
        message: resolveMessage(errorOrMessage, message),
        defaultMessage: 'Got unwanted rejection',
        hideDiff: true,
        throw: true,
      }
    );
  }) as AssertRejects;

  const match: AssertMatch = (value, regExp, message) => {
    processAssert(() => nodeAssert?.match(value, regExp), {
      message,
      actual: 'Value',
      expected: 'RegExp',
      defaultMessage: 'Value should match regExp',
    });
  };

  const doesNotMatch: AssertMatch = (value, regExp, message) => {
    processAssert(() => nodeAssert.doesNotMatch(value, regExp), {
      message,
      actual: 'Value',
      expected: 'RegExp',
      defaultMessage: 'Value should not match regExp',
    });
  };

  return Object.assign(
    ((value, message?) => ok(value, message)) satisfies AssertValue,
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
};
