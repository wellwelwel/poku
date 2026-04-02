import { AssertionError } from 'node:assert';
import process from 'node:process';
import { each } from '../../../configs/each.js';
import { indentation } from '../../../configs/indentation.js';
import { GLOBAL } from '../../../configs/poku.js';
import { hasOnly } from '../../../parsers/get-arg.js';
import {
  currentErrorHandler,
  popErrorHandler,
  pushErrorHandler,
} from '../error-handler.js';
import { onlyIt, skip, todo } from '../modifiers.js';

export const getTitle = (input: unknown): string | undefined =>
  typeof input === 'string' ? input : undefined;

export const getCallback = (
  input: unknown
): (() => unknown) | (() => Promise<unknown>) | undefined =>
  typeof input === 'function'
    ? (input as (() => unknown) | (() => Promise<unknown>))
    : undefined;

export const itBase = async (
  titleOrCb: string | (() => unknown | Promise<unknown>),
  callback?: () => unknown | Promise<unknown>
): Promise<void> => {
  try {
    const title = getTitle(titleOrCb);
    const hasTitle = typeof title === 'string';
    const cb = hasTitle ? getCallback(callback) : getCallback(titleOrCb);

    let success = true;
    let start: [number, number];
    let end: [number, number];

    GLOBAL.reporter.onItStart({ title });

    if (hasTitle) indentation.itDepth++;

    if (typeof each.before.cb === 'function') {
      const beforeResult = each.before.cb();

      if (beforeResult instanceof Promise) await beforeResult;
    }

    pushErrorHandler((error: unknown): void => {
      process.exitCode = 1;
      success = false;
      if (!(error instanceof AssertionError)) console.error(error);
    });

    start = process.hrtime();

    try {
      const resultCb = cb!();
      if (resultCb instanceof Promise) await resultCb;
    } catch (error) {
      currentErrorHandler()?.(error);
    } finally {
      end = process.hrtime(start);
      popErrorHandler();
    }

    if (typeof each.after.cb === 'function') {
      const afterResult = each.after.cb();

      if (afterResult instanceof Promise) await afterResult;
    }

    if (!title) return;

    const duration = end[0] * 1e3 + end[1] / 1e6;

    indentation.itDepth--;
    GLOBAL.reporter.onItEnd({ title, duration, success });
  } catch (error) {
    if (indentation.itDepth > 0) indentation.itDepth--;

    if (typeof each.after.cb === 'function') {
      const afterResult = each.after.cb();

      if (afterResult instanceof Promise) await afterResult;
    }

    throw error;
  }
};

async function itCore(title: string, cb: () => Promise<unknown>): Promise<void>;
function itCore(title: string, cb: () => unknown): void;
async function itCore(cb: () => Promise<unknown>): Promise<void>;
function itCore(cb: () => unknown): void;
async function itCore(
  titleOrCb: string | (() => unknown) | (() => Promise<unknown>),
  cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
  if (GLOBAL.configs.testNamePattern && typeof titleOrCb === 'string') {
    if (!GLOBAL.configs.testNamePattern.test(titleOrCb)) return;
  }

  if (GLOBAL.configs.testSkipPattern && typeof titleOrCb === 'string') {
    if (GLOBAL.configs.testSkipPattern.test(titleOrCb)) return;
  }

  if (hasOnly) {
    if (!GLOBAL.runAsOnly) return;

    if (typeof titleOrCb === 'string' && typeof cb === 'function')
      return itBase(titleOrCb, cb);

    if (typeof titleOrCb === 'function') return itBase(titleOrCb);
  }

  if (typeof titleOrCb === 'string' && cb) return itBase(titleOrCb, cb);
  if (typeof titleOrCb === 'function') return itBase(titleOrCb);
}

export const it = Object.assign(itCore, {
  todo,
  skip,
  only: onlyIt,
});
