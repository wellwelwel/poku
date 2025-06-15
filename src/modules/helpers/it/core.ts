import { hrtime } from 'node:process';
import { each } from '../../../configs/each.js';
import { indentation } from '../../../configs/indentation.js';
import { GLOBAL } from '../../../configs/poku.js';
import { getArg, hasOnly } from '../../../parsers/get-arg.js';
import { onlyIt, skip, todo } from '../modifiers.js';

export async function itBase(
  ...args: [
    string | (() => unknown | Promise<unknown>),
    (() => unknown | Promise<unknown>)?,
  ]
): Promise<void> {
  try {
    let title: string | undefined;
    let cb: () => unknown | Promise<unknown>;

    if (typeof args[0] === 'string') {
      title = args[0];
      cb = args[1] as () => unknown | Promise<unknown>;
    } else cb = args[0] as () => unknown | Promise<unknown>;

    const followTestPattern = title?.includes(getArg('testNamePattern') ?? '');
    if (!followTestPattern) return;

    GLOBAL.reporter.onItStart({ title });

    if (typeof each.before.cb === 'function') {
      const beforeResult = each.before.cb();

      if (beforeResult instanceof Promise) await beforeResult;
    }

    const start = hrtime();
    const resultCb = cb();

    if (resultCb instanceof Promise) await resultCb;

    const end = hrtime(start);

    if (typeof each.after.cb === 'function') {
      const afterResult = each.after.cb();

      if (afterResult instanceof Promise) await afterResult;
    }

    if (!title) return;

    const duration = end[0] * 1e3 + end[1] / 1e6;

    GLOBAL.reporter.onItEnd({ title, duration });
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
