import type { AsyncLocalStorage } from 'node:async_hooks';
import type { AssertionCaptureState } from '../@types/assertion-capture.js';

const registryKey = Symbol.for('@pokujs/poku.assertion-capture.v1');
const globals = globalThis as Record<symbol, unknown>;
globals[registryKey] ??= {};

export const assertionCapture = globals[registryKey] as {
  storage?: AsyncLocalStorage<AssertionCaptureState>;
};

export const peekAssertionCapture = (): AssertionCaptureState | undefined => {
  let context = assertionCapture.storage?.getStore();
  while (context?.closed) context = context.parent;
  return context;
};
