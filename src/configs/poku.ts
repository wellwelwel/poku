import type {
  ConfigFile,
  ConfigJSONFile,
  Configs,
  Runtime,
  States,
  Timespan,
} from '../@types/poku.js';
import { env } from 'node:process';
import { envToRegExp } from '../parsers/escape-regexp.js';
import { getRuntime } from '../parsers/get-runtime.js';
import { reporter } from '../services/reporter.js';
import { cwd } from './cwd.js';
import { getSharedState } from './shared-state.js';

export const states = getSharedState<States>('states', {
  isSinglePath: undefined,
});

export const timespan = getSharedState<Timespan>('timespan', {
  started: undefined!,
  finished: undefined!,
  duration: 0,
});

export const errorHoist = getSharedState('errorHoist', {
  depth: 0,
  failed: false,
});

export const deepOptions = getSharedState<string[]>('deepOptions', []);

export const GLOBAL = getSharedState('GLOBAL', {
  cwd,
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
    testNamePattern: envToRegExp(env.POKU_TEST_NAME_PATTERN),
    testSkipPattern: envToRegExp(env.POKU_TEST_SKIP_PATTERN),
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
});
