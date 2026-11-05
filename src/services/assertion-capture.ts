import type {
  AssertionCaptureContext,
  AssertionCaptureResult,
  AssertionCaptureState,
} from '../@types/assertion-capture.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import {
  assertionCapture,
  deferToCapture,
  peekAssertionCapture,
} from '../configs/assertion-capture.js';
import { GLOBAL } from '../configs/poku.js';
import { poku as defaultReporter } from './reporters/poku.js';

const dispatchEvent = (event: string, eventArguments: unknown[]): void => {
  const capture = peekAssertionCapture();

  if (capture) {
    deferToCapture(capture, () => dispatchEvent(event, eventArguments));
    return;
  }

  const activeReporter = GLOBAL.reporter;

  Reflect.apply(
    Reflect.get(activeReporter, event),
    activeReporter,
    eventArguments
  );
};

const deferEventsInsideCaptures = () => {
  assertionCapture.deferringReporters ??= new WeakSet();
  if (assertionCapture.deferringReporters.has(GLOBAL.reporter)) return;

  if (!Object.isExtensible(GLOBAL.reporter))
    GLOBAL.reporter = Object.create(GLOBAL.reporter);

  const reporter = GLOBAL.reporter;

  assertionCapture.deferringReporters.add(reporter);

  for (const event of Object.keys(defaultReporter)) {
    let report: unknown = Reflect.get(reporter, event);

    Reflect.defineProperty(reporter, event, {
      configurable: true,
      enumerable: true,
      get: () => {
        const capture = peekAssertionCapture();
        if (!capture) return report;

        return (...eventArguments: unknown[]) =>
          deferToCapture(capture, () => dispatchEvent(event, eventArguments));
      },
      set: (value: unknown) => {
        report = value;
      },
    });
  }
};

export const captureAssertions = async <Value>(
  callback: (context: AssertionCaptureContext) => Value | Promise<Value>
): Promise<AssertionCaptureResult<Value>> => {
  assertionCapture.storage ??= new AsyncLocalStorage();
  deferEventsInsideCaptures();

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
