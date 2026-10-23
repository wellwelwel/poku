import type { ProcessAssertionOptions } from '../@types/assert.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { peekAssertionCapture } from '../configs/assertion-capture.js';
import { GLOBAL } from '../configs/poku.js';
import { peekRetryContext } from '../configs/retry.js';

const assertProcessor = () => {
  const { reporter } = GLOBAL;

  const handleSuccess = ({ message }: ProcessAssertionOptions) => {
    if (typeof message !== 'string') return;
    const capture = peekAssertionCapture();
    if (capture) {
      capture.reports.push(() => handleSuccess({ message }));
      return;
    }
    reporter.onAssertionSuccess({ message });
  };

  const recordError = (
    error: unknown,
    options: ProcessAssertionOptions
  ): void => {
    const capture = peekAssertionCapture();
    if (capture) {
      capture.failed = true;
      capture.error = error;
      capture.reports.push(() => recordError(error, options));
      return;
    }

    const ctx = peekRetryContext();
    if (ctx) ctx.failed = true;
    else process.exitCode = 1;

    if (error instanceof AssertionError)
      reporter.onAssertionFailure({ assertOptions: options, error });
  };

  const handleError = (
    error: unknown,
    options: ProcessAssertionOptions
  ): never => {
    recordError(error, options);
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
