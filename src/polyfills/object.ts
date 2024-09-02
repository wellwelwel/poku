import { nodeVersion } from '../parsers/get-runtime.js';

const needsPolyfill = !nodeVersion || nodeVersion >= 12;

export const entries = needsPolyfill
  ? (obj: { [key: string]: any }): [string, unknown][] => {
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      const resArray = new Array(i);

      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

      return resArray;
    }
  : Object.entries;

export const fromEntries = needsPolyfill
  ? (
      entries: [string, unknown][] | Map<string, unknown>
    ): Record<string, unknown> => {
      const mappedEntries =
        entries instanceof Map ? Array.from(entries) : entries;

      return mappedEntries.reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, unknown>
      );
    }
  : Object.fromEntries;
