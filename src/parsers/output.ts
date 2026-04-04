import { GLOBAL, results } from '../configs/poku.js';

const SKIP_MARKER = '\x1b[94m\x1b[1m◯';
const TODO_MARKER = '\x1b[96m\x1b[1m●';
const ANSI_RESET = '\x1b[0m';

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

  const pad = '  ';
  const isDebugOrFailed = GLOBAL.configs.debug || !result;
  const outputs: string[] = [];

  let start = 0;

  while (start < output.length) {
    const end = output.indexOf('\n', start);
    const lineEnd = end === -1 ? output.length : end;

    if (lineEnd > start) {
      const line = output.substring(start, lineEnd);

      if (line.includes(SKIP_MARKER)) results.skipped++;
      if (line.includes(TODO_MARKER)) results.todo++;

      if (line.trim().length > 0) {
        if (
          isDebugOrFailed ||
          (line.indexOf('Exited with code') === -1 && line.includes(ANSI_RESET))
        ) {
          outputs.push(`${pad}${line}`);
        }
      }
    }

    start = lineEnd + 1;
  }

  if (outputs.length === 0) return;

  return outputs;
};
