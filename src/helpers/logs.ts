/* c8 ignore next */
import type { Configs } from '../@types/poku.js';
/* c8 ignore next */
import type { Formatter } from './format.js';
import { stdout } from 'node:process';

const regex = {
  newLine: /\n/,
  ansi: /u001b\[0m|\n/i,
} as const;

export const isQuiet = (configs?: Configs): boolean =>
  typeof configs?.quiet === 'boolean' && Boolean(configs?.quiet);

export const isDebug = (configs?: Configs): boolean => Boolean(configs?.debug);

export const write = (data: string | Uint8Array | Formatter) =>
  stdout.write(`${String(data)}\n`);

/* c8 ignore next */ // c8 bug
export const printOutput = (options: {
  output: string;
  result: boolean;
  configs?: Configs;
}) => {
  const { output, result, configs } = options;

  const debug = isDebug(configs);
  const pad = configs?.parallel ? '  ' : '    ';
  const splittedOutput = output.split(regex.newLine);

  const outputs = (
    debug || !result
      ? splittedOutput
      : splittedOutput.filter((current) => {
          if (current.indexOf('Exited with code') !== -1) {
            return false;
          }
          return regex.ansi.test(JSON.stringify(current)) || current === '';
        })
  ).filter((line) => line?.trim().length > 0);

  if (outputs.length === 0) {
    return;
  }

  const mappedOutputs = outputs.map((current) => `${pad}${current}`);

  write(mappedOutputs.join('\n'));
};
