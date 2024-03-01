import process from 'node:process';
import path from 'node:path';
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
      const match = line.match(
        /at\s(\/.+|file:.+)|^(\s+)at\smodule\scode\s\((\/.+|file:.+)\)/i
      );

      // Node and Deno
      if (match && match[1]) {
        file = match[1];
        break;
      }

      // Bun
      if (match && match[3]) {
        file = match[3];
        break;
      }
    }
  }

  return file;
};

const formatFail = (str: string) => format.bold(format.fail(`✘ ${str}`));

export const parseAssertion = (
  cb: () => void,
  options: ParseAssertionOptions
) => {
  const isPoku =
    typeof process.env?.FILE === 'string' && process.env?.FILE.length > 0;
  const FILE = process.env.FILE;

  try {
    cb();

    if (typeof options.message === 'string') {
      const message = isPoku
        ? `${format.bold(format.success(`✔ ${options.message}`))} ${format.dim(format.success(`› ${FILE}`))}`
        : format.bold(format.success(`✔ ${options.message}`));

      console.log(message);
    }
  } catch (error) {
    if (error instanceof assert.AssertionError) {
      const { code, actual, expected, operator } = error;
      const absoultePath = findFile(error).replace(/file:/, '');
      const file = path.relative(path.resolve(process.cwd()), absoultePath);

      let message: string = '';

      if (typeof options.message === 'string') message = options.message;
      else if (options.message instanceof Error)
        message = options.message.message;
      else if (typeof options.defaultMessage === 'string')
        message = options.defaultMessage;

      const finalMessage =
        message?.trim().length > 0
          ? `${formatFail(message)}`
          : `${formatFail('No Message')}`;

      console.log(
        isPoku
          ? `${finalMessage} ${format.dim(format.fail(`› ${FILE}`))}`
          : finalMessage
      );

      file && console.log(`${format.dim('      File')} ${file}`);
      console.log(`${format.dim('      Code')} ${code}`);
      console.log(`${format.dim('  Operator')} ${operator}${EOL}`);

      if (!options?.hideDiff) {
        console.log(format.dim(`  ${options?.actual || 'Actual'}:`));
        console.log(
          format.bold(
            typeof actual === 'function' || actual instanceof RegExp
              ? `  ${String(actual)}`
              : `  ${format.fail(JSON.stringify(actual))}`
          )
        );

        console.log(
          `${EOL}  ${format.dim(`${options?.expected || 'Expected'}:`)}`
        );
        console.log(
          format.bold(
            `${
              typeof expected === 'function' || expected instanceof RegExp
                ? `  ${String(expected)}`
                : `  ${format.success(JSON.stringify(expected))}`
            }`
          )
        );
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
