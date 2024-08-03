import { parseResultType } from '../../parsers/assert.js';
import { Write } from '../../services/write.js';

/** By default **Poku** only shows outputs generated from itself. This helper allows you to use an alternative to `console.log` with **Poku**. */
export const log = (...args: unknown[]) => {
  const parsedMessages = args
    .map((arg) => parseResultType(arg))
    .join(' ')
    .split('\n')
    .map((line) => `\x1b[0m${line}\x1b[0m`)
    .join('\n');

  Write.log(parsedMessages);
};
