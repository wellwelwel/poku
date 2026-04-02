import type { Runner } from '../@types/runner.js';
import { extname } from 'node:path';
import { GLOBAL } from '../configs/poku.js';
import { isWindows } from './os.js';

const runnerCache = new Map<string, string[]>();

export const runner = (filename: string): string[] => {
  const { configs, runtime } = GLOBAL;
  const ext = extname(filename);
  const cacheKey = `${runtime}:${ext}`;

  const cached = runnerCache.get(cacheKey);
  if (cached) return cached.slice();

  let result: string[];

  if (runtime === 'bun') {
    result = ['bun'];
  } else if (runtime === 'deno') {
    const denoAllow = configs.deno?.allow
      ? configs.deno.allow
          .map((allow) => (allow ? `--allow-${allow}` : ''))
          .filter((allow) => allow)
      : ['--allow-read', '--allow-env', '--allow-run', '--allow-net'];

    const denoDeny = configs.deno?.deny
      ? configs.deno.deny
          .map((deny) => (deny ? `--deny-${deny}` : ''))
          .filter((deny) => deny)
      : [];

    result = ['deno', 'run', ...denoAllow, ...denoDeny];
  } else {
    // Node.js
    result =
      ext === '.ts' || ext === '.mts' || ext === '.cts'
        ? ['node', '--import=tsx']
        : ['node'];
  }

  runnerCache.set(cacheKey, result);
  return result.slice();
};

const SCRIPT_COMMANDS: Record<Runner, readonly string[]> = {
  npm: [isWindows ? 'npm.cmd' : 'npm', 'run'],
  bun: ['bun', 'run'],
  deno: ['deno', 'task'],
  yarn: ['yarn'],
  pnpm: ['pnpm', 'run'],
};

export const scriptRunner = (runner: Runner): string[] => [
  ...(SCRIPT_COMMANDS[runner] ?? SCRIPT_COMMANDS.npm),
];
