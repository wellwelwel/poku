#! /usr/bin/env node

/* c8 ignore start */

import { escapeRegExp } from '../modules/list-files.js';
import {
  getArg,
  getLastParam,
  hasArg,
  argToArray,
} from '../helpers/get-arg.js';
import { poku } from '../modules/poku.js';
import { kill } from '../modules/processes.js';
import { platformIsValid } from '../helpers/get-runtime.js';
import { format } from '../helpers/format.js';
import { write } from '../helpers/logs.js';
import type { Configs } from '../@types/poku.js';
import { hr } from '../helpers/hr.js';

(async () => {
  const dirs = (() => {
    const includeArg = getArg('include');
    if (includeArg !== undefined) return includeArg.split(',');

    const lastParam = getLastParam();
    if (lastParam !== undefined) return lastParam.split(',');

    return ['.'];
  })();

  const platform = getArg('platform');
  const filter = getArg('filter');
  const exclude = getArg('exclude');
  const killPort = getArg('kill-port');
  const killRange = getArg('kill-range');
  const killPID = getArg('kill-pid');
  const denoAllow = argToArray('deno-allow');
  const denoDeny = argToArray('deno-deny');
  const denoCJS =
    getArg('deno-cjs')
      ?.split(',')
      .map((a) => a.trim())
      .filter((a) => a) || hasArg('deno-cjs');

  const parallel = hasArg('parallel');
  const quiet = hasArg('quiet');
  const debug = hasArg('debug');
  const failFast = hasArg('fail-fast');

  const concurrency = parallel
    ? Number(getArg('concurrency')) || undefined
    : undefined;

  if (killPort) {
    const ports = killPort.split(',').map(Number);

    await kill.port(ports);
  }

  if (killRange) {
    const ranges = killRange.split(',');

    for (const range of ranges) {
      const ports = range.split('-').map(Number);

      const startsAt = ports[0];
      const endsAt = ports[1];

      await kill.range(startsAt, endsAt);
    }
  }

  if (killPID) {
    const PIDs = killPID.split(',').map(Number);

    await kill.pid(PIDs);
  }

  const options: Configs = {
    platform: platformIsValid(platform) ? platform : undefined,
    filter: filter ? new RegExp(escapeRegExp(filter)) : undefined,
    exclude: exclude ? new RegExp(escapeRegExp(exclude)) : undefined,
    parallel,
    quiet,
    debug,
    failFast,
    concurrency,
    deno: {
      allow: denoAllow,
      deny: denoDeny,
      cjs: denoCJS,
    },
  };

  if (debug) {
    hr();
    write(`${format.bg(104, 'Debug Enabled')}\n`);
    write(`${format.italic(format.info('…'))} ${format.bold('Paths')}`);
    console.table(dirs);
    write('\n');
    write(`${format.italic(format.info('…'))} ${format.bold('Options')}`);
    console.dir(options, { depth: null, colors: true });
  }

  poku(dirs, options);
})();

/* c8 ignore stop */
