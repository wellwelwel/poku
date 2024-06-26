/* c8 ignore next */ // c8 bug
import { hrtime, env } from 'node:process';
import { each } from '../configs/each.js';
import { indentation } from '../configs/indentation.js';
import { format } from '../helpers/format.js';
import { write } from '../helpers/logs.js';

/* c8 ignore start */ // c8 bug
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
  /* c8 ignore stop */
  let message: string | undefined;
  let cb: () => unknown | Promise<unknown>;

  const isPoku = typeof env?.FILE === 'string' && env?.FILE.length > 0;
  const FILE = env.FILE;

  if (typeof each.before.cb === 'function' && each.before.test) {
    const beforeResult = each.before.cb();

    /* c8 ignore next */
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

  if (message) {
    indentation.hasTest = true;

    write(
      isPoku
        ? format(
            `◌ ${message} › ${format(`${FILE}`).italic().gray()}`
          ).dim() /* c8 ignore next */ // c8 bug
        : /* c8 ignore next */
          format(`◌ ${message}`).dim()
    );
  }

  const start = hrtime();
  const resultCb = cb();

  /* c8 ignore next */
  if (resultCb instanceof Promise) {
    await resultCb;
  }
  const end = hrtime(start);

  if (typeof each.after.cb === 'function' && each.after.test) {
    const afterResult = each.after.cb();
    /* c8 ignore next */
    if (afterResult instanceof Promise) {
      await afterResult;
    }
  }

  /* c8 ignore start */
  if (message) {
    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    indentation.hasTest = false;
    write(
      `${format(`● ${message}`).success().bold()} ${format(`› ${total}ms`).success().dim()}`
    );
  }
  /* c8 ignore stop */
}
