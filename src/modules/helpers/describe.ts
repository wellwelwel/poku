import type { DescribeOptions } from '../../@types/describe.js';
import { AssertionError } from 'node:assert';
import process from 'node:process';
import { GLOBAL } from '../../configs/poku.js';
import { checkOnly } from '../../parsers/callback.js';
import { hasOnly } from '../../parsers/get-arg.js';
import { getCallback, getTitle } from './it/core.js';
import { onlyDescribe, skip, todo } from './modifiers.js';

const getOptions = (input: unknown): DescribeOptions | undefined =>
  !input || typeof input !== 'object' ? undefined : input;

export const describeBase = async (
  titleOrCb: string | (() => unknown | Promise<unknown>),
  callbackOrOptions?: (() => unknown | Promise<unknown>) | DescribeOptions
): Promise<void> => {
  const { reporter } = GLOBAL;
  const title = getTitle(titleOrCb);
  const hasTitle = typeof title === 'string';
  const cb = hasTitle ? getCallback(callbackOrOptions) : getCallback(titleOrCb);
  const hasCB = typeof cb === 'function';
  const options = hasCB ? undefined : getOptions(callbackOrOptions);

  let success = true;
  let start;
  let end;

  if (hasTitle) {
    if (hasCB) reporter.onDescribeStart({ title });
    else reporter.onDescribeAsTitle(title, options ?? Object.create(null));
  }

  if (!hasCB) return;

  const onError = (error: unknown) => {
    process.exitCode = 1;
    success = false;
    if (!(error instanceof AssertionError)) console.error(error);
  };

  process.once('uncaughtException', onError);
  process.once('unhandledRejection', onError);

  start = process.hrtime();

  try {
    const resultCb = cb!();
    if (resultCb instanceof Promise) await resultCb;
  } catch (error) {
    onError(error);
  } finally {
    end = process.hrtime(start);

    process.removeListener('uncaughtException', onError);
    process.removeListener('unhandledRejection', onError);
  }

  if (!title) return;

  const duration = end[0] * 1e3 + end[1] / 1e6;

  reporter.onDescribeEnd({ title, duration, success });

  GLOBAL.runAsOnly = false;
};

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
