#! /usr/bin/env node
import { env, exit } from 'node:process';
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
  const concurrency = (() => {
    const value = Number(getArg('concurrency'));
    return Number.isNaN(value) ? configsFromFile?.concurrency : value;
  })();
  const timeout = (() => {
    const value = Number(getArg('timeout'));
    return Number.isNaN(value) ? configsFromFile?.timeout : value;
  })();
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

  env.POKU_RUNTIME = GLOBAL.runtime;
  env.POKU_REPORTER = typeof reporter === 'string' ? reporter : 'poku';

  GLOBAL.configs = {
    filter:
      typeof filter === 'string' ? new RegExp(escapeRegExp(filter)) : filter,
    exclude:
      typeof exclude === 'string' ? new RegExp(escapeRegExp(exclude)) : exclude,
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
    testNamePattern:
      typeof testNamePattern === 'string'
        ? new RegExp(escapeRegExp(testNamePattern))
        : testNamePattern,
    testSkipPattern:
      typeof testSkipPattern === 'string'
        ? new RegExp(escapeRegExp(testSkipPattern))
        : testSkipPattern,
    beforeEach:
      'beforeEach' in configsFromFile ? configsFromFile.beforeEach : undefined,
    afterEach:
      'afterEach' in configsFromFile ? configsFromFile.afterEach : undefined,
    plugins: 'plugins' in configsFromFile ? configsFromFile.plugins : undefined,
  };

  if (hasArg('coverage')) {
    const customPkg = getArg('coverage');

    if (customPkg && /^[./]/.test(customPkg)) {
      log(
        'Coverage plugin must be an npm package name. Local paths are not supported for security concerns.'
      );
      exit(1);
    }

    const coveragePackages = customPkg ? [customPkg] : ['@pokujs/c8'];

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
        log(
          customPkg
            ? `Coverage plugin not found: ${customPkg}`
            : `To use --coverage, install a coverage plugin: npm i -D ${coveragePackages.join(' or npm i -D ')}`
        );
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
