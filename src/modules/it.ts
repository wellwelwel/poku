/* c8 ignore next */
import { each } from '../configs/each.js';
/* c8 ignore next */
import { indentation } from '../configs/indentation.js';
import { format } from '../helpers/format.js';
import { write } from '../helpers/logs.js';

export async function it(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
export async function it(message: string, cb: () => unknown): Promise<void>;
export async function it(cb: () => Promise<unknown>): Promise<void>;
export function it(cb: () => unknown): void;
export async function it(
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
    indentation.hasIt = true;
    write(
      `${indentation.hasDescribe ? '  ' : ''}${format.dim('◌')} ${format.bold(format.italic(format.dim(message)))}`
    );
  }
  /* c8 ignore end */

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
    indentation.hasIt = false;
    write(
      `${indentation.hasDescribe ? '  ' : ''}${format.bold(format.success('●'))} ${format.bold(format.italic(message))}`
    );
  }
  /* c8 ignore stop */
}
