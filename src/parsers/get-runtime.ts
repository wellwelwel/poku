import { env } from 'node:process';
import { basename } from 'node:path';
import type { Runtime } from '../@types/poku.js';

export const getRuntime = (): Runtime => {
  const { _, POKU_RUNTIME } = env;

  if (POKU_RUNTIME) return POKU_RUNTIME as Runtime;

  // Unix
  if (typeof _ === 'string') {
    const bin = basename(_);

    if (bin.indexOf('bun') !== -1) return 'bun';
    if (bin.indexOf('deno') !== -1) return 'deno';
    if (bin.indexOf('node') !== -1 || bin.indexOf('tsx') !== -1) return 'node';
  }

  // Win32
  if (typeof Deno !== 'undefined') return 'deno';
  if (typeof Bun !== 'undefined') return 'bun';

  return 'node';
};
