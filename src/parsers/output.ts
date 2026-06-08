import { results } from '../configs/results.js';
import { format } from '../services/format.js';

const ANSI_RESET = '\x1b[0m';
const SKIP_MARKER = String(format('◯').info().bold()).slice(
  0,
  -ANSI_RESET.length
);
const TODO_MARKER = String(format('●').cyan().bold()).slice(
  0,
  -ANSI_RESET.length
);

export const timeoutMessage = (ms: number): string =>
  `${format(`● Timeout: test file exceeded ${ms}ms limit`).fail().bold()}`;

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

export const parserOutput = (options: {
  output: string;
  result: boolean;
  debug?: boolean;
}) => {
  const { output, result, debug } = options;

  const pad = '  ';
  const isDebugOrFailed = debug || !result;
  const outputs: string[] = [];

  let offset = 0;

  while (offset < output.length) {
    const nextNewline = output.indexOf('\n', offset);
    const lineEnd = nextNewline === -1 ? output.length : nextNewline;

    if (lineEnd > offset) {
      const line = output.substring(offset, lineEnd);

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

    offset = lineEnd + 1;
  }

  if (outputs.length === 0) return;

  return outputs;
};
