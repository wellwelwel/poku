import type { Runtime } from '../@types/poku.js';
import { version, env } from 'node:process';

declare const Deno: unknown;
declare const Bun: unknown;

const regex = /v(\d+)\./;

export const getRuntime = (): Runtime => {
  if (env.POKU_RUNTIME) return env.POKU_RUNTIME as Runtime;
  if (typeof Deno !== 'undefined') return 'deno';
  if (typeof Bun !== 'undefined') return 'bun';

  return 'node';
};

export const nodeVersion =
  getRuntime() === 'node' ? Number(version.match(regex)?.[1]) : undefined;
