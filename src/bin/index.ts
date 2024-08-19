#! /usr/bin/env node

import type { Configs } from '../@types/poku.js';
import { escapeRegExp } from '../modules/helpers/list-files.js';
import { getArg, getPaths, hasArg, argToArray } from '../parsers/get-arg.js';
import { states } from '../configs/files.js';
import { platformIsValid } from '../parsers/get-runtime.js';
import { format } from '../services/format.js';
import { kill } from '../modules/helpers/kill.js';
import { envFile } from '../modules/helpers/env.js';
import { poku } from '../modules/essentials/poku.js';
import { Write } from '../services/write.js';
import { getConfigs } from '../parsers/options.js';

(async () => {
  if (hasArg('version') || hasArg('v', '-')) {
    const { VERSION } = require('../configs/poku.js');

    Write.log(VERSION);
    return;
  }

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
  const killPort = getArg('killport');
  const killRange = getArg('killrange');
  const killPID = getArg('killpid');
  /* c8 ignore start */ // Deno
  const denoAllow = argToArray('denoallow') ?? defaultConfigs?.deno?.allow;
  const denoDeny = argToArray('denodeny') ?? defaultConfigs?.deno?.deny;
  const denoCJS =
    getArg('denocjs')
      ?.split(',')
      .map((a) => a.trim())
      .filter((a) => a) ||
    hasArg('denocjs') ||
    defaultConfigs?.deno?.cjs;
  /* c8 ignore stop */
  const parallel =
    hasArg('parallel') || hasArg('p', '-') || defaultConfigs?.parallel;
  const quiet = hasArg('quiet') || hasArg('q', '-') || defaultConfigs?.quiet;
  const debug = hasArg('debug') || hasArg('d', '-') || defaultConfigs?.debug;
  const failFast = hasArg('failfast') || defaultConfigs?.failFast;
  const watchMode = hasArg('watch') || hasArg('w', '-');
  const hasEnvFile = hasArg('envfile');
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

  if (hasArg('listfiles')) {
    const { listFiles } = require('../modules/helpers/list-files.js');

    const files: string[] = [];

    Write.hr();

    for (const dir of dirs) {
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
    }

    Write.log(
      files
        .sort()
        .map((file) => `${format('-').dim()} ${file}`)
        .join('\n')
    );
    Write.hr();
    Write.log(`Total test files: ${format(String(files.length)).bold()}`);
    Write.hr();

    return;
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
    const envFilePath = getArg('envfile') ?? defaultConfigs?.envFile;

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

  await Promise.all(tasks);
  await poku(dirs, options);

  if (watchMode) {
    const { startWatch } = require('./watch.js');

    await startWatch(dirs, options);
  }
})();
