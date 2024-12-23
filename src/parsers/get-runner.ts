import type { Runner } from '../@types/runner.js';
import { platform } from 'node:process';
import { extname } from 'node:path';
import { getRuntime } from './get-runtime.js';
import { GLOBAL } from '../configs/poku.js';

export const isWindows = platform === 'win32';

export const runner = (filename: string): string[] => {
  const runtime = getRuntime();

  if (runtime === 'bun') return ['bun'];

  if (runtime === 'deno') {
    const denoAllow = GLOBAL.configs.deno?.allow
      ? GLOBAL.configs.deno.allow
          .map((allow) => (allow ? `--allow-${allow}` : ''))
          .filter((allow) => allow)
      : ['--allow-read', '--allow-env', '--allow-run', '--allow-net'];

    const denoDeny = GLOBAL.configs.deno?.deny
      ? GLOBAL.configs.deno.deny
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
  const commands: Record<Runner, string[]> = {
    npm: [isWindows ? 'npm.cmd' : 'npm', 'run'],
    bun: ['bun', 'run'],
    deno: ['deno', 'task'],
    yarn: ['yarn'],
    pnpm: ['pnpm', 'run'],
  } as const;

  return commands?.[runner] ?? commands['npm' as Runner];
};
