import type { Configs } from '../@types/poku.js';
import { results } from '../configs/poku.js';

const regex = {
  ansi: /u001b\[0m|\n/i,
  skip: /\\u001b\[94m\\u001b\[1m◯/gi,
  todo: /\\u001b\[96m\\u001b\[1m●/gi,
} as const;

export const isQuiet = (configs?: Configs): boolean =>
  typeof configs?.quiet === 'boolean' && Boolean(configs?.quiet);

export const isDebug = (configs?: Configs): boolean => Boolean(configs?.debug);

export const parserOutput = (options: {
  output: string;
  result: boolean;
  configs?: Configs;
}) => {
  const { output, result, configs } = options;
  const normalizedOutput = JSON.stringify(output);

  const hasSkip = normalizedOutput.match(regex.skip);
  if (hasSkip) results.skip += hasSkip.length;

  const hasTodo = normalizedOutput.match(regex.todo);
  if (hasTodo) results.todo += hasTodo.length;

  const debug = isDebug(configs);
  const pad = '  ';
  const splittedOutput = output.split('\n');

  const outputs = (
    debug || !result
      ? splittedOutput
      : splittedOutput.filter((current) => {
          if (current.indexOf('Exited with code') !== -1) return false;

          return regex.ansi.test(JSON.stringify(current)) || current === '';
        })
  ).filter((line) => line?.trim().length > 0);

  if (outputs.length === 0) return;

  return outputs.map((current) => `${pad}${current}`);
};
