import type { Configs } from '../@types/poku.js';

declare const Deno: unknown;
declare const Bun: unknown;

export const supportedPlatforms: ReadonlyArray<Configs['platform']> = [
  'node',
  'bun',
  'deno',
];

export const platformIsValid = (
  platform: unknown
): platform is (typeof supportedPlatforms)[number] => {
  if (
    typeof platform === 'string' &&
    supportedPlatforms.some(
      (supportedPlatform) => supportedPlatform === platform
    )
  )
    return true;
  return false;
};

export const getRuntime = (
  configs?: Configs
): (typeof supportedPlatforms)[number] => {
  if (configs?.platform && platformIsValid(configs.platform))
    return configs.platform;

  if (typeof Deno !== 'undefined') return 'deno';
  if (typeof Bun !== 'undefined') return 'bun';
  return 'node';
};
