import type { DescribeOptions } from '../../@types/describe.js';
import { hrtime } from 'node:process';
import { todo, skip, onlyDescribe } from './modifiers.js';
import { hasOnly } from '../../parsers/get-arg.js';
import { checkOnly } from '../../parsers/callback.js';
import { GLOBAL } from '../../configs/poku.js';

export async function describeBase(
  arg1: string | (() => unknown | Promise<unknown>),
  arg2?: (() => unknown | Promise<unknown>) | DescribeOptions
): Promise<void> {
  let title: string | undefined;
  let cb: (() => unknown | Promise<unknown>) | undefined;
  let options: DescribeOptions | undefined;

  const { reporter } = GLOBAL;

  if (typeof arg1 === 'string') {
    title = arg1;

    if (typeof arg2 === 'function') cb = arg2;
    else options = arg2;
  } else if (typeof arg1 === 'function') {
    cb = arg1;
    options = arg2 as DescribeOptions;
  }

  const hasCB = typeof cb === 'function';

  if (title) {
    if (hasCB) reporter.onDescribeStart({ title });
    else reporter.onDescribeAsTitle(title, options as DescribeOptions);
  }

  if (!hasCB) return;

  const start = hrtime();
  const resultCb = cb!();

  if (resultCb instanceof Promise) await resultCb;

  const end = hrtime(start);

  if (!title) return;

  const duration = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

  reporter.onDescribeEnd({ title, duration });

  GLOBAL.runAsOnly = false;
}

async function describeCore(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
function describeCore(message: string, cb: () => unknown): void;
async function describeCore(cb: () => Promise<unknown>): Promise<void>;
function describeCore(cb: () => unknown): void;
function describeCore(message: string, options?: DescribeOptions): void;
async function describeCore(
  messageOrCb: string | (() => unknown | Promise<unknown>),
  cbOrOptions?: (() => unknown | Promise<unknown>) | DescribeOptions
): Promise<void> {
  if (typeof messageOrCb === 'string' && typeof cbOrOptions !== 'function')
    return describeBase(messageOrCb, cbOrOptions);

  if (hasOnly) {
    const hasItOnly = checkOnly(
      typeof messageOrCb === 'function' ? messageOrCb : cbOrOptions
    );

    if (!hasItOnly) return;

    if (typeof messageOrCb === 'string' && typeof cbOrOptions === 'function')
      return describeBase(messageOrCb, cbOrOptions);

    if (typeof messageOrCb === 'function') return describeBase(messageOrCb);
  }

  if (typeof messageOrCb === 'string' && typeof cbOrOptions === 'function')
    return describeBase(messageOrCb, cbOrOptions);

  if (typeof messageOrCb === 'function') return describeBase(messageOrCb);
}

export const describe = Object.assign(describeCore, {
  todo,
  skip,
  only: onlyDescribe,
});
