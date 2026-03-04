import { GLOBAL, results } from '../configs/poku.js';

const regex = {
  ansi: /\x1b\[0m/,
  skip: /\x1b\[94m\x1b\[1m◯/g,
  todo: /\x1b\[96m\x1b\[1m●/g,
} as const;

export const serialize = (value: unknown): unknown => {
  if (
    typeof value === 'undefined' ||
    typeof value === 'function' ||
    typeof value === 'bigint' ||
    typeof value === 'symbol' ||
    value instanceof RegExp
  )
    return String(value);
  if (Array.isArray(value)) return value.map(serialize);
  if (value instanceof Set) return Array.from(value).map(serialize);
  if (value instanceof Map) return serialize(Object.fromEntries(value));
  if (value !== null && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, serialize(val)])
    );

  return value;
};

export const parserOutput = (options: { output: string; result: boolean }) => {
  const { output, result } = options;

  const hasSkip = output.match(regex.skip);
  if (hasSkip) results.skipped += hasSkip.length;

  const hasTodo = output.match(regex.todo);
  if (hasTodo) results.todo += hasTodo.length;

  const pad = '  ';
  const isDebugOrFailed = GLOBAL.configs.debug || !result;
  const splittedOutput = output.split('\n');
  const outputs: string[] = [];

  for (const line of splittedOutput) {
    if (!line || line.trim().length === 0) continue;
    if (!isDebugOrFailed) {
      if (line.indexOf('Exited with code') !== -1) continue;
      if (!regex.ansi.test(line)) continue;
    }
    outputs.push(`${pad}${line}`);
  }

  if (outputs.length === 0) return;

  return outputs;
};
