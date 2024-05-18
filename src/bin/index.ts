#! /usr/bin/env node

/* c8 ignore start */
import { escapeRegExp } from '../modules/list-files.js';
import { getArg, getLastParam, hasArg } from '../helpers/get-arg.js';
import { kill, poku } from '../index.js';
import { platformIsValid } from '../helpers/get-runtime.js';
import { format } from '../helpers/format.js';

const dirs =
  (hasArg('include')
    ? getArg('include')?.split(',')
    : getLastParam()?.split(',')) || [];
const platform = getArg('platform');
const filter = getArg('filter');
const exclude = getArg('exclude');
const killPort = getArg('kill-port');
const killRange = getArg('kill-range');
const killPID = getArg('kill-pid');
const concurrency = Number(getArg('concurrency')) || undefined;
const parallel = hasArg('parallel');
const quiet = hasArg('quiet');
const debug = hasArg('debug');
const failFast = hasArg('fail-fast');

if (hasArg('log-success'))
  console.log(
    `The flag ${format.bold('--log-success')} is deprecated. Use ${format.bold('--debug')} instead.`
  );

(async () => {
  if (killPort) {
    const ports = killPort.split(',').map((port) => Number(port));

    await kill.port(ports);
  }

  if (killRange) {
    const ranges = killRange.split(',');

    for (const range of ranges) {
      const ports = range.split('-').map((port) => Number(port));

      const startsAt = ports[0];
      const endsAt = ports[1];

      await kill.range(startsAt, endsAt);
    }
  }

  if (killPID) {
    const PIDs = killPID.split(',').map((port) => Number(port));

    await kill.pid(PIDs);
  }

  await poku(dirs, {
    platform: platformIsValid(platform) ? platform : undefined,
    filter: filter ? new RegExp(escapeRegExp(filter)) : undefined,
    exclude: exclude ? new RegExp(escapeRegExp(exclude)) : undefined,
    parallel,
    quiet,
    debug,
    failFast,
    concurrency,
  });
})();

/* c8 ignore stop */
