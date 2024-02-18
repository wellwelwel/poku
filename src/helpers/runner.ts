import path from 'node:path';
import { getRuntime } from './get-runtime.js';
import { Configs } from '../@types/poku.js';

export const runner = (filename: string, configs?: Configs): string[] => {
  const runtime = getRuntime(configs);

  if (runtime === 'bun') return ['bun'];
  if (runtime === 'deno')
    return ['deno', 'run', '--allow-read', '--allow-env', '--allow-run'];
  return path.extname(filename) === '.ts' ? ['tsx'] : ['node'];
};
