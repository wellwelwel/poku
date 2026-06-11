import type {
  AssertionMessage,
  ProcessAssertionOptions,
} from '../@types/assert.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { GLOBAL } from '../configs/poku.js';
import { peekRetryContext } from '../configs/retry.js';

const assertProcessor = () => {
  const { reporter } = GLOBAL;

  const handleError = (
    error: unknown,
    options: ProcessAssertionOptions
  ): never => {
    const ctx = peekRetryContext();
    if (ctx) ctx.failed = true;
    else process.exitCode = 1;

    if (error instanceof AssertionError)
      reporter.onAssertionFailure({ assertOptions: options, error });

    throw error;
  };

  const processAssert = (cb: () => void, options: ProcessAssertionOptions) => {
    try {
      cb();

      const { message } = options;

      if (typeof message === 'string') reporter.onAssertionSuccess({ message });
    } catch (error) {
      handleError(error, options);
    }
  };

  const processAsyncAssert = async (
    cb: () => Promise<void>,
    options: ProcessAssertionOptions
  ) => {
    try {
      await cb();

      const { message } = options;

      if (typeof message === 'string') reporter.onAssertionSuccess({ message });
    } catch (error) {
      handleError(error, options);
    }
  };

  const processAssertDirect = (
    method: (actual: unknown, expected: unknown) => void,
    actual: unknown,
    expected: unknown,
    message: AssertionMessage
  ) => {
    try {
      method(actual, expected);

      if (typeof message === 'string') reporter.onAssertionSuccess({ message });
    } catch (error) {
      handleError(error, { message });
    }
  };

  return { processAssert, processAsyncAssert, processAssertDirect };
};

export const { processAssert, processAsyncAssert, processAssertDirect } =
  assertProcessor();
