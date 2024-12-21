import type { DescribeOptions } from '../../@types/describe.js';
import { hrtime } from 'node:process';
import { format } from '../../services/format.js';
import { log } from '../../services/write.js';
import { indentation } from '../../configs/indentation.js';
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

  if (typeof arg1 === 'string') {
    title = arg1;

    if (typeof arg2 === 'function') cb = arg2;
    else options = arg2;
  } else if (typeof arg1 === 'function') {
    cb = arg1;
    options = arg2 as DescribeOptions;
  }

  if (title) {
    indentation.hasDescribe = true;

    const { background, icon } = options ?? {};
    const message = `${cb ? format('◌').dim() : (icon ?? '☰')} ${cb ? format(title).dim() : format(title).bold()}`;
    const noBackground = !background;

    if (noBackground) log(format(message).bold());
    else
      log(
        format(` ${message} `).bg(
          typeof background === 'string' ? background : 'grey'
        )
      );
  }

  if (typeof cb !== 'function') return;

  const start = hrtime();
  const resultCb = cb();

  if (resultCb instanceof Promise) await resultCb;

  const end = hrtime(start);

  if (!title) return;

  const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

  GLOBAL.runAsOnly = false;
  indentation.hasDescribe = false;
  log(
    `${format(`● ${title}`).success().bold()} ${format(`› ${total}ms`).success().dim()}`
  );
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
