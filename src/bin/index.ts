#! /usr/bin/env node
import { escapeRegExp } from '../modules/helpers/list-files.js';
import { getArg, getPaths, hasArg, argToArray } from '../parsers/get-arg.js';
import { states } from '../configs/files.js';
import { format } from '../services/format.js';
import { kill } from '../modules/helpers/kill.js';
import { envFile } from '../modules/helpers/env.js';
import { poku } from '../modules/essentials/poku.js';
import { log, hr } from '../services/write.js';
import { getConfigs } from '../parsers/options.js';
import { GLOBAL, VERSION } from '../configs/poku.js';

(async () => {
  if (hasArg('version') || hasArg('v', '-')) {
    log(VERSION);
    return;
  }

  if (hasArg('help') || hasArg('h', '-')) {
    require('./help.js').help();
    return;
  }

  const enforce = hasArg('enforce') || hasArg('x', '-');
  const configFile = getArg('config') || getArg('c', '-');

  GLOBAL.defaultConfigs = await getConfigs(configFile);
  const { defaultConfigs } = GLOBAL;

  const dirs: string[] =
    getPaths('-') ??
    (defaultConfigs?.include
      ? Array.prototype.concat(defaultConfigs?.include)
      : ['.']);
  const filter = getArg('filter') ?? defaultConfigs?.filter;
  const exclude = getArg('exclude') ?? defaultConfigs?.exclude;
  const killPort = getArg('killPort');
  const killRange = getArg('killRange');
  const killPID = getArg('killPid');
  /* c8 ignore start */ // Deno
  const denoAllow = argToArray('denoAllow') ?? defaultConfigs?.deno?.allow;
  const denoDeny = argToArray('denoDeny') ?? defaultConfigs?.deno?.deny;
  const denoCJS =
    getArg('denoCjs')
      ?.split(',')
      .map((a) => a.trim())
      .filter((a) => a) ||
    hasArg('denoCjs') ||
    defaultConfigs?.deno?.cjs;
  /* c8 ignore stop */
  const quiet = hasArg('quiet') || hasArg('q', '-') || defaultConfigs?.quiet;
  const debug = hasArg('debug') || hasArg('d', '-') || defaultConfigs?.debug;
  const failFast = hasArg('failFast') || defaultConfigs?.failFast;
  const watchMode = hasArg('watch') || hasArg('w', '-');
  const hasEnvFile = hasArg('envFile');
  const concurrency = (() => {
    const value = Number(getArg('concurrency'));
    return Number.isNaN(value) ? defaultConfigs?.concurrency : value;
  })();
  const sequential = hasArg('sequential');

  if (dirs.length === 1) states.isSinglePath = true;

  if (hasArg('listFiles')) {
    const { listFiles } = require('../modules/helpers/list-files.js');

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
  GLOBAL.options = {
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
    beforeEach:
      'beforeEach' in defaultConfigs ? defaultConfigs.beforeEach : undefined,
    afterEach:
      'afterEach' in defaultConfigs ? defaultConfigs.afterEach : undefined,
  };

  const tasks: Promise<unknown>[] = [];

  if (hasEnvFile || defaultConfigs?.envFile) {
    GLOBAL.envFile = getArg('envFile') ?? defaultConfigs?.envFile ?? '.env';
  }

  if (enforce) require('../services/enforce.js').enforce();

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

  GLOBAL.envFile && tasks.push(envFile(GLOBAL.envFile));

  if (debug || defaultConfigs?.debug) {
    hr();
    log(`${format(' Debug Enabled ').bg('brightBlue')}\n`);
    log(`${format('…').info().italic()} ${format('Paths').bold()}`);
    console.table(dirs);
    log('\n');
    log(`${format('…').info().italic()} ${format('Options').bold()}`);
    console.dir(GLOBAL.options, { depth: null, colors: true });
  }

  await Promise.all(tasks);
  await poku(dirs, GLOBAL.options);

  if (watchMode) await require('./watch.js').startWatch(dirs, GLOBAL.options);
})();
