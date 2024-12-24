import { env, platform } from 'node:process';
import { basename } from 'node:path';
import { execSync } from 'node:child_process';
import type { Runtime } from '../@types/poku.js';

export const getRuntime = (): Runtime => {
  const { _, POKU_RUNTIME } = env;

  if (POKU_RUNTIME) return POKU_RUNTIME as Runtime;

  if (platform !== 'win32') {
    if (typeof _ === 'string') {
      const bin = basename(_);

      if (bin.indexOf('bun') !== -1) return 'bun';
      if (bin.indexOf('deno') !== -1) return 'deno';
    }

    return 'node';
  }

  const cmd = execSync(
    `wmic process where (processid=${process.ppid}) get Commandline`,
    { stdio: 'pipe' }
  ).toString();

  if (cmd.indexOf(' bun ') !== -1) return 'bun';
  if (cmd.indexOf(' deno ') !== -1) return 'deno';

  return 'node';
};
