import type { Configs } from '../@types/poku.js';
import type { Runner } from '../@types/runner.js';
import { platform } from 'node:process';
import { extname } from 'node:path';
import { getRuntime } from './get-runtime.js';

export const isWindows = platform === 'win32';

export const runner = (filename: string, configs?: Configs): string[] => {
  const runtime = getRuntime(configs);

  if (runtime === 'bun') {
    return ['bun'];
  }

  if (runtime === 'deno') {
    const denoAllow = configs?.deno?.allow
      ? configs.deno.allow
          .map((allow) => (allow ? `--allow-${allow}` : ''))
          .filter((allow) => allow)
      : [
          '--allow-read',
          '--allow-env',
          '--allow-run',
          '--allow-net',
          '--allow-hrtime',
        ];

    const denoDeny = configs?.deno?.deny
      ? configs.deno.deny
          .map((deny) => (deny ? `--deny-${deny}` : ''))
          .filter((deny) => deny)
      : [];

    return ['deno', 'run', ...denoAllow, ...denoDeny];
  }

  // Node.js
  return ['.ts', '.mts', '.cts'].includes(extname(filename))
    ? [isWindows ? 'npx.cmd' : 'npx', 'tsx']
    : ['node'];
};

export const scriptRunner = (runner: Runner): string[] => {
  if (runner === 'bun') {
    return ['bun', 'run'];
  }

  if (runner === 'deno') {
    return ['deno', 'task'];
  }

  if (runner === 'yarn') {
    return ['yarn'];
  }

  if (runner === 'pnpm') {
    return ['pnpm', 'run'];
  }

  return [isWindows ? 'npm.cmd' : 'npm', 'run'];
};
