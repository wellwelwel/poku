#! /usr/bin/env node

import type { Configs } from '../@types/poku.js';
import process from 'node:process';
import { escapeRegExp } from '../modules/helpers/list-files.js';
import {
  getArg,
  getLastParam,
  hasArg,
  argToArray,
} from '../parsers/get-arg.js';
import { fileResults } from '../configs/files.js';
import { platformIsValid } from '../parsers/get-runtime.js';
import { format } from '../services/format.js';
import { kill } from '../modules/helpers/kill.js';
import { mapTests, normalizePath } from '../services/map-tests.js';
import { watch, type Watcher } from '../services/watch.js';
import { onSigint, poku } from '../modules/essentials/poku.js';
import { Write } from '../services/write.js';

const dirs = (() => {
  const includeArg = getArg('include');
  if (includeArg !== undefined) {
    return includeArg.split(',');
  }

  const lastParam = getLastParam();
  if (lastParam !== undefined) {
    return lastParam.split(',');
  }

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
const watchMode = hasArg('watch');

const concurrency = parallel
  ? Number(getArg('concurrency')) || undefined
  : undefined;

const tasks: Promise<unknown>[] = [];

if (killPort) {
  const ports = killPort.split(',').map(Number);
  tasks.push(kill.port(ports));
}

if (killRange) {
  const ranges = killRange.split(',');

  for (const range of ranges) {
    const ports = range.split('-').map(Number);
    const startsAt = ports[0];
    const endsAt = ports[1];
    tasks.push(kill.range(startsAt, endsAt));
  }
}

if (killPID) {
  const PIDs = killPID.split(',').map(Number);
  tasks.push(kill.pid(PIDs));
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
  noExit: watchMode,
  deno: {
    allow: denoAllow,
    deny: denoDeny,
    cjs: denoCJS,
  },
};

if (debug) {
  Write.hr();
  Write.log(`${format(' Debug Enabled ').bg('brightBlue')}\n`);
  Write.log(`${format('…').info().italic()} ${format('Paths').bold()}`);
  console.table(dirs);
  Write.log('\n');
  Write.log(`${format('…').info().italic()} ${format('Options').bold()}`);
  console.dir(options, { depth: null, colors: true });
}

const watchers: Set<Watcher> = new Set();
const executing = new Set<string>();
const interval = Number(getArg('watch-interval')) || 1500;

let isRunning = false;

const listenStdin = (input: Buffer | string) => {
  if (isRunning || executing.size > 0) {
    return;
  }

  if (String(input).trim() === 'rs') {
    watchers.forEach((watcher) => watcher.stop());
    watchers.clear();
    resultsClear();
    startTests();
  }
};

const resultsClear = () => {
  fileResults.success.clear();
  fileResults.fail.clear();
};

const startTests = () => {
  if (isRunning || executing.size > 0) {
    return;
  }

  isRunning = true;

  Promise.all(tasks).then(() => {
    poku(dirs, options)
      .then(() => {
        if (watchMode) {
          process.stdin.removeListener('data', listenStdin);
          process.removeListener('SIGINT', onSigint);
          resultsClear();

          mapTests('.', dirs, options.filter, options.exclude).then(
            (mappedTests) => {
              for (const mappedTest of Array.from(mappedTests.keys())) {
                const currentWatcher = watch(mappedTest, (file, event) => {
                  if (event === 'change') {
                    const filePath = normalizePath(file);
                    if (executing.has(filePath)) {
                      return;
                    }

                    executing.add(filePath);
                    resultsClear();

                    const tests = mappedTests.get(filePath);
                    if (!tests) {
                      return;
                    }

                    poku(Array.from(tests), options).then(() => {
                      setTimeout(() => {
                        executing.delete(filePath);
                      }, interval);
                    });
                  }
                });

                currentWatcher.then((watcher) => watchers.add(watcher));
              }
            }
          );

          for (const dir of dirs) {
            const currentWatcher = watch(dir, (file, event) => {
              if (event === 'change') {
                if (executing.has(file)) {
                  return;
                }

                executing.add(file);
                resultsClear();

                poku(file, options).then(() => {
                  setTimeout(() => {
                    executing.delete(file);
                  }, interval);
                });
              }
            });

            currentWatcher.then((watcher) => watchers.add(watcher));
          }

          Write.hr();
          Write.log(
            `${format('Watching:').bold()} ${format(dirs.join(', ')).underline()}`
          );

          process.stdin.setEncoding('utf-8');
          process.stdin.on('data', listenStdin);
        }
      })
      .finally(() => {
        isRunning = false;
      });
  });
};

startTests();
