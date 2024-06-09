/* c8 ignore start */

import { write } from '../helpers/logs.js';

/**
 * By default **Poku** only shows outputs generated from itself.
 * This helper allows you to use an alternative to `console.log` with **Poku**.
 *
 * Need to debug? Just use the [`debug`](https://poku.io/docs/documentation/poku/options/debug) option from `poku`.
 */
export const log = (message: string) => write(`\x1b[0m${message}\x1b[0m`);

/* c8 ignore stop */
