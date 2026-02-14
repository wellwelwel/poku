import { GLOBAL, results } from '../configs/poku.js';

const ANSI_RESET = /\x1b\[0m/;
const SKIP_MARKER = /\x1b\[94m\x1b\[1m◯/g;
const TODO_MARKER = /\x1b\[96m\x1b\[1m●/g;

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

  const hasSkip = output.match(SKIP_MARKER);
  if (hasSkip) results.skipped += hasSkip.length;

  const hasTodo = output.match(TODO_MARKER);
  if (hasTodo) results.todo += hasTodo.length;

  const lines = output.split('\n');
  const showAll = GLOBAL.configs.debug || !result;
  const outputs: string[] = [];
  const length = lines.length;

  for (let i = 0; i < length; i++) {
    const line = lines[i];
    if (line.trim().length === 0) continue;

    if (showAll) {
      outputs.push(`  ${line}`);
      continue;
    }

    if (line.includes('Exited with code')) continue;
    if (ANSI_RESET.test(line)) outputs.push(`  ${line}`);
  }

  if (outputs.length === 0) return;

  return outputs;
};
