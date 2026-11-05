import type { AsyncLocalStorage } from 'node:async_hooks';
import type { AssertionCaptureState } from '../@types/assertion-capture.js';
import type { ReporterPlugin } from '../@types/poku.js';
import { indentation } from './indentation.js';

const registryKey = Symbol.for('@pokujs/poku.assertion-capture.v1');
const globals = globalThis as Record<symbol, unknown>;
globals[registryKey] ??= {};

export const assertionCapture = globals[registryKey] as {
  storage?: AsyncLocalStorage<AssertionCaptureState>;
  deferringReporters?: WeakSet<ReturnType<ReporterPlugin>>;
};

export const peekAssertionCapture = (): AssertionCaptureState | undefined => {
  let context = assertionCapture.storage?.getStore();
  while (context?.closed) context = context.parent;
  return context;
};

export const deferToCapture = (
  capture: AssertionCaptureState,
  report: () => void
): void => {
  const { describeDepth, itDepth } = indentation;

  capture.reports.push(() => {
    const replayDescribeDepth = indentation.describeDepth;
    const replayItDepth = indentation.itDepth;

    indentation.describeDepth = describeDepth;
    indentation.itDepth = itDepth;

    try {
      report();
    } finally {
      indentation.describeDepth = replayDescribeDepth;
      indentation.itDepth = replayItDepth;
    }
  });
};
