import type { ProcessAssertionOptions } from '../@types/assert.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { GLOBAL } from '../configs/poku.js';
import { peekRetryContext } from '../configs/retry.js';

const assertProcessor = () => {
  const { reporter } = GLOBAL;

  const handleSuccess = ({ message }: ProcessAssertionOptions) => {
    if (typeof message === 'string') reporter.onAssertionSuccess({ message });
  };

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
      handleSuccess(options);
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
      handleSuccess(options);
    } catch (error) {
      handleError(error, options);
    }
  };

  return { processAssert, processAsyncAssert };
};

export const { processAssert, processAsyncAssert } = assertProcessor();
