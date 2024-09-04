import { fromEntries, entries } from '../polyfills/object.js';

const recurse = (value: unknown): unknown => {
  if (
    typeof value === 'undefined' ||
    typeof value === 'function' ||
    typeof value === 'bigint' ||
    typeof value === 'symbol' ||
    value instanceof RegExp
  )
    return String(value);
  if (Array.isArray(value)) return value.map(recurse);
  if (value instanceof Set) return Array.from(value).map(recurse);
  if (value instanceof Map) return recurse(fromEntries(value));
  if (value !== null && typeof value === 'object')
    return fromEntries(entries(value).map(([key, val]) => [key, recurse(val)]));

  return value;
};

export const parseResultType = (type?: unknown): string => {
  const result = recurse(type);

  return typeof result === 'string' ? result : JSON.stringify(result, null, 2);
};
