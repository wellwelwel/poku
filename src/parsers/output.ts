/* c8 ignore next */ // Types
import type { Configs } from '../@types/poku.js';
import { results } from '../configs/poku.js';

const regex = {
  newLine: /\n/,
  ansi: /u001b\[0m|\n/i,
  skipped: /^"\\u001b\[94m\\u001b\[1mℹ/i,
} as const;

export const isQuiet = (configs?: Configs): boolean =>
  typeof configs?.quiet === 'boolean' && Boolean(configs?.quiet);

/* c8 ignore next */
export const isDebug = (configs?: Configs): boolean => Boolean(configs?.debug);

/* c8 ignore next */ // ?
export const parserOutput = (options: {
  output: string;
  result: boolean;
  configs?: Configs;
}) => {
  const { output, result, configs } = options;
  const normalizedOutput = JSON.stringify(output);

  if (regex.skipped.test(normalizedOutput)) {
    ++results.skipped;
  }

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

  return outputs.map((current) => `${pad}${current}`);
};
