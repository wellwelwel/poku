import { AssertionError } from 'node:assert';
import process from 'node:process';
import { each } from '../../../configs/each.js';
import { indentation } from '../../../configs/indentation.js';
import { GLOBAL } from '../../../configs/poku.js';
import { hasOnly } from '../../../parsers/get-arg.js';
import { onlyIt, skip, todo } from '../modifiers.js';

export async function itBase(
  titleOrCallback: string | (() => unknown | Promise<unknown>),
  callback?: () => unknown | Promise<unknown>
): Promise<void> {
  try {
    let title: string | undefined;
    let cb: (() => unknown | Promise<unknown>) | undefined;
    let success = true;

    if (typeof titleOrCallback === 'string') {
      title = titleOrCallback;
      cb = callback as () => unknown | Promise<unknown>;
    } else cb = titleOrCallback as () => unknown | Promise<unknown>;

    GLOBAL.reporter.onItStart({ title });

    if (typeof each.before.cb === 'function') {
      const beforeResult = each.before.cb();

      if (beforeResult instanceof Promise) await beforeResult;
    }

    const start = process.hrtime();

    const onError = (error: unknown) => {
      process.exitCode = 1;
      success = false;
      if (!(error instanceof AssertionError)) console.error(error);
    };

    process.once('uncaughtException', onError);
    process.once('unhandledRejection', onError);

    try {
      const resultCb = cb!();
      if (resultCb instanceof Promise) await resultCb;
    } catch (error) {
      onError(error);
    } finally {
      process.removeListener('uncaughtException', onError);
      process.removeListener('unhandledRejection', onError);
    }

    const end = process.hrtime(start);

    if (typeof each.after.cb === 'function') {
      const afterResult = each.after.cb();

      if (afterResult instanceof Promise) await afterResult;
    }

    if (!title) return;

    const duration = end[0] * 1e3 + end[1] / 1e6;

    GLOBAL.reporter.onItEnd({ title, duration, success });
  } catch (error) {
    indentation.hasItOrTest = false;

    if (typeof each.after.cb === 'function') {
      const afterResult = each.after.cb();

      if (afterResult instanceof Promise) await afterResult;
    }

    throw error;
  }
}

async function itCore(title: string, cb: () => Promise<unknown>): Promise<void>;
function itCore(title: string, cb: () => unknown): void;
async function itCore(cb: () => Promise<unknown>): Promise<void>;
function itCore(cb: () => unknown): void;
async function itCore(
  titleOrCb: string | (() => unknown) | (() => Promise<unknown>),
  cb?: (() => unknown) | (() => Promise<unknown>)
): Promise<void> {
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
