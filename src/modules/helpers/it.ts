/* c8 ignore next */ // ?
import { hrtime, env } from 'node:process';
import { each } from '../../configs/each.js';
import { indentation } from '../../configs/indentation.js';
import { format } from '../../services/format.js';
import { Write } from '../../services/write.js';

export async function it(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
export async function it(message: string, cb: () => unknown): Promise<void>;
export async function it(cb: () => Promise<unknown>): Promise<void>;
export function it(cb: () => unknown): void;
/* c8 ignore next */ // ?
export async function it(
  ...args: [
    string | (() => unknown | Promise<unknown>),
    (() => unknown | Promise<unknown>)?,
  ]
): Promise<void> {
  let message: string | undefined;
  let cb: () => unknown | Promise<unknown>;

  const isPoku = typeof env?.FILE === 'string' && env?.FILE.length > 0;
  const FILE = env.FILE;

  if (typeof each.before.cb === 'function' && each.before.test) {
    const beforeResult = each.before.cb();

    /* c8 ignore next 3 */
    if (beforeResult instanceof Promise) {
      await beforeResult;
    }
  }

  if (typeof args[0] === 'string') {
    message = args[0];
    cb = args[1] as () => unknown | Promise<unknown>;
  } else {
    cb = args[0] as () => unknown | Promise<unknown>;
  }

  /* c8 ignore start */
  if (message) {
    indentation.hasIt = true;

    Write.log(
      isPoku && !indentation.hasDescribe
        ? `${indentation.hasDescribe ? '  ' : ''}${format(`◌ ${message} › ${format(`${FILE}`).italic().gray()}`).dim()}`
        : `${indentation.hasDescribe ? '  ' : ''}${format(`◌ ${message}`).dim()}`
    );
  }
  /* c8 ignore stop */

  const start = hrtime();
  const resultCb = cb();

  /* c8 ignore next 3 */
  if (resultCb instanceof Promise) {
    await resultCb;
  }

  const end = hrtime(start);

  if (typeof each.after.cb === 'function' && each.after.test) {
    const afterResult = each.after.cb();

    /* c8 ignore next 3 */
    if (afterResult instanceof Promise) {
      await afterResult;
    }
  }

  if (message) {
    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    indentation.hasIt = false;
    Write.log(
      `${indentation.hasDescribe ? '  ' : ''}${format(`● ${message}`).success().bold()} ${format(`› ${total}ms`).success().dim()}`
    );
  }
}
