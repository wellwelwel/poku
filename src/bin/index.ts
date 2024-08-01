#! /usr/bin/env node

import type { Configs } from '../@types/poku.js';
import process from 'node:process';
import { escapeRegExp } from '../modules/helpers/list-files.js';
import { getArg, getPaths, hasArg, argToArray } from '../parsers/get-arg.js';
import { fileResults, states } from '../configs/files.js';
import { platformIsValid } from '../parsers/get-runtime.js';
import { format } from '../services/format.js';
import { kill } from '../modules/helpers/kill.js';
import { envFile } from '../modules/helpers/env.js';
import { mapTests, normalizePath } from '../services/map-tests.js';
import { watch, type Watcher } from '../services/watch.js';
import { onSigint, poku } from '../modules/essentials/poku.js';
import { Write } from '../services/write.js';
import { getConfigs } from '../parsers/options.js';
import { availableParallelism } from '../polyfills/cpus.js';

(async () => {
  const configFile = getArg('config') || getArg('c', '-');
  const defaultConfigs = await getConfigs(configFile);

  const dirs: string[] = (() => {
    /* c8 ignore next 4 */ // Deprecated
    const includeArg = getArg('include');
    if (includeArg !== undefined) {
      return includeArg.split(',');
    }

    return (
      getPaths('-') ??
      (defaultConfigs?.include
        ? Array.prototype.concat(defaultConfigs?.include)
        : ['.'])
    );
  })();
  const platform = getArg('platform');
  const filter = getArg('filter') ?? defaultConfigs?.filter;
  const exclude = getArg('exclude') ?? defaultConfigs?.exclude;
  const killPort = getArg('kill-port');
  const killRange = getArg('kill-range');
  const killPID = getArg('kill-pid');
  /* c8 ignore start */ // Deno
  const denoAllow = argToArray('deno-allow') ?? defaultConfigs?.deno?.allow;
  const denoDeny = argToArray('deno-deny') ?? defaultConfigs?.deno?.deny;
  const denoCJS =
    getArg('deno-cjs')
      ?.split(',')
      .map((a) => a.trim())
      .filter((a) => a) ||
    hasArg('deno-cjs') ||
    defaultConfigs?.deno?.cjs;
  /* c8 ignore stop */
  const parallel =
    hasArg('parallel') || hasArg('p', '-') || defaultConfigs?.parallel;
  const quiet = hasArg('quiet') || hasArg('q', '-') || defaultConfigs?.quiet;
  const debug = hasArg('debug') || hasArg('d', '-') || defaultConfigs?.debug;
  const failFast = hasArg('fail-fast') || defaultConfigs?.failFast;
  const watchMode = hasArg('watch') || hasArg('w', '-');
  const hasEnvFile = hasArg('env-file');
  const concurrency = (() => {
    if (!(parallel || defaultConfigs?.parallel)) {
      return undefined;
    }

    const value = Number(getArg('concurrency'));

    return Number.isNaN(value) ? defaultConfigs?.concurrency : value;
  })();

  if (dirs.length === 1) {
    states.isSinglePath = true;
  }

  const tasks: Promise<unknown>[] = [];

  /* c8 ignore start */ // Process-based
  if (killPort || defaultConfigs?.kill?.port) {
    const ports =
      killPort?.split(',').map(Number) || defaultConfigs?.kill?.port || [];
    tasks.push(kill.port(ports));
  }

  if (killRange || defaultConfigs?.kill?.range) {
    const ranges =
      killRange?.split(',') ||
      defaultConfigs?.kill?.range?.map((range) => `${range[0]}-${range[1]}`) ||
      [];

    for (const range of ranges) {
      const ports = range.split('-').map(Number);
      const startsAt = ports[0];
      const endsAt = ports[1];
      tasks.push(kill.range(startsAt, endsAt));
    }
  }

  if (killPID || defaultConfigs?.kill?.pid) {
    const PIDs =
      killPID?.split(',').map(Number) || defaultConfigs?.kill?.pid || [];

    tasks.push(kill.pid(PIDs));
  }
  /* c8 ignore stop */

  if (hasEnvFile || defaultConfigs?.envFile) {
    const envFilePath = getArg('env-file') ?? defaultConfigs?.envFile;

    tasks.push(envFile(envFilePath));
  }

  const options: Configs = {
    /* c8 ignore next 11 */ // Varies Platform
    platform: platformIsValid(platform)
      ? platform
      : hasArg('node')
        ? 'node'
        : hasArg('bun')
          ? 'bun'
          : hasArg('deno')
            ? 'deno'
            : platformIsValid(defaultConfigs?.platform)
              ? defaultConfigs?.platform
              : undefined,
    filter:
      typeof filter === 'string' ? new RegExp(escapeRegExp(filter)) : filter,
    exclude:
      typeof exclude === 'string' ? new RegExp(escapeRegExp(exclude)) : exclude,
    parallel,
    concurrency,
    quiet,
    debug,
    failFast,
    deno: {
      allow: denoAllow,
      deny: denoDeny,
      cjs: denoCJS,
    },
    noExit: watchMode,
    beforeEach:
      'beforeEach' in defaultConfigs ? defaultConfigs.beforeEach : undefined,
    afterEach:
      'afterEach' in defaultConfigs ? defaultConfigs.afterEach : undefined,
  };

  if (debug || defaultConfigs?.debug) {
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

  /* c8 ignore start */ // Process-based
  const listenStdin = (input: Buffer | string) => {
    if (isRunning || executing.size > 0) {
      return;
    }

    if (String(input).trim() === 'rs') {
      for (const watcher of watchers) {
        watcher.stop();
      }

      watchers.clear();
      resultsClear();
      startTests();
    }
  };
  /* c8 ignore stop */

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
            /* c8 ignore next 2 */ // Process-based
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

                      poku(Array.from(tests), {
                        ...options,
                        concurrency:
                          concurrency ??
                          Math.max(Math.floor(availableParallelism() / 2), 1),
                      }).then(() => {
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

            /* c8 ignore next 2 */ // Process-based
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
})();
