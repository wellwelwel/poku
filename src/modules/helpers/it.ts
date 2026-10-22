import type { It } from '../../@types/it.js';
import type { ScopeHook } from '../../@types/plugin.js';
import type { TestCb } from '../../@types/poku.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { each } from '../../configs/each.js';
import { indentation } from '../../configs/indentation.js';
import { errorHoist, GLOBAL } from '../../configs/poku.js';
import { peekRetryContext } from '../../configs/retry.js';
import { hasOnly } from '../../parsers/get-arg.js';
import { getCallback, getTitle } from '../../parsers/get-test-args.js';
import { hrtimeToMs } from '../../parsers/time.js';
import { createOnlyIt, skip, todo } from './modifiers.js';

const SCOPE_HOOKS_KEY = Symbol.for('@pokujs/poku.test-scope-hooks');

const getScopeHook = (): ScopeHook | undefined =>
  (globalThis as Record<symbol, unknown>)[SCOPE_HOOKS_KEY] as
    | ScopeHook
    | undefined;

export const itBase = async (
  titleOrCb: string | TestCb,
  callback?: TestCb
): Promise<void> => {
  let increasedDepth = false;
  try {
    const title = getTitle(titleOrCb);
    const hasTitle = typeof title === 'string';
    const cb = hasTitle ? getCallback(callback) : getCallback(titleOrCb);

    let success = true;
    let start: [number, number] = [0, 0];
    let end: [number, number] = [0, 0];

    GLOBAL.reporter.onItStart({ title });

    if (hasTitle) {
      indentation.itDepth++;
      increasedDepth = true;
    }

    const hooks = getScopeHook();
    const reportResult = (): void => {
      if (!title) return;

      const duration = hrtimeToMs(end);

      indentation.itDepth--;
      increasedDepth = false;
      GLOBAL.reporter.onItEnd({ title, duration, success });
    };

    const runWithOptionalScope = async (
      fn: (params?: Record<string, unknown>) => Promise<void>
    ): Promise<void> => {
      if (hooks) {
        const holder = hooks.createHolder();
        await hooks.runScoped(holder, fn);
      } else {
        await fn();
      }
    };

    await runWithOptionalScope(async (params) => {
      try {
        if (typeof each.before.cb === 'function') {
          const beforeResult = each.before.cb();

          if (beforeResult instanceof Promise) await beforeResult;
        }

        const insideDescribe = errorHoist.depth > 0;

        let onError: ((error: unknown) => void) | undefined;

        if (!insideDescribe) {
          onError = (error: unknown): void => {
            const ctx = peekRetryContext();
            if (ctx) {
              ctx.failed = true;
            } else {
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
          const resultCb = cb!(params);
          if (resultCb instanceof Promise) await resultCb;
        } catch (error) {
          const ctx = peekRetryContext();
          if (ctx) {
            ctx.failed = true;
          } else {
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
            if (ctx) {
              ctx.failed = true;
            } else {
              success = false;
            }
            errorHoist.failed = false;
          }
        }
      } finally {
        if (typeof each.after.cb === 'function') {
          const afterResult = each.after.cb();

          if (afterResult instanceof Promise) await afterResult;
        }
      }

      if (!hooks) reportResult();
    });

    if (hooks) reportResult();
  } catch (error) {
    if (increasedDepth) indentation.itDepth--;

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
