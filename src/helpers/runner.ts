import process from 'node:process';
import path from 'node:path';
import { getRuntime } from './get-runtime.js';
import { Configs } from '../@types/poku.js';
import { Runner } from '../@types/runner.js';

const isWindows = process.platform === 'win32';

export const runner = (filename: string, configs?: Configs): string[] => {
  const runtime = getRuntime(configs);

  // Bun
  if (runtime === 'bun') return ['bun'];

  // Deno
  if (runtime === 'deno')
    return ['deno', 'run', '--allow-read', '--allow-env', '--allow-run'];

  // Node.js
  return path.extname(filename) === '.ts'
    ? [isWindows ? 'npx.cmd' : 'npx', 'tsx']
    : ['node'];
};

export const scriptRunner = (runner: Runner): string[] => {
  // Bun
  if (runner === 'bun') return ['bun'];

  // Deno
  if (runner === 'deno') return ['deno', 'task'];

  // Yarn
  if (runner === 'yarn') return ['yarn'];

  // PNPM
  if (runner === 'pnpm') return ['pnpm', 'run'];

  // Node.js
  return ['npm', 'run'];
};
