import { env, cwd } from 'node:process';
import type { Configs } from '../@types/poku.js';

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
  runAsOnly: false,
  isPoku: typeof env?.POKU_FILE === 'string' && env?.POKU_FILE.length > 0,
  FILE: env.POKU_FILE,
  options: Object.create(null) as Configs,
  configFile: undefined as string | undefined,
  envFile: undefined as string | undefined,
};
