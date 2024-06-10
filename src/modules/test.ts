/* c8 ignore next */
import { each } from '../configs/each.js';
/* c8 ignore next */
import { indentation } from '../configs/indentation.js';
import { format } from '../helpers/format.js';
import { write } from '../helpers/logs.js';

export async function test(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
export async function test(message: string, cb: () => unknown): Promise<void>;
export async function test(cb: () => Promise<unknown>): Promise<void>;
export function test(cb: () => unknown): void;
export async function test(
  ...args: [
    string | (() => unknown | Promise<unknown>),
    (() => unknown | Promise<unknown>)?,
  ]
): Promise<void> {
  let message: string | undefined;
  let cb: () => unknown | Promise<unknown>;

  if (typeof each.before.cb === 'function' && each.before.test) {
    const beforeResult = each.before.cb();

    /* c8 ignore next */
    if (beforeResult instanceof Promise) await beforeResult;
  }

  if (typeof args[0] === 'string') {
    message = args[0];
    cb = args[1] as () => unknown | Promise<unknown>;
  } else cb = args[0] as () => unknown | Promise<unknown>;

  /* c8 ignore start */
  if (message) {
    indentation.hasTest = true;

    write(`${format.dim('◌')} ${format.bold(message)}`);
  }
  /* c8 ignore stop */

  const resultCb = cb();

  /* c8 ignore next */
  if (resultCb instanceof Promise) await resultCb;

  if (typeof each.after.cb === 'function' && each.after.test) {
    const afterResult = each.after.cb();
    /* c8 ignore next */
    if (afterResult instanceof Promise) await afterResult;
  }

  /* c8 ignore start */
  if (message) {
    indentation.hasTest = false;
    write(`${format.bold(format.success('●'))} ${format.bold(message)}`);
  }
  /* c8 ignore stop */
}
