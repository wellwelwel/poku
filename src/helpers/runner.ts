import path from 'node:path';
import { getRuntime } from './get-runtime.js';

const runtime = getRuntime();

export const runner = (filename: string): string[] => {
  if (runtime === 'bun') return ['bun'];
  if (runtime === 'deno')
    return ['deno', 'run', '--allow-read', '--allow-env', '--allow-run'];
  return path.extname(filename) === '.ts' ? ['tsx'] : ['node'];
};
