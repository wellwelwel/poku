/* c8 ignore next */ // Types
import type { DescribeOptions } from '../../@types/describe.js';
import { hrtime, env } from 'node:process';
import { format } from '../../services/format.js';
import { Write } from '../../services/write.js';
import { indentation } from '../../configs/indentation.js';

/** On **Poku**, `describe` also can be used just as a pretty `console.log` to title your test suites in the terminal */
export async function describe(
  title: string,
  cb: () => Promise<unknown>
): Promise<void>;
export function describe(title: string, cb: () => unknown): void;
export async function describe(cb: () => Promise<unknown>): Promise<void>;
export function describe(cb: () => unknown): unknown;
export function describe(title: string, options?: DescribeOptions): void;
/* c8 ignore next */ // ?
export async function describe(
  arg1: string | (() => unknown | Promise<unknown>),
  arg2?: (() => unknown | Promise<unknown>) | DescribeOptions
): Promise<void> {
  let title: string | undefined;
  let cb: (() => unknown | Promise<unknown>) | undefined;
  let options: DescribeOptions | undefined;

  const isPoku = typeof env?.FILE === 'string' && env?.FILE.length > 0;
  const FILE = env.FILE;

  if (typeof arg1 === 'string') {
    title = arg1;

    if (typeof arg2 === 'function') {
      cb = arg2;
    } else {
      options = arg2;
    }
  } else if (typeof arg1 === 'function') {
    cb = arg1;
    options = arg2 as DescribeOptions;
  }

  if (title) {
    indentation.hasDescribe = true;

    const { background, icon } = options || {};
    const message = `${cb ? format('◌').dim() : icon || '☰'} ${cb ? format(isPoku ? `${title} › ${format(`${FILE}`).italic().gray()}` : title).dim() : format(title).bold() || ''}`;
    const noBackground = !background;

    if (noBackground) {
      Write.log(format(message).bold());
    } else {
      Write.log(
        format(` ${message} `).bg(
          typeof background === 'string' ? background : 'grey'
        )
      );
    }
  }

  if (typeof cb !== 'function') {
    return;
  }

  const start = hrtime();
  const resultCb = cb();

  if (resultCb instanceof Promise) {
    await resultCb;
  }

  const end = hrtime(start);

  if (title) {
    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    indentation.hasDescribe = false;
    Write.log(
      `${format(`● ${title}`).success().bold()} ${format(`› ${total}ms`).success().dim()}`
    );
  }
}
