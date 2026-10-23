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

const proto = Object.prototype;
const arrayJoin: (
  this: ArrayLike<number | bigint>,
  separator: string
) => string = Object.getPrototypeOf(Uint8Array.prototype).join;

const BYTE_HEX = Array.from(
  { length: 256 },
  (_, byte) => `0x${byte.toString(16).padStart(2, '0').toUpperCase()}`
);

const indent = (depth: number): string => INDENTS[depth] ?? '  '.repeat(depth);

const compareStrings = (a: string, b: string): number => a.localeCompare(b);

const compareSymbols = (a: symbol, b: symbol): number =>
  String(a).localeCompare(String(b));

export const timeoutMessage = (ms: number): string =>
  `${format(`● Timeout: test file exceeded ${ms}ms limit`).fail().bold()}`;

export const serialize = (
  value: unknown,
  visited?: Set<object>,
  depth = 0
): string => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  const kind = typeof value;

  if (kind === 'string') return JSON.stringify(value);
  if (kind === 'number' || kind === 'boolean') return String(value);
  if (kind === 'object')
    return serializeObject(value as object, visited, depth);
  if (kind === 'bigint') return `${String(value)}n`;
  if (kind === 'symbol') return String(value);

  const name = (value as { name?: string }).name;
  return name ? `[Function ${name}]` : '[Function]';
};

const serializeObject = (
  value: object,
  visited: Set<object> | undefined,
  depth: number
): string => {
  const seen = visited ?? new Set<object>();

  if (seen.has(value)) return '[Circular]';

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
  const isPlainObject = prototype === proto || prototype === null;

  if (!isPlainObject) {
    if (value instanceof RegExp) return String(value);
    if (value instanceof Date) return value.toISOString();

    if (value instanceof Error)
      return `[${value.name || 'Error'}: ${value.message ?? ''}]`;

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
      let acc = `Buffer [\n${child}${BYTE_HEX[value[0]]}`;

      for (let index = 1; index < length; index++)
        acc += `${separator}${BYTE_HEX[value[index]]}`;

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
      const body =
        typeof typed[0] === 'bigint'
          ? `${arrayJoin.call(typed, `n${separator}`)}n`
          : arrayJoin.call(typed, separator);

      seen.delete(typed);
      return `${typeName} [\n${child}${body}\n${indent(depth)}]`;
    }

    if (value instanceof ArrayBuffer)
      return `ArrayBuffer { "byteLength": ${value.byteLength} }`;

    if (
      (value as { [Symbol.toStringTag]?: string })[Symbol.toStringTag] ===
      'Generator'
    )
      return 'Generator {}';
  }

  const toJSON = (value as { toJSON?: unknown }).toJSON;

  if (typeof toJSON === 'function') {
    seen.add(value);

    try {
      const replaced = (toJSON as (key?: string) => unknown).call(value, '');
      if (replaced !== value) return serialize(replaced, seen, depth);
    } catch {
    } finally {
      seen.delete(value);
    }
  }

  let constructorName: string | undefined;
  let isClassInstance = false;

  if (!isPlainObject) {
    constructorName = (value as { constructor?: { name?: string } }).constructor
      ?.name;
    isClassInstance =
      typeof constructorName === 'string' && constructorName !== 'Object';
  }

  const stringKeys = Object.keys(value);
  const symbolKeys = Object.getOwnPropertySymbols(value);
  const stringKeysLength = stringKeys.length;
  const symbolKeysLength = symbolKeys.length;

  if (stringKeysLength === 0 && symbolKeysLength === 0)
    return isClassInstance ? `${constructorName} {}` : '{}';

  stringKeys.sort(compareStrings);
  if (symbolKeysLength > 0) symbolKeys.sort(compareSymbols);

  const child = indent(depth + 1);
  const separator = `,\n${child}`;
  const record = value as Record<string | symbol, unknown>;

  seen.add(value);

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

  seen.delete(value);

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

  let acc = '';
  let offset = 0;

  while (offset < output.length) {
    const nextNewline = output.indexOf('\n', offset);
    const lineEnd = nextNewline === -1 ? output.length : nextNewline;

    if (lineEnd > offset) {
      const line = output.substring(offset, lineEnd);

      if (line.includes('◯') && line.includes(SKIP_MARKER)) results.skipped++;
      if (line.includes('●') && line.includes(TODO_MARKER)) results.todo++;

      if (isDebugOrFailed) {
        if (line.trim().length > 0)
          acc += acc.length === 0 ? `${pad}${line}` : `\n${pad}${line}`;
      } else if (
        line.includes(ANSI_RESET) &&
        line.indexOf('Exited with code') === -1
      ) {
        acc += acc.length === 0 ? `${pad}${line}` : `\n${pad}${line}`;
      }
    }

    offset = lineEnd + 1;
  }

  if (acc.length === 0) return;

  return acc;
};
