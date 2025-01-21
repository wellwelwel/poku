import { GLOBAL, results } from '../configs/poku.js';

const regex = {
  ansi: /u001b\[0m|\n/i,
  skip: /\\u001b\[94m\\u001b\[1m◯/gi,
  todo: /\\u001b\[96m\\u001b\[1m●/gi,
} as const;

export const parserOutput = (options: { output: string; result: boolean }) => {
  const { output, result } = options;
  const normalizedOutput = JSON.stringify(output);

  const hasSkip = normalizedOutput.match(regex.skip);
  if (hasSkip) results.resume.skipped += hasSkip.length;

  const hasTodo = normalizedOutput.match(regex.todo);
  if (hasTodo) results.resume.todo += hasTodo.length;

  const pad = '  ';
  const splittedOutput = output.split('\n');

  const outputs = (
    GLOBAL.configs.debug || !result
      ? splittedOutput
      : splittedOutput.filter((current) => {
          if (current.indexOf('Exited with code') !== -1) return false;

          return regex.ansi.test(JSON.stringify(current)) || current === '';
        })
  ).filter((line) => line?.trim().length > 0);

  if (outputs.length === 0) return;

  return outputs.map((current) => `${pad}${current}`);
};
