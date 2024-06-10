import { format, backgroundColor } from '../helpers/format.js';
import { write } from '../helpers/logs.js';
/* c8 ignore next */
import { indentation } from '../configs/indentation.js';
/* c8 ignore next */
import type { DescribeOptions } from '../@types/describe.js';

/**
 * On **Poku**, `describe` also can be used just as a pretty `console.log` to title your test suites in the terminal.
 */
export async function describe(
  title: string,
  cb: () => Promise<unknown>
): Promise<void>;
export function describe(title: string, cb: () => unknown): void;
export async function describe(cb: () => Promise<unknown>): Promise<void>;
export function describe(cb: () => unknown): unknown;
export function describe(title: string, options?: DescribeOptions): void;
export async function describe(
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

  /* c8 ignore start */
  if (title) {
    indentation.hasDescribe = true;

    const { background, icon } = options || {};
    const message = `${cb ? format.dim('◌') : icon || '☰'} ${format.bold(title) || ''}`;
    const noBackground = !background;

    if (noBackground) write(`${format.bold(message)}`);
    else {
      write(
        `${format.bg(backgroundColor[typeof background === 'string' ? background : 'grey'], message)}`
      );
    }
  }
  /* c8 ignore stop */

  if (typeof cb !== 'function') return;

  const resultCb = cb();

  /* c8 ignore next */
  if (resultCb instanceof Promise) await resultCb;

  /* c8 ignore start */
  if (title) {
    indentation.hasDescribe = false;
    write(`${format.bold(format.success('●'))} ${format.bold(title)}`);
  }
  /* c8 ignore stop */
}
