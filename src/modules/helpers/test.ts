/* c8 ignore next */ // ?
import { hrtime, env } from 'node:process';
import { each } from '../../configs/each.js';
import { indentation } from '../../configs/indentation.js';
import { format } from '../../services/format.js';
import { Write } from '../../services/write.js';

export async function test(
  message: string,
  cb: () => Promise<unknown>
): Promise<void>;
export function test(message: string, cb: () => unknown): void;
export async function test(cb: () => Promise<unknown>): Promise<void>;
export function test(cb: () => unknown): void;
/* c8 ignore next */ // ?
export async function test(
  ...args: [
    string | (() => unknown | Promise<unknown>),
    (() => unknown | Promise<unknown>)?,
  ]
): Promise<void> {
  let message: string | undefined;
  let cb: () => unknown | Promise<unknown>;

  const isPoku = typeof env?.FILE === 'string' && env?.FILE.length > 0;
  const FILE = env.FILE;

  if (typeof args[0] === 'string') {
    message = args[0];
    cb = args[1] as () => unknown | Promise<unknown>;
  } else {
    cb = args[0] as () => unknown | Promise<unknown>;
  }

  if (message) {
    indentation.hasTest = true;

    Write.log(
      /* c8 ignore next 2 */
      isPoku
        ? format(`◌ ${message} › ${format(`${FILE}`).italic().gray()}`).dim()
        : format(`◌ ${message}`).dim()
    );
  }

  if (typeof each.before.cb === 'function') {
    const beforeResult = each.before.cb();

    if (beforeResult instanceof Promise) {
      await beforeResult;
    }
  }

  const start = hrtime();
  const resultCb = cb();

  if (resultCb instanceof Promise) {
    await resultCb;
  }

  const end = hrtime(start);

  if (typeof each.after.cb === 'function') {
    const afterResult = each.after.cb();

    if (afterResult instanceof Promise) {
      await afterResult;
    }
  }

  if (message) {
    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    indentation.hasTest = false;
    Write.log(
      `${format(`● ${message}`).success().bold()} ${format(`› ${total}ms`).success().dim()}`
    );
  }
}
