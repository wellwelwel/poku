/* c8 ignore start */

import { format, backgroundColor } from '../helpers/format.js';
import { write } from '../helpers/logs.js';

export let describeCounter = 0;

export type DescribeOptions = {
  /** @deprecated */
  pad?: boolean;
  /**
   * @default "grey"
   */
  background?: keyof typeof backgroundColor | boolean;
  /**
   * @default "☰"
   */
  icon?: string;
};

/**
 * By default **Poku** only shows outputs generated from itself.
 * This helper allows you to use an alternative to `console.log` with **Poku**.
 *
 * Need to debug? Just use the [`debug`](https://poku.io/docs/documentation/poku/options/debug) option from `poku`.
 */
export const log = (message: string) => write(`\x1b[0m${message}\x1b[0m`);

/**
 * On **Poku**, `describe` is just a pretty `console.log` to title your test suites in the terminal.
 */
export const describe = (title: string, options?: DescribeOptions) => {
  const { background, icon } = options || {};

  const message = `${icon || '☰'} ${title}`;
  const noBackground = !background;

  describeCounter++;

  if (noBackground) {
    write(`${format.bold(message)}`);
    return;
  }

  write(
    `${format.bg(backgroundColor[typeof background === 'string' ? background : 'grey'], message)}`
  );
};

/* c8 ignore stop */
