import type { Runner } from '../@types/runner.js';
import { extname } from 'node:path';
import { GLOBAL } from '../configs/poku.js';
import { isWindows } from './os.js';

export const runner = (filename: string): string[] => {
  const { configs, runtime } = GLOBAL;

  if (runtime === 'bun') return ['bun'];

  if (runtime === 'deno') {
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
