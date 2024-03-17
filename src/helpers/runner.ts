import process from 'node:process';
import path from 'node:path';
import { getRuntime } from './get-runtime.js';
import { Configs } from '../@types/poku.js';
import { Runner } from '../@types/runner.js';

export const isWindows = process.platform === 'win32';

export const runner = (filename: string, configs?: Configs): string[] => {
  const runtime = getRuntime(configs);

  // Bun
  if (runtime === 'bun') return ['bun'];

  // Deno
  if (runtime === 'deno')
    return [
      'deno',
      'run',
      '--allow-read', // Poku searches for all test files
      '--allow-env', // Poku share the process.env with the `child_process`
      '--allow-run', // Poku CLI
      '--allow-net', // Create Service
    ];

  // Node.js
  return path.extname(filename) === '.ts'
    ? [isWindows ? 'npx.cmd' : 'npx', 'tsx']
    : ['node'];
};

export const scriptRunner = (runner: Runner): string[] => {
  // Bun
  if (runner === 'bun') return ['bun', 'run'];

  // Deno
  if (runner === 'deno') return ['deno', 'task'];

  // Yarn
  if (runner === 'yarn') return ['yarn'];

  // PNPM
  if (runner === 'pnpm') return ['pnpm', 'run'];

  // Node.js
  return [isWindows ? 'npm.cmd' : 'npm', 'run'];
};
