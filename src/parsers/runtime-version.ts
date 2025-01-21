import { version } from 'node:process';
import { GLOBAL } from '../configs/poku.js';

export const runtimeVersion: number = (() => {
  if (GLOBAL.runtime === 'bun') return Number(Bun.version.split('.')[0]);
  if (GLOBAL.runtime === 'deno') return Number(Deno.version.deno.split('.')[0]);
  return Number(version.replace('v', '').split('.')[0]);
})();
