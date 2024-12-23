import { env, cwd } from 'node:process';
import type { ConfigFile, ConfigJSONFile, Configs } from '../@types/poku.js';

export const results = {
  success: 0,
  fail: 0,
  skip: 0,
  todo: 0,
};

export const VERSION = '';

export const deepOptions: string[] = [];

export const GLOBAL = {
  cwd: cwd(),
  configs: Object.create(null) as Configs,
  configFile: undefined as string | undefined,
  configsFromFile: Object.create(null) as ConfigFile | ConfigJSONFile,
  isPoku: typeof env?.POKU_FILE === 'string' && env?.POKU_FILE.length > 0,
  FILE: env.POKU_FILE,
  envFile: undefined as string | undefined,
  runAsOnly: false,
};
