import type { Runtime } from '../@types/poku.js';
import { version, env } from 'node:process';

declare const Deno: unknown;
declare const Bun: unknown;

const regex = /v(\d+)\./;

export const supportedPlatforms: readonly Runtime[] = ['node', 'bun', 'deno'];

export const platformIsValid = (
  platform: unknown
): platform is (typeof supportedPlatforms)[number] =>
  typeof platform === 'string' &&
  supportedPlatforms.indexOf(platform as Runtime) > -1;

export const getRuntime = (): (typeof supportedPlatforms)[number] => {
  if (platformIsValid(env.POKU_RUNTIME)) return env.POKU_RUNTIME;
  if (typeof Deno !== 'undefined') return 'deno';
  if (typeof Bun !== 'undefined') return 'bun';

  return 'node';
};

export const nodeVersion =
  getRuntime() === 'node' ? Number(version.match(regex)?.[1]) : undefined;
