import type { ScopeHook } from '../../../@types/plugin.js';
import type { ItOptions, TestCallback } from '../../../@types/poku.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { each } from '../../../configs/each.js';
import { indentation } from '../../../configs/indentation.js';
import { errorHoist, GLOBAL } from '../../../configs/poku.js';
import { hasOnly } from '../../../parsers/get-arg.js';
import { onlyIt, skip, todo } from '../modifiers.js';

const SCOPE_HOOKS_KEY = Symbol.for('@pokujs/poku.test-scope-hooks');

/* ── Utilities ──────────────────────────────────────────────────────── */

export const getTitle = (input: unknown): string | undefined =>
  typeof input === 'string' ? input : undefined;

export const getCallback = (input: unknown): TestCallback | undefined =>
  typeof input === 'function' ? (input as TestCallback) : undefined;

/* ── Smart Argument Parser ─────────────────────────────────────────── */

type ParsedItArgs = {
  title: string | undefined;
  options: ItOptions | undefined;
  cb: TestCallback;
};

/**
 * Intelligently parses `it()` arguments into a normalized shape.
 *
 * Supported call signatures:
 *   it('title', { retries: 2 }, cb)   → title + options + callback
 *   it('title', cb)                    → title + callback
 *   it({ retries: 2 }, cb)            → options + callback
 *   it(cb)                             → callback only
 */
export const parseItArgs = (
  a: string | ItOptions | TestCallback,
  b?: ItOptions | TestCallback,
  c?: TestCallback
): ParsedItArgs => {
  if (typeof a === 'string') {
    // it('title', options, cb) or it('title', cb)
    return typeof b === 'object' && b !== null
      ? { title: a, options: b, cb: c! }
      : { title: a, options: undefined, cb: b as TestCallback };
  }

  if (typeof a === 'object' && a !== null) {
    // it(options, cb)
    return { title: undefined, options: a, cb: b as TestCallback };
  }

  // it(cb)
  return { title: undefined, options: undefined, cb: a as TestCallback };
};

/* ── Core Execution ────────────────────────────────────────────────── */

const getScopeHook = (): ScopeHook | undefined =>
  (globalThis as Record<symbol, unknown>)[SCOPE_HOOKS_KEY] as
    | ScopeHook
    | undefined;

export const itBase = async (
  title: string | undefined,
  options: ItOptions | undefined,
  cb: TestCallback
): Promise<void> => {
  try {
    const maxRetries = options?.retries ?? GLOBAL.configs.retries ?? 0;
    let attempt = 0;
    let success = false;
    let start: [number, number];
    let end: [number, number];

    GLOBAL.reporter.onItStart({ title });

    if (title) indentation.itDepth++;

    if (typeof each.before.cb === 'function') {
      const beforeResult = each.before.cb();

      if (beforeResult instanceof Promise) await beforeResult;
    }

    const insideDescribe = errorHoist.depth > 0;
    const initialExitCode = process.exitCode;

    while (attempt <= maxRetries) {
      success = true;
      process.exitCode = initialExitCode;
      let onError: ((error: unknown) => void) | undefined;

      if (!insideDescribe) {
        onError = (error: unknown): void => {
          process.exitCode = 1;
          success = false;
          if (!(error instanceof AssertionError)) console.error(error);
        };

        process.once('uncaughtException', onError);
        process.once('unhandledRejection', onError);
      } else errorHoist.failed = false;

      start = process.hrtime();

      try {
        const hooks = getScopeHook();

        if (hooks) {
          const holder = hooks.createHolder();
          await hooks.runScoped(holder, (params) => cb(params));
        } else {
          const resultCb = cb();
          if (resultCb instanceof Promise) await resultCb;
        }
      } catch (error) {
        process.exitCode = 1;
        success = false;
        if (!(error instanceof AssertionError)) console.error(error);
      } finally {
        end = process.hrtime(start);

        if (onError) {
          process.removeListener('uncaughtException', onError);
          process.removeListener('unhandledRejection', onError);
        } else if (errorHoist.failed) {
          success = false;
          errorHoist.failed = false;
        }
      }

      if (!insideDescribe && process.exitCode !== initialExitCode) {
        success = false;
      }

      if (success || attempt >= maxRetries) break;

      attempt++;
    }

    if (success) {
      process.exitCode = initialExitCode;
    }

    if (typeof each.after.cb === 'function') {
      const afterResult = each.after.cb();

      if (afterResult instanceof Promise) await afterResult;
    }

    if (!title) return;

    const duration = end![0] * 1e3 + end![1] / 1e6;
    const retries = attempt > 0 ? attempt : undefined;

    indentation.itDepth--;
    GLOBAL.reporter.onItEnd({ title, duration, success, retries });
  } catch (error) {
    if (indentation.itDepth > 0) indentation.itDepth--;

    if (typeof each.after.cb === 'function') {
      const afterResult = each.after.cb();

      if (afterResult instanceof Promise) await afterResult;
    }

    throw error;
  }
};

/* ── Overloads ─────────────────────────────────────────────────────── */

async function itCore(
  title: string,
  options: ItOptions,
  cb: (params?: Record<string, unknown>) => Promise<unknown>
): Promise<void>;
function itCore(
  title: string,
  options: ItOptions,
  cb: (params?: Record<string, unknown>) => unknown
): void;
async function itCore(
  title: string,
  cb: (params?: Record<string, unknown>) => Promise<unknown>
): Promise<void>;
function itCore(
  title: string,
  cb: (params?: Record<string, unknown>) => unknown
): void;
async function itCore(
  options: ItOptions,
  cb: (params?: Record<string, unknown>) => Promise<unknown>
): Promise<void>;
function itCore(
  options: ItOptions,
  cb: (params?: Record<string, unknown>) => unknown
): void;
async function itCore(
  cb: (params?: Record<string, unknown>) => Promise<unknown>
): Promise<void>;
function itCore(cb: (params?: Record<string, unknown>) => unknown): void;
async function itCore(
  a: string | ItOptions | TestCallback,
  b?: ItOptions | TestCallback,
  c?: TestCallback
): Promise<void> {
  const { title, options, cb } = parseItArgs(a, b, c);

  if (GLOBAL.configs.testNamePattern && title !== undefined) {
    if (!GLOBAL.configs.testNamePattern.test(title)) return;
  }

  if (GLOBAL.configs.testSkipPattern && title !== undefined) {
    if (GLOBAL.configs.testSkipPattern.test(title)) return;
  }

  if (hasOnly) {
    if (!GLOBAL.runAsOnly) return;
  }

  return itBase(title, options, cb);
}

export const it = Object.assign(itCore, {
  todo,
  skip,
  only: onlyIt,
});
