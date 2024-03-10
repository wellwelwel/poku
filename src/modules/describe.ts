import { EOL } from 'node:os';
import { format, backgroundColor } from '../helpers/format.js';

export type DescribeOptions = {
  /**
   * Skips a line before to console it.
   *
   * @default false
   */
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
export const log = (message: string) => console.log(`\x1b[0m${message}\x1b[0m`);

/**
 * On **Poku**, `describe` is just a pretty `console.log` to title your test suites in the terminal.
 */
export const describe = (title: string, options?: DescribeOptions) => {
  const { pad, background, icon } = options || {};

  const message = `${icon || '☰'} ${title}`;
  const noBackground = typeof background === 'boolean' && !background;

  if (noBackground) {
    console.log(`${pad ? EOL : ''}${format.bold(message)}`);
    return;
  }

  console.log(
    `${pad ? EOL : ''}${format.bg(backgroundColor[typeof background === 'string' ? background : 'grey'], message)}`
  );
};
