#! /usr/bin/env node
import { env, exit } from 'node:process';
import { GLOBAL, states, VERSION } from '../configs/poku.js';
import { poku } from '../modules/essentials/poku.js';
import { envFile } from '../modules/helpers/env.js';
import { kill } from '../modules/helpers/kill.js';
import { toRegExp } from '../parsers/escape-regexp.js';
import {
  argToArray,
  getArg,
  getPaths,
  hasArg,
  numericArg,
} from '../parsers/get-arg.js';
import { getConfigs } from '../parsers/options.js';
import { format } from '../services/format.js';
import { hr, log } from '../services/write.js';

(async () => {
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
  const denoAllow = argToArray('denoAllow') ?? configsFromFile?.deno?.allow;
  const denoDeny = argToArray('denoDeny') ?? configsFromFile?.deno?.deny;
  const quiet = hasArg('quiet') || hasArg('q', '-') || configsFromFile?.quiet;
  const debug = hasArg('debug') || hasArg('d', '-') || configsFromFile?.debug;
  const failFast = hasArg('failFast') || configsFromFile?.failFast;
  const watchMode = hasArg('watch') || hasArg('w', '-');
  const hasEnvFile = hasArg('envFile');
  const concurrency = numericArg('concurrency', configsFromFile?.concurrency);
  const timeout = numericArg('timeout', configsFromFile?.timeout);
  const sequential = hasArg('sequential') || configsFromFile?.sequential;
  const isolation = getArg('isolation') || configsFromFile?.isolation;
  const testNamePattern =
    getArg('testNamePattern') ??
    getArg('t', '-') ??
    configsFromFile?.testNamePattern;
  const testSkipPattern =
    getArg('testSkipPattern') ?? configsFromFile?.testSkipPattern;

  if (dirs.length === 1) states.isSinglePath = true;

  if (hasArg('listFiles')) {
    const { listFiles } = await import('../modules/helpers/list-files.js');

    const files: string[] = [];

    hr();

    for (const dir of dirs)
      files.push(
        ...(await listFiles(dir, {
          filter: toRegExp(filter),
          exclude: toRegExp(exclude),
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

  env.POKU_RUNTIME = GLOBAL.runtime;
  env.POKU_REPORTER = typeof reporter === 'string' ? reporter : 'poku';

  GLOBAL.configs = {
    filter: toRegExp(filter),
    exclude: toRegExp(exclude),
    concurrency,
    timeout,
    sequential,
    isolation,
    quiet,
    debug,
    failFast,
    deno: {
      allow: denoAllow,
      deny: denoDeny,
    },
    noExit: watchMode,
    reporter,
    testNamePattern: toRegExp(testNamePattern),
    testSkipPattern: toRegExp(testSkipPattern),
    beforeEach:
      'beforeEach' in configsFromFile ? configsFromFile.beforeEach : undefined,
    afterEach:
      'afterEach' in configsFromFile ? configsFromFile.afterEach : undefined,
    plugins: 'plugins' in configsFromFile ? configsFromFile.plugins : undefined,
  };

  if (hasArg('coverage')) {
    const customPkg = getArg('coverage');
    if (
      customPkg &&
      !/^(@[a-z0-9][a-z0-9-_.]*\/)?[a-z0-9][a-z0-9-_.]*$/i.test(customPkg)
    ) {
      log('Coverage plugin must be a valid package name.');
      exit(1);
    }

    const coveragePackages = customPkg
      ? [customPkg]
      : [
          '@pokujs/c8',
          '@pokujs/monocart',
          '@pokujs/one-double-zero',
          '@pokujs/istanbul',
          '@pokujs/coverage',
        ];

    const existingPlugins = GLOBAL.configs.plugins ?? [];
    const alreadyHasCoverage = existingPlugins.some(
      (plugin) =>
        plugin.name !== undefined && coveragePackages.includes(plugin.name)
    );

    if (!alreadyHasCoverage) {
      let loaded = false;

      for (const pkg of coveragePackages) {
        try {
          const { coverage } = await import(pkg);

          GLOBAL.configs.plugins = existingPlugins;
          GLOBAL.configs.plugins.push(coverage());

          loaded = true;
          break;
        } catch {}
      }

      if (!loaded) {
        hr();
        log(
          customPkg
            ? `Coverage plugin not found: ${format(customPkg).bold()}`
            : `To use ${format('--coverage').bold()}, install a coverage plugin, for example:\n\n${coveragePackages.map((pkg) => `  ${format('npm i -D').dim()} ${format(pkg).underline()}`).join('\n')}`
        );
        hr();
        exit(1);
      }
    }
  }

  if (typeof testNamePattern === 'string')
    env.POKU_TEST_NAME_PATTERN = testNamePattern;
  if (typeof testSkipPattern === 'string')
    env.POKU_TEST_SKIP_PATTERN = testSkipPattern;

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

  if (watchMode)
    import('./watch.js').then((mod) => {
      mod.startWatch(dirs);
    });
  else if (GLOBAL.runtime === 'deno') setImmediate(exit);
})();
