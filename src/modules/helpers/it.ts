import type { It } from '../../@types/it.js';
import type { ScopeHook } from '../../@types/plugin.js';
import type { TestCb } from '../../@types/poku.js';
import type { assertSnapshot } from '../../parsers/snapshot.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { createTestContext } from '../../builders/test-context.js';
import { each } from '../../configs/each.js';
import { indentation } from '../../configs/indentation.js';
import { errorHoist, GLOBAL } from '../../configs/poku.js';
import { peekRetryContext } from '../../configs/retry.js';
import { hasOnly } from '../../parsers/get-arg.js';
import { getCallback, getTitle } from '../../parsers/get-test-args.js';
import { hrtimeToMs } from '../../parsers/time.js';
import { createOnlyIt, skip, todo } from './modifiers.js';

let snapshotLoad: Promise<typeof assertSnapshot> | undefined;

const SCOPE_HOOKS_KEY = Symbol.for('@pokujs/poku.test-scope-hooks');

const getScopeHook = (): ScopeHook | undefined =>
  (globalThis as Record<symbol, unknown>)[SCOPE_HOOKS_KEY] as
    | ScopeHook
    | undefined;

const runEachCb = (cb: (() => unknown) | undefined): unknown =>
  typeof cb === 'function' ? cb() : undefined;

const requestAssertSnapshot = (): Promise<typeof assertSnapshot> => {
  if (!snapshotLoad)
    snapshotLoad = import('../../parsers/snapshot.js').then(
      (module) => module.assertSnapshot
    );

  return snapshotLoad;
};

export const itBase = async (titleOrCb: string | TestCb, callback?: TestCb) => {
  try {
    const title = getTitle(titleOrCb);
    const hasTitle = typeof title === 'string';
    const cb = hasTitle
      ? getCallback<TestCb>(callback)
      : getCallback<TestCb>(titleOrCb);
    const insideDescribe = errorHoist.depth > 0;

    let success = true;
    let start: [number, number];
    let end: [number, number];
    let onError: ((error: unknown) => void) | undefined;

    GLOBAL.reporter.onItStart({ title });

    if (hasTitle) indentation.itDepth++;

    const beforeResult = runEachCb(each.before.cb);
    if (beforeResult instanceof Promise) await beforeResult;

    if (!insideDescribe) {
      onError = (error: unknown) => {
        const ctx = peekRetryContext();
        if (ctx) ctx.failed = true;
        else {
          process.exitCode = 1;
          success = false;

          if (!(error instanceof AssertionError)) console.error(error);
        }
      };

      process.once('uncaughtException', onError);
      process.once('unhandledRejection', onError);
    } else errorHoist.failed = false;

    start = process.hrtime();

    try {
      const hooks = getScopeHook();
      const { context, flush } = createTestContext(
        title,
        requestAssertSnapshot
      );

      if (hooks) {
        const holder = hooks.createHolder();

        await hooks.runScoped(holder, () => cb!(context));
      } else {
        const resultCb = cb!(context);

        if (resultCb instanceof Promise) await resultCb;
      }

      const pending = flush();
      if (pending) await pending;
    } catch (error) {
      const ctx = peekRetryContext();
      if (ctx) ctx.failed = true;
      else {
        process.exitCode = 1;
        success = false;

        if (!(error instanceof AssertionError)) console.error(error);
      }
    } finally {
      end = process.hrtime(start);

      if (onError) {
        process.removeListener('uncaughtException', onError);
        process.removeListener('unhandledRejection', onError);
      } else if (errorHoist.failed) {
        const ctx = peekRetryContext();

        if (ctx) ctx.failed = true;
        else success = false;
        errorHoist.failed = false;
      }
    }

    const afterResult = runEachCb(each.after.cb);
    if (afterResult instanceof Promise) await afterResult;

    if (!title) return;

    const duration = hrtimeToMs(end);

    indentation.itDepth--;
    GLOBAL.reporter.onItEnd({ title, duration, success });
  } catch (error) {
    if (indentation.itDepth > 0) indentation.itDepth--;

    const afterResult = runEachCb(each.after.cb);
    if (afterResult instanceof Promise) await afterResult;

    throw error;
  }
};

const itCore = (async (titleOrCb: string | TestCb, cb?: TestCb) => {
  if (typeof titleOrCb === 'string') {
    if (
      GLOBAL.configs.testNamePattern &&
      !GLOBAL.configs.testNamePattern.test(titleOrCb)
    )
      return;

    if (GLOBAL.configs.testSkipPattern?.test(titleOrCb)) return;
  }

  if (hasOnly && !GLOBAL.runAsOnly) return;

  if (typeof titleOrCb === 'string' && cb) return itBase(titleOrCb, cb);
  if (typeof titleOrCb === 'function') return itBase(titleOrCb);
}) as It;

export const it = Object.assign(itCore, {
  todo,
  skip,
  only: createOnlyIt(itBase),
});
