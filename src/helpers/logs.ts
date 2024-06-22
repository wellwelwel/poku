/* c8 ignore start */
import { stdout } from 'node:process';
import type { Configs } from '../@types/poku.js';
import type { Formatter } from './format.js';

export const isQuiet = (configs?: Configs): boolean =>
  typeof configs?.quiet === 'boolean' && Boolean(configs?.quiet);

export const isDebug = (configs?: Configs): boolean => Boolean(configs?.debug);

export const write = (data: string | Uint8Array | Formatter) =>
  stdout.write(`${String(data)}\n`);

export const printOutput = (options: {
  output: string;
  result: boolean;
  configs?: Configs;
}) => {
  const { output, result, configs } = options;

  const debug = isDebug(configs);
  const pad = configs?.parallel ? '  ' : '    ';
  const splittedOutput = output.split(/\n/);

  const outputs = (
    debug || !result
      ? splittedOutput
      : splittedOutput.filter((current) => {
          if (current.includes('Exited with code')) return false;
          return (
            /u001b\[0m|\n/i.test(JSON.stringify(current)) || current === ''
          );
        })
  ).filter((line) => line?.trim().length > 0);

  if (outputs.length === 0) return;

  const mappedOutputs = outputs.map((current) => `${pad}${current}`);

  write(mappedOutputs.join('\n'));
};
/* c8 ignore stop */
