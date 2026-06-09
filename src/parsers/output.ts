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

const ObjProto = Object.prototype;

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

  if (kind === 'number') return String(value);
  if (kind === 'string') return JSON.stringify(value);
  if (kind === 'boolean') return String(value);
  if (kind === 'bigint') return `${String(value)}n`;
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
    const length = value.length;

    if (length === 0) return '[]';

    seen.add(value);

    const child = indent(depth + 1);
    const separator = `,\n${child}`;
    const first = value[0];
    let acc = `[\n${child}${first === undefined && !(0 in value) ? '<empty>' : serialize(first, seen, depth + 1)}`;

    for (let index = 1; index < length; index++) {
      const element = value[index];

      acc += `${separator}${element === undefined && !(index in value) ? '<empty>' : serialize(element, seen, depth + 1)}`;
    }

    seen.delete(value);
    return `${acc}\n${indent(depth)}]`;
  }

  const prototype = Object.getPrototypeOf(value);
  const isPlainObject = prototype === ObjProto || prototype === null;

  if (!isPlainObject) {
    if (value instanceof Set) {
      if (value.size === 0) return 'Set {}';

      seen.add(value);

      const child = indent(depth + 1);
      const separator = `,\n${child}`;
      let acc = `Set {`;
      let isFirst = true;

      for (const element of value) {
        acc += `${isFirst ? `\n${child}` : separator}${serialize(element, seen, depth + 1)}`;
        isFirst = false;
      }

      seen.delete(value);
      return `${acc}\n${indent(depth)}}`;
    }

    if (value instanceof Map) {
      if (value.size === 0) return 'Map {}';

      seen.add(value);

      const child = indent(depth + 1);
      const separator = `,\n${child}`;
      let acc = `Map {`;
      let isFirst = true;

      for (const [mapKey, mapValue] of value) {
        acc += `${isFirst ? `\n${child}` : separator}${serialize(mapKey, seen, depth + 1)} => ${serialize(mapValue, seen, depth + 1)}`;
        isFirst = false;
      }

      seen.delete(value);
      return `${acc}\n${indent(depth)}}`;
    }

    if (value instanceof Promise) return 'Promise {}';
    if (value instanceof WeakMap) return 'WeakMap {}';
    if (value instanceof WeakSet) return 'WeakSet {}';
    if (value instanceof URL) return `URL "${value.href}"`;

    if (value instanceof URLSearchParams) {
      let acc = '';
      let isFirst = true;

      for (const [key, val] of value) {
        acc += `${isFirst ? '' : ', '}${JSON.stringify(key)} => ${JSON.stringify(val)}`;
        isFirst = false;
      }

      if (acc === '') return 'URLSearchParams {}';
      return `URLSearchParams { ${acc} }`;
    }

    if (Buffer.isBuffer(value)) {
      const length = value.length;

      if (length === 0) return 'Buffer []';

      seen.add(value);

      const child = indent(depth + 1);
      const separator = `,\n${child}`;
      let acc = `Buffer [\n${child}${formatByte(value[0])}`;

      for (let index = 1; index < length; index++)
        acc += `${separator}${formatByte(value[index])}`;

      seen.delete(value);
      return `${acc}\n${indent(depth)}]`;
    }

    if (value instanceof DataView)
      return `DataView { "byteLength": ${value.byteLength}, "byteOffset": ${value.byteOffset} }`;

    if (ArrayBuffer.isView(value as ArrayBufferView)) {
      const typed = value as ArrayLike<number | bigint> & object;
      const typeName =
        (typed as { constructor?: { name?: string } }).constructor?.name ??
        'TypedArray';
      const length = typed.length;

      if (length === 0) return `${typeName} []`;

      seen.add(typed);

      const child = indent(depth + 1);
      const separator = `,\n${child}`;
      const first = typed[0];
      let acc = `${typeName} [\n${child}${typeof first === 'bigint' ? `${String(first)}n` : String(first)}`;

      for (let index = 1; index < length; index++) {
        const element = typed[index];

        acc += `${separator}${typeof element === 'bigint' ? `${String(element)}n` : String(element)}`;
      }

      seen.delete(typed);
      return `${acc}\n${indent(depth)}]`;
    }

    if (value instanceof ArrayBuffer)
      return `ArrayBuffer { "byteLength": ${value.byteLength} }`;
  }

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

  const constructorName = (value as { constructor?: { name?: string } })
    .constructor?.name;
  const isClassInstance =
    prototype !== null &&
    prototype !== ObjProto &&
    typeof constructorName === 'string' &&
    constructorName !== 'Object';
  const stringKeys = Object.keys(value as object);
  const symbolKeys = Object.getOwnPropertySymbols(value as object);
  const stringKeysLength = stringKeys.length;
  const symbolKeysLength = symbolKeys.length;

  if (stringKeysLength === 0 && symbolKeysLength === 0)
    return isClassInstance ? `${constructorName} {}` : '{}';

  stringKeys.sort(compareStrings);
  if (symbolKeysLength > 0) symbolKeys.sort(compareSymbols);

  const child = indent(depth + 1);
  const separator = `,\n${child}`;
  const record = value as Record<string | symbol, unknown>;

  seen.add(value as object);

  let acc = '';
  let isFirst = true;

  for (let index = 0; index < stringKeysLength; index++) {
    const key = stringKeys[index];

    acc += `${isFirst ? '' : separator}${JSON.stringify(key)}: ${serialize(record[key], seen, depth + 1)}`;
    isFirst = false;
  }

  for (let index = 0; index < symbolKeysLength; index++) {
    const symbolKey = symbolKeys[index];

    acc += `${isFirst ? '' : separator}${String(symbolKey)}: ${serialize(record[symbolKey], seen, depth + 1)}`;
    isFirst = false;
  }

  seen.delete(value as object);

  const prefix = isClassInstance ? `${constructorName} ` : '';
  return `${prefix}{\n${child}${acc}\n${indent(depth)}}`;
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
