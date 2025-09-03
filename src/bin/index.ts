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
  const coverageEnabled = hasArg('coverage') || typeof configsFromFile?.coverage === 'object';
  const coverageDir = getArg('coverageDir') ?? configsFromFile?.coverage?.dir ?? 'coverage';
  const coverageReports = argToArray('coverageReport') ?? configsFromFile?.coverage?.reports ?? ['text', 'html'];
  const hasEnvFile = hasArg('envFile');
  const concurrency = (() => {
    const value = Number(getArg('concurrency'));
    return Number.isNaN(value) ? configsFromFile?.concurrency : value;
  })();
  const sequential = hasArg('sequential');
  const sharedResources =
    hasArg('sharedResources') || configsFromFile?.sharedResources;

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
    sharedResources,
    noExit: watchMode || coverageEnabled,
    reporter,
    coverage: coverageEnabled ? { dir: coverageDir, reports: coverageReports } : undefined,
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

  const validateErrorImportCoveragec8 = (error: unknown) => {
    if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'message' in error &&
        (error as { code?: string; message?: string }).code === 'MODULE_NOT_FOUND' &&
        (error as { message?: string }).message?.includes('@pokujs/c8')
      ) {
        console.error(`❌ Optional module "@pokujs/c8" not found. Install it to enable code coverage: npm install --save-dev @pokujs/c8`);
        process.exit(1);
      } else {
        throw error;
      }
  }

  //TODO: add support for command --coverage=c8
  if(coverageEnabled) {
    try {
      await require('@pokujs/c8').coverageStart(coverageDir);
    } catch (error: unknown) {
      validateErrorImportCoveragec8(error);
    }
  }

  const code = await poku(dirs);

  //TODO: add support for command --coverage=c8
  if(coverageEnabled) {
    try {
      await require('@pokujs/c8').coverageReport(coverageReports);
    } catch (error: unknown) {
      validateErrorImportCoveragec8(error);
    }
  }

  if(coverageEnabled && !watchMode) {
    require('../modules/helpers/exit.js').exit(code, GLOBAL.configs.quiet);
  }

  /* c8 ignore next 1 */ // Blocked by TSX
  if (watchMode) require('./watch.js').startWatch(dirs); // TODO: Replace with import()
})();
