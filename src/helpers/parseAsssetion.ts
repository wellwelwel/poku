import process from 'node:process';
import assert from 'node:assert';
import { EOL } from 'node:os';
import { format } from './format.js';
import { hr } from './hr.js';

export type ParseAssertionOptions = {
  message?: string | Error;
  defaultMessage?: string;
  actual?: string;
  expected?: string;
  throw?: boolean;
  hideDiff?: boolean;
};

const findFile = (error: Error) => {
  const stackLines = error.stack?.split(EOL) || [];

  let file = '';

  const basePath = 'poku/lib/';

  for (const line of stackLines) {
    if (!line.includes(basePath)) {
      const match = line.match(/at\s(\/.+|file:\/\/\/.+)/i);
      if (match && match[1]) {
        file = match[1];
        break;
      }
    }
  }

  return file;
};

export const parseAssertion = (
  cb: () => void,
  options: ParseAssertionOptions
) => {
  try {
    cb();
  } catch (error) {
    if (error instanceof assert.AssertionError) {
      const { code, actual, expected, operator } = error;
      const file = findFile(error);

      hr();

      if (typeof options.message === 'string')
        console.log(format.bold(options.message), EOL);
      else if (options.message instanceof Error)
        console.log(format.bold(options.message.message), EOL);
      else if (typeof options.defaultMessage === 'string')
        console.log(options.defaultMessage, EOL);

      console.log(format.dim('Code:    '), format.bold(format.fail(code)));
      file && console.log(format.dim('File:    '), file);
      console.log(format.dim('Operator:'), operator);

      hr();

      if (!options?.hideDiff) {
        console.log(format.dim(`${options?.actual || 'Actual'}:`));
        console.log(
          format.bold(
            typeof actual === 'function' || actual instanceof RegExp
              ? String(actual)
              : format.fail(JSON.stringify(actual))
          )
        );

        console.log(
          `${EOL}${format.dim(`${options?.expected || 'Expected'}:`)}`
        );
        console.log(
          format.bold(
            typeof expected === 'function' || expected instanceof RegExp
              ? String(expected)
              : format.success(JSON.stringify(expected))
          )
        );

        hr();
      }

      if (options.throw) {
        console.log(error);
        hr();
      }

      process.exit(1);
    }

    // Non-assertion errors
    throw error;
  }
};
