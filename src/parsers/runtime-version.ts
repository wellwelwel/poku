import { version } from 'node:process';
import { getRuntime } from './get-runtime.js';

const regex = /v(\d+)\./;

export const runtimeVersion = (() => {
  const runtime = getRuntime();

  if (runtime === 'node') return Number(version.match(regex)?.[1]) || undefined;

  if (runtime === 'deno')
    return Number(Deno.version.deno.split('.')[0]) || undefined;
})();
