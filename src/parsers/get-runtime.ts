import type { Runtime } from '../@types/poku.js';
import { env } from 'node:process';

export const getRuntime = (): Runtime => {
  if (env.POKU_RUNTIME) return env.POKU_RUNTIME as Runtime;
  if (typeof Deno !== 'undefined') return 'deno';
  if (typeof Bun !== 'undefined') return 'bun';
  return 'node';
};
