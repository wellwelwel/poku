/* c8 ignore next */ // ?
import { fromEntries, entries } from '../polyfills/object.js';
import { nodeVersion } from './get-runtime.js';

/* c8 ignore next */ // ?
export const parseResultType = (type?: unknown): string => {
  const recurse = (value: unknown): unknown => {
    if (
      typeof value === 'undefined' ||
      typeof value === 'function' ||
      typeof value === 'bigint' ||
      typeof value === 'symbol' ||
      value instanceof RegExp
    ) {
      return String(value);
    }

    if (Array.isArray(value)) {
      return value.map(recurse);
    }
    if (value instanceof Set) {
      return Array.from(value).map(recurse);
    }

    /* c8 ignore start */
    if (value instanceof Map) {
      return recurse(
        !nodeVersion || nodeVersion >= 12
          ? Object.fromEntries(value)
          : fromEntries(value)
      );
    }

    if (value !== null && typeof value === 'object') {
      if (!nodeVersion || nodeVersion >= 12) {
        return Object.fromEntries(
          Object.entries(value).map(([key, val]) => [key, recurse(val)])
        );
      }

      return fromEntries(
        entries(value).map(([key, val]) => [key, recurse(val)])
      );
    }
    /* c8 ignore stop */

    return value;
  };

  const result = recurse(type);

  return typeof result === 'string' ? result : JSON.stringify(result, null, 2);
};
