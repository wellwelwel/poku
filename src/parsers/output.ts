import { results } from '../configs/results.js';
import { format } from '../services/format.js';

const INDENTS = Array.from({ length: 16 }, (_, depth) => '  '.repeat(depth));
const ANSI_RESET = '\x1b[0m';
const SKIP_MARKER = String(format('◯').info().bold()).slice(
  0,
  -ANSI_RESET.length
);
const TODO_MARKER = String(format('●').cyan().bold()).slice(
  0,
  -ANSI_RESET.length
);

const indent = (depth: number): string => INDENTS[depth] ?? '  '.repeat(depth);

const compareStrings = (a: string, b: string): number => a.localeCompare(b);

const compareSymbols = (a: symbol, b: symbol): number =>
  String(a).localeCompare(String(b));

const formatByte = (byte: number): string =>
  `0x${byte.toString(16).padStart(2, '0').toUpperCase()}`;

export const timeoutMessage = (ms: number): string =>
  `${format(`● Timeout: test file exceeded ${ms}ms limit`).fail().bold()}`;

export const serialize = (
  value: unknown,
  visited?: Set<object>,
  depth = 0
): string => {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';

  const kind = typeof value;

  if (kind === 'boolean' || kind === 'number') return String(value);
  if (kind === 'bigint') return `${String(value)}n`;
  if (kind === 'string') return JSON.stringify(value);
  if (kind === 'symbol') return String(value);
  if (kind === 'function') {
    const name = (value as { name?: string }).name;
    return name ? `[Function ${name}]` : '[Function]';
  }

  if (value instanceof RegExp) return String(value);
  if (value instanceof Date) return value.toISOString();

  const seen = visited ?? new Set<object>();

  if (seen.has(value as object)) return '[Circular]';

  if (value instanceof Error)
    return `[${value.name || 'Error'}: ${value.message ?? ''}]`;

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';

    seen.add(value);

    const parts: string[] = [];
    const child = indent(depth + 1);

    for (let index = 0; index < value.length; index++) {
      const rendered = Object.prototype.hasOwnProperty.call(value, index)
        ? serialize(value[index], seen, depth + 1)
        : '<empty>';

      parts.push(`${child}${rendered}`);
    }

    seen.delete(value);
    return `[\n${parts.join(',\n')}\n${indent(depth)}]`;
  }

  if (value instanceof Set) {
    if (value.size === 0) return 'Set {}';

    seen.add(value);

    const lines: string[] = [];
    const child = indent(depth + 1);

    for (const element of value)
      lines.push(`${child}${serialize(element, seen, depth + 1)}`);

    seen.delete(value);
    return `Set {\n${lines.join(',\n')}\n${indent(depth)}}`;
  }

  if (value instanceof Map) {
    if (value.size === 0) return 'Map {}';

    seen.add(value);

    const lines: string[] = [];
    const child = indent(depth + 1);

    for (const [mapKey, mapValue] of value)
      lines.push(
        `${child}${serialize(mapKey, seen, depth + 1)} => ${serialize(mapValue, seen, depth + 1)}`
      );

    seen.delete(value);
    return `Map {\n${lines.join(',\n')}\n${indent(depth)}}`;
  }

  if (value instanceof Promise) return 'Promise {}';
  if (value instanceof WeakMap) return 'WeakMap {}';
  if (value instanceof WeakSet) return 'WeakSet {}';
  if (value instanceof URL) return `URL "${value.href}"`;

  if (value instanceof URLSearchParams) {
    const parts: string[] = [];

    for (const [key, val] of value)
      parts.push(`${JSON.stringify(key)} => ${JSON.stringify(val)}`);

    if (parts.length === 0) return 'URLSearchParams {}';
    return `URLSearchParams { ${parts.join(', ')} }`;
  }

  if (Buffer.isBuffer(value)) {
    if (value.length === 0) return 'Buffer []';

    seen.add(value);

    const parts: string[] = [];
    const child = indent(depth + 1);

    for (const byte of value) parts.push(`${child}${formatByte(byte)}`);

    seen.delete(value);

    return `Buffer [\n${parts.join(',\n')}\n${indent(depth)}]`;
  }

  if (value instanceof DataView)
    return `DataView { "byteLength": ${value.byteLength}, "byteOffset": ${value.byteOffset} }`;

  if (ArrayBuffer.isView(value as ArrayBufferView)) {
    const typed = value as ArrayLike<number | bigint> & object;
    const typeName =
      (typed as { constructor?: { name?: string } }).constructor?.name ??
      'TypedArray';

    if (typed.length === 0) return `${typeName} []`;

    seen.add(typed);

    const parts: string[] = [];
    const child = indent(depth + 1);

    for (let index = 0; index < typed.length; index++) {
      const element = typed[index];

      parts.push(
        `${child}${typeof element === 'bigint' ? `${String(element)}n` : String(element)}`
      );
    }

    seen.delete(typed);
    return `${typeName} [\n${parts.join(',\n')}\n${indent(depth)}]`;
  }

  if (value instanceof ArrayBuffer)
    return `ArrayBuffer { "byteLength": ${value.byteLength} }`;

  if (
    (value as { [Symbol.toStringTag]?: string })[Symbol.toStringTag] ===
    'Generator'
  )
    return 'Generator {}';

  const toJSON = (value as { toJSON?: unknown }).toJSON;

  if (typeof toJSON === 'function') {
    seen.add(value as object);

    try {
      const replaced = (toJSON as (key?: string) => unknown).call(value, '');
      if (replaced !== value) return serialize(replaced, seen, depth);
    } catch {
    } finally {
      seen.delete(value as object);
    }
  }

  const prototype = Object.getPrototypeOf(value);
  const constructorName = (value as { constructor?: { name?: string } })
    .constructor?.name;
  const isClassInstance =
    prototype !== null &&
    prototype !== Object.prototype &&
    typeof constructorName === 'string' &&
    constructorName !== 'Object';
  const stringKeys = Object.keys(value as object);
  const symbolKeys = Object.getOwnPropertySymbols(value as object);

  if (stringKeys.length === 0 && symbolKeys.length === 0)
    return isClassInstance ? `${constructorName} {}` : '{}';

  stringKeys.sort(compareStrings);
  symbolKeys.sort(compareSymbols);

  const lines: string[] = [];
  const child = indent(depth + 1);

  seen.add(value as object);

  for (const key of stringKeys)
    lines.push(
      `${child}${JSON.stringify(key)}: ${serialize((value as Record<string, unknown>)[key], seen, depth + 1)}`
    );

  for (const symbolKey of symbolKeys)
    lines.push(
      `${child}${String(symbolKey)}: ${serialize((value as Record<symbol, unknown>)[symbolKey], seen, depth + 1)}`
    );

  seen.delete(value as object);

  const prefix = isClassInstance ? `${constructorName} ` : '';
  return `${prefix}{\n${lines.join(',\n')}\n${indent(depth)}}`;
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
