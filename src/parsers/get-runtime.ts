import type { Runtime } from '../@types/poku.js';

export const getRuntime = (): Runtime => {
  if (typeof Deno !== 'undefined') return 'deno';
  if (typeof Bun !== 'undefined') return 'bun';
  return 'node';
};
