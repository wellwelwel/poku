#! /usr/bin/env node

import type { Configs } from '../@types/poku.js';
import { escapeRegExp } from '../modules/helpers/list-files.js';
import { positionals, values } from '../parsers/get-arg.js';
import { states } from '../configs/files.js';
import { platformIsValid } from '../parsers/get-runtime.js';
import { format } from '../services/format.js';
import { kill } from '../modules/helpers/kill.js';
import { envFile } from '../modules/helpers/env.js';
import { poku } from '../modules/essentials/poku.js';
import { Write } from '../services/write.js';
import { getConfigs } from '../parsers/options.js';

const argToArray = (
  argValue: string | undefined,
): string[] | undefined => {
  if (argValue === undefined) return undefined;
  if (!argValue) return [];

  return argValue
    .split(',')
    .map((a) => a.trim())
    .filter((a) => a);
};

(async () => {
  if (values.version) {
    const { VERSION } = require('../configs/poku.js');

    Write.log(VERSION);
    return;
  }

  if (values.help) {
    const { help } = require('./help.js');

    help();

    return;
  }

  const enforce = values.enforce;
  const configFile = typeof values.config === 'boolean' ? undefined : values.config;
  const defaultConfigs = await getConfigs(configFile);
  const dirs = ((): string[] => {
    /* c8 ignore next 2 */ // Deprecated
    const includeArg = values.include;
    if (typeof includeArg === 'string') return includeArg.split(',');
    if (positionals.length > 0) return positionals;
    if (defaultConfigs?.include) return Array.prototype.concat(defaultConfigs?.include);
    return ['.'];
  })();
  const platform = values.platform;
  const filter = values.filter ?? defaultConfigs?.filter;
  const exclude = values.exclude ?? defaultConfigs?.exclude;
  const killPort = typeof values.killport === 'boolean' ? undefined : values.killport;
  const killRange = typeof values.killrange === 'boolean' ? undefined : values.killrange;
  const killPID = typeof values.killpid === 'boolean' ? undefined : values.killpid;
  /* c8 ignore start */ // Deno
  const denoAllow = argToArray(typeof values.denoallow === 'boolean' ? undefined : values.denoallow) ?? defaultConfigs?.deno?.allow;
  const denoDeny = argToArray(typeof values.denodeny === 'boolean' ? undefined : values.denodeny) ?? defaultConfigs?.deno?.deny;
  const denoCJS = argToArray(typeof values.denocjs === 'boolean' ? undefined : values.denocjs) ?? defaultConfigs?.deno?.cjs;
  /* c8 ignore stop */
  const parallel = !!values.parallel || defaultConfigs?.parallel;
  const quiet = !!values.quiet || defaultConfigs?.quiet;
  const debug = !!values.debug || defaultConfigs?.debug;
  const failFast = !!values.failfast || defaultConfigs?.failFast;
  const watchMode = !!values.watch;
  const hasEnvFile = values.envfile;
  const concurrency = (() => {
    if (!(parallel || defaultConfigs?.parallel)) return;

    const value = Number(values.concurrency);

    return Number.isNaN(value) ? defaultConfigs?.concurrency : value;
  })();

  if (dirs.length === 1) states.isSinglePath = true;

  if (values.listfiles) {
    const { listFiles } = require('../modules/helpers/list-files.js');

    const files: string[] = [];

    Write.hr();

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

  if (enforce) {
    const { checkFlags } = require('./enforce.js');

    checkFlags();
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
    const envFilePath = (typeof values.envfile === 'boolean' ? null : values.envfile) ?? defaultConfigs?.envFile;

    tasks.push(envFile(envFilePath));
  }

  const options: Configs = {
    /* c8 ignore next 11 */ // Varies Platform
    platform: (() => {
      if (platformIsValid(platform)) return platform;
      if (values.node) return 'node';
      if (values.bun) return 'bun';
      if (values.deno) return 'deno';
      if (platformIsValid(defaultConfigs?.platform)) return defaultConfigs?.platform;
      return undefined;
    })(),
    filter:
      typeof filter === 'string' ? new RegExp(escapeRegExp(filter)) : undefined,
    exclude:
      typeof exclude === 'string' ? new RegExp(escapeRegExp(exclude)) : undefined,
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
