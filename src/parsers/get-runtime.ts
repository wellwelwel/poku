import { env } from 'node:process';
import { basename } from 'node:path';
import type { Runtime } from '../@types/poku.js';

export const getRuntime = (): Runtime => {
  const { _, POKU_RUNTIME } = env;

  if (POKU_RUNTIME) return POKU_RUNTIME as Runtime;
  if (typeof _ === 'string') {
    const bin = basename(_);

    if (bin.indexOf('bun') !== -1) return 'bun';
    if (bin.indexOf('deno') !== -1) return 'deno';
  }

  return 'node';
};
