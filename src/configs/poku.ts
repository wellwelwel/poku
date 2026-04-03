import type {
  ConfigFile,
  ConfigJSONFile,
  Configs,
  Runtime,
  States,
  Timespan,
} from '../@types/poku.js';
import { cwd, env } from 'node:process';
import { escapeRegExp } from '../modules/helpers/list-files.js';
import { getRuntime } from '../parsers/get-runtime.js';
import { reporter } from '../services/reporter.js';

export const states: States = { isSinglePath: undefined };

export const timespan: Timespan = {
  started: undefined!,
  finished: undefined!,
  duration: 0,
};

export const results = {
  passed: 0,
  failed: 0,
  skipped: 0,
  todo: 0,
};

export const VERSION = '';

export const isBuild = Boolean(VERSION);

export const deepOptions: string[] = [];

export const GLOBAL = {
  cwd: cwd(),
  configs: {
    filter: undefined,
    exclude: undefined,
    concurrency: undefined,
    timeout: undefined,
    sequential: undefined,
    quiet: undefined,
    debug: undefined,
    failFast: undefined,
    isolation: undefined,
    deno: undefined,
    noExit: undefined,
    reporter: undefined,
    beforeEach: undefined,
    afterEach: undefined,
    testNamePattern: env.POKU_TEST_NAME_PATTERN
      ? new RegExp(escapeRegExp(env.POKU_TEST_NAME_PATTERN))
      : undefined,
    testSkipPattern: env.POKU_TEST_SKIP_PATTERN
      ? new RegExp(escapeRegExp(env.POKU_TEST_SKIP_PATTERN))
      : undefined,
  } as Configs,
  configFile: undefined as string | undefined,
  configsFromFile: Object.create(null) as ConfigFile | ConfigJSONFile,
  reporter:
    reporter[
      env.POKU_REPORTER && env.POKU_REPORTER in reporter
        ? env.POKU_REPORTER
        : 'poku'
    ](),
  envFile: undefined as string | undefined,
  runtime: (env.POKU_RUNTIME || getRuntime()) as Runtime,
  runAsOnly: false,
  workerPool: undefined as
    | import('../services/worker-pool.js').WorkerPool
    | undefined,
};
