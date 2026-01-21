import type { DescribeOptions } from '../../@types/describe.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { GLOBAL } from '../../configs/poku.js';
import { checkOnly } from '../../parsers/callback.js';
import { hasOnly } from '../../parsers/get-arg.js';
import { onlyDescribe, skip, todo } from './modifiers.js';

export async function describeBase(
  titleOrCallback: string | (() => unknown | Promise<unknown>),
  callbackOrOptions?: (() => unknown | Promise<unknown>) | DescribeOptions
): Promise<void> {
  let title: string | undefined;
  let cb: (() => unknown | Promise<unknown>) | undefined;
  let options: DescribeOptions | undefined;
  let success = true;

  const { reporter } = GLOBAL;

  if (typeof titleOrCallback === 'string') {
    title = titleOrCallback;

    if (typeof callbackOrOptions === 'function') cb = callbackOrOptions;
    else options = callbackOrOptions;
  } else if (typeof titleOrCallback === 'function') {
    cb = titleOrCallback;
    options = callbackOrOptions as DescribeOptions;
  }

  const hasCB = typeof cb === 'function';

  if (title) {
    if (hasCB) reporter.onDescribeStart({ title });
    else reporter.onDescribeAsTitle(title, options as DescribeOptions);
  }

  if (!hasCB) return;

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

  if (!title) return;

  const duration = end[0] * 1e3 + end[1] / 1e6;

  reporter.onDescribeEnd({ title, duration, success });

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
