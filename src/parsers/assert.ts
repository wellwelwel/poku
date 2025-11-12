import { serialize } from './output.js';

export const parseResultType = (type?: unknown): string => {
  const result = serialize(type);

  return typeof result === 'string' ? result : JSON.stringify(result, null, 2);
};
