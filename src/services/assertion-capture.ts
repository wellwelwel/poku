import type {
  AssertionCaptureContext,
  AssertionCaptureResult,
  AssertionCaptureState,
} from '../@types/assertion-capture.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import {
  assertionCapture,
  peekAssertionCapture,
} from '../configs/assertion-capture.js';

export const captureAssertions = async <Value>(
  callback: (context: AssertionCaptureContext) => Value | Promise<Value>
): Promise<AssertionCaptureResult<Value>> => {
  assertionCapture.storage ??= new AsyncLocalStorage();
  const storage = assertionCapture.storage;
  const context: AssertionCaptureState = {
    parent: peekAssertionCapture(),
    closed: false,
    failed: false,
    error: undefined,
    reports: [],
  };

  const bind = <Receiver, Arguments extends unknown[], Result>(
    invoke: (this: Receiver, ...args: Arguments) => Result
  ) =>
    function (this: Receiver, ...args: Arguments): Result {
      return storage.run(context, () => invoke.apply(this, args));
    };

  let outcome:
    | { status: 'passed'; value: Value }
    | { status: 'failed'; error: unknown };
  try {
    outcome = {
      status: 'passed',
      value: await storage.run(context, () => callback({ bind })),
    };
  } catch (error) {
    outcome = { status: 'failed', error };
  } finally {
    context.closed = true;
  }

  if (context.failed && outcome.status === 'passed')
    outcome = { status: 'failed', error: context.error };

  const reports = context.reports;
  context.reports = [];
  context.error = undefined;
  let reported = false;
  const result = outcome;
  return {
    ...result,
    report: () => {
      if (reported) return;
      reported = true;
      for (const report of reports) report();
    },
  };
};
