import { GLOBAL, results } from '../configs/poku.js';

const SKIP_MARKER = '\x1b[94m\x1b[1m\u25ef';
const TODO_MARKER = '\x1b[96m\x1b[1m\u25cf';
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

const countOccurrences = (str: string, search: string): number => {
  let count = 0;
  let pos = str.indexOf(search);
  while (pos !== -1) {
    count++;
    pos = str.indexOf(search, pos + search.length);
  }
  return count;
};

const isBlankLine = (line: string): boolean => {
  for (let i = 0; i < line.length; i++) {
    const c = line.charCodeAt(i);
    if (c !== 32 && c !== 9 && c !== 13) return false;
  }
  return true;
};

const countMarkers = (output: string): void => {
  const skipCount = countOccurrences(output, SKIP_MARKER);
  if (skipCount) results.skipped += skipCount;

  const todoCount = countOccurrences(output, TODO_MARKER);
  if (todoCount) results.todo += todoCount;
};

export const parserOutput = (options: { output: string; result: boolean }) => {
  const { output, result } = options;

  countMarkers(output);

  const pad = '  ';
  const isDebugOrFailed = GLOBAL.configs.debug || !result;
  const outputs: string[] = [];
  let start = 0;

  for (let i = 0; i <= output.length; i++) {
    if (i === output.length || output.charCodeAt(i) === 10) {
      if (i > start) {
        const line = output.substring(start, i);

        if (!isBlankLine(line)) {
          if (isDebugOrFailed) {
            outputs.push(`${pad}${line}`);
          } else if (line.indexOf(ANSI_RESET) !== -1) {
            if (line.indexOf('Exited with code') === -1) {
              outputs.push(`${pad}${line}`);
            }
          }
        }
      }
      start = i + 1;
    }
  }

  if (outputs.length === 0) return;

  return outputs;
};
