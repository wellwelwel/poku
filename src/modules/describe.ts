import { format, backgroundColor } from '../helpers/format.js';
import { write } from '../helpers/logs.js';
import { indentation } from '../configs/indentation.js';
/* c8 ignore next */
import type { DescribeOptions } from '../@types/describe.js';

/**
 * On **Poku**, `describe` is just a pretty `console.log` to title your test suites in the terminal.
 */
export const describe = (title: string, options?: DescribeOptions) => {
  const { background, icon } = options || {};

  const message = `${icon || '☰'} ${title}`;
  const noBackground = !background;

  indentation.describeCounter++;

  if (noBackground) {
    write(`${format.bold(message)}`);
    return;
  }

  write(
    `${format.bg(backgroundColor[typeof background === 'string' ? background : 'grey'], message)}`
  );
};
