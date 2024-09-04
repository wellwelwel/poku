import type { Configs, Runtime } from '../@types/poku.js';
import type { Runner } from '../@types/runner.js';
import { platform } from 'node:process';
import { extname } from 'node:path';
import { getRuntime } from './get-runtime.js';

export const isWindows = platform === 'win32';

export const runner = (filename: string, configs?: Configs): string[] => {
  const command: Record<Runtime, () => string[]> = {
    node: () =>
      ['.ts', '.mts', '.cts'].includes(extname(filename))
        ? [isWindows ? 'npx.cmd' : 'npx', 'tsx']
        : ['node'],
    bun: () => ['bun'],
    deno: () => {
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
    },
  };

  return command[getRuntime(configs)]() ?? command['node' as Runtime]();
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
