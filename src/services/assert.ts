import type { ProcessAssertionOptions } from '../@types/assert.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { GLOBAL } from '../configs/poku.js';

const assertProcessor = () => {
  const { isPoku } = GLOBAL;

  const handleSuccess = ({ message }: ProcessAssertionOptions) => {
    if (typeof message === 'string')
      GLOBAL.reporter.onAssertionSuccess({ message });
  };

  const handleError = (error: unknown, options: ProcessAssertionOptions) => {
    process.exitCode = 1;

    if (error instanceof AssertionError)
      GLOBAL.reporter.onAssertionFailure({ assertOptions: options, error });

    if (isPoku) throw error;
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
