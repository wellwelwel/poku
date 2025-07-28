#! /usr/bin/env node
import { GLOBAL, states, VERSION } from '../configs/poku.js';
import { poku } from '../modules/essentials/poku.js';
import { envFile } from '../modules/helpers/env.js';
import { kill } from '../modules/helpers/kill.js';
import { escapeRegExp } from '../modules/helpers/list-files.js';
import { argToArray, getArg, getPaths, hasArg } from '../parsers/get-arg.js';
import { getConfigs } from '../parsers/options.js';
import { format } from '../services/format.js';
import { hr, log } from '../services/write.js';

(async () => {
  /* c8 ignore next 4 */ // Version is tested during build process: "../../tools/build/version.ts"
  if (hasArg('version') || hasArg('v', '-')) {
    log(VERSION);
    return;
  }

  if (hasArg('help') || hasArg('h', '-')) {
    (await import('./help.js')).help();
    return;
  }

  const enforce = hasArg('enforce') || hasArg('x', '-');
  const configFile = getArg('config') || getArg('c', '-');

  GLOBAL.configsFromFile = await getConfigs(configFile);

  const { configsFromFile } = GLOBAL;
  const dirs: string[] =
    getPaths('-') ??
    (configsFromFile?.include
      ? Array.prototype.concat(configsFromFile?.include)
      : ['.']);
  const filter = getArg('filter') ?? configsFromFile?.filter;
  const exclude = getArg('exclude') ?? configsFromFile?.exclude;
  const killPort = getArg('killPort');
  const killRange = getArg('killRange');
  const killPID = getArg('killPid');
  const reporter =
    getArg('reporter') ??
    getArg('r', '-') ??
    GLOBAL.configsFromFile.reporter ??
    'poku';
  /* c8 ignore start */ // Deno
  const denoAllow = argToArray('denoAllow') ?? configsFromFile?.deno?.allow;
  const denoDeny = argToArray('denoDeny') ?? configsFromFile?.deno?.deny;
  const denoCJS =
    getArg('denoCjs')
      ?.split(',')
      .map((a) => a.trim())
      .filter((a) => a) ||
    hasArg('denoCjs') ||
    configsFromFile?.deno?.cjs;
  /* c8 ignore stop */
  const quiet = hasArg('quiet') || hasArg('q', '-') || configsFromFile?.quiet;
  const debug = hasArg('debug') || hasArg('d', '-') || configsFromFile?.debug;
  const failFast = hasArg('failFast') || configsFromFile?.failFast;
  const watchMode = hasArg('watch') || hasArg('w', '-');
  const hasEnvFile = hasArg('envFile');
  const concurrency = (() => {
    const value = Number(getArg('concurrency'));
    return Number.isNaN(value) ? configsFromFile?.concurrency : value;
  })();
  const sequential = hasArg('sequential');

  if (dirs.length === 1) states.isSinglePath = true;

  if (hasArg('listFiles')) {
    const { listFiles } = await import('../modules/helpers/list-files.js');

    const files: string[] = [];

    hr();

    for (const dir of dirs)
      files.push(
        ...(await listFiles(dir, {
          filter:
            typeof filter === 'string'
              ? new RegExp(escapeRegExp(filter))
              : filter,
          exclude:
            typeof exclude === 'string'
              ? new RegExp(escapeRegExp(exclude))
              : exclude,
        }))
      );

    log(
      files
        .sort()
        .map((file) => `${format('-').dim()} ${file}`)
        .join('\n')
    );
    hr();
    log(`Total test files: ${format(String(files.length)).bold()}`);
    hr();

    return;
  }

  GLOBAL.configFile = configFile;
  GLOBAL.configs = {
    filter:
      typeof filter === 'string' ? new RegExp(escapeRegExp(filter)) : filter,
    exclude:
      typeof exclude === 'string' ? new RegExp(escapeRegExp(exclude)) : exclude,
    concurrency,
    sequential,
    quiet,
    debug,
    failFast,
    deno: {
      allow: denoAllow,
      deny: denoDeny,
      cjs: denoCJS,
    },
    noExit: watchMode,
    reporter,
    beforeEach:
      'beforeEach' in configsFromFile ? configsFromFile.beforeEach : undefined,
    afterEach:
      'afterEach' in configsFromFile ? configsFromFile.afterEach : undefined,
  };

  const tasks: Promise<unknown>[] = [];

  if (hasEnvFile || configsFromFile?.envFile) {
    GLOBAL.envFile = getArg('envFile') ?? configsFromFile?.envFile ?? '.env';
  }

  if (enforce) (await import('../services/enforce.js')).enforce();

  if (killPort || configsFromFile?.kill?.port) {
    const ports =
      killPort?.split(',').map(Number) || configsFromFile?.kill?.port || [];
    tasks.push(kill.port(ports));
  }

  if (killRange || configsFromFile?.kill?.range) {
    const ranges =
      killRange?.split(',') ||
      configsFromFile?.kill?.range?.map((range) => `${range[0]}-${range[1]}`) ||
      [];

    for (const range of ranges) {
      const ports = range.split('-').map(Number);
      const startsAt = ports[0];
      const endsAt = ports[1];
      tasks.push(kill.range(startsAt, endsAt));
    }
  }

  if (killPID || configsFromFile?.kill?.pid) {
    const PIDs =
      killPID?.split(',').map(Number) || configsFromFile?.kill?.pid || [];

    tasks.push(kill.pid(PIDs));
  }

  GLOBAL.envFile && tasks.push(envFile(GLOBAL.envFile));

  if (debug || configsFromFile?.debug) {
    hr();
    log(`${format(' Debug Enabled ').bg('brightBlue')}\n`);
    log(`${format('…').info().italic()} ${format('Options').bold()}`);
    console.dir(GLOBAL.configs, {
      depth: Number.POSITIVE_INFINITY,
      colors: true,
    });
    log(
      `\n${format('💡')} To list all test files, run: ${format('poku --listFiles').bold()}`
    );
  }

  await Promise.all(tasks);
  await poku(dirs);

  /* c8 ignore next 1 */ // Blocked by TSX
  if (watchMode) require('./watch.js').startWatch(dirs); // TODO: Replace with import()
})();
