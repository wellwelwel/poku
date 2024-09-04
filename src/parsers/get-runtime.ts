import type { Configs, Runtime } from '../@types/poku.js';
import { version } from 'node:process';

declare const Deno: unknown;
declare const Bun: unknown;

const regex = /v(\d+)\./;

export const supportedPlatforms: readonly Runtime[] = ['node', 'bun', 'deno'];

export const platformIsValid = (
  platform: unknown
): platform is (typeof supportedPlatforms)[number] =>
  typeof platform === 'string' &&
  supportedPlatforms.indexOf(platform as Runtime) > -1;

export const getRuntime = (
  configs?: Configs
): (typeof supportedPlatforms)[number] => {
  if (configs?.platform && platformIsValid(configs.platform))
    return configs.platform;
  if (typeof Deno !== 'undefined') return 'deno';
  if (typeof Bun !== 'undefined') return 'bun';

  return 'node';
};

export const nodeVersion =
  getRuntime() === 'node' ? Number(version.match(regex)?.[1]) : undefined;
