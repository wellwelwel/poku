import type { AssertionError } from 'node:assert';
import type { results } from '../configs/poku.js';
import type { FileResults, Configs as ListFilesConfigs } from './list-files.js';
import type { ProcessAssertionOptions } from './assert.js';
import type { DescribeOptions } from './describe.js';

export type DenoOptions = {
  allow?: string[];
  deny?: string[];
  cjs?: boolean | string[];
};

export type Runtime = 'node' | 'bun' | 'deno';

export type Reporter = 'poku' | 'mini' | (string & NonNullable<unknown>);

export type Configs = {
  /**
   * By setting `true`, **Poku** won't exit the process and will return the exit code (`0` or `1`).
   *
   * You can combine this option with **Poku**'s `exit` method or just use the result, for example, in `process.exit(code)`.
   *
   * @default false
   */
  noExit?: boolean;
  /**
   * This option overwrites all `log` settings.
   *
   * @default false
   */
  debug?: boolean;
  /**
   * This option overwrites the `debug` settings.
   *
   * @default false
   */
  quiet?: boolean;
  /**
   * Determines the mode of test execution.
   *
   * @default false
   */
  sequential?: boolean;
  /**
   * Stops the tests at the first failure.
   *
   * @default false
   */
  failFast?: boolean;
  /**
   * Limits the number of tests running concurrently.
   *
   * @default (availableParallelism() || cpus().lenght) - 1
   */
  concurrency?: number;
  /**
   * @default "poku"
   */
  reporter?: Reporter;
  /**
   * You can use this option to run a **callback** or a **file** before each test file on your suite.
   *
   * Ex.:
   *
   * ```ts
   * beforeEach(() => myFunc())
   * ```
   *
   * ```ts
   * beforeEach(async () => await myAsyncFunc())
   * ```
   */
  beforeEach?: () => unknown | Promise<unknown>;
  /**
   * You can use this option to run a **callback** or a **file** after each test file on your suite.
   *
   * Ex.:
   *
   * ```ts
   * afterEach(() => myFunc())
   * ```
   *
   * ```ts
   * afterEach(async () => await myAsyncFunc())
   * ```
   */
  afterEach?: () => unknown | Promise<unknown>;
  deno?: DenoOptions;
} & ListFilesConfigs;

export type FinalResults = {
  time: string;
  started: Date;
};

export type States = {
  isSinglePath?: boolean;
};

type cliConfigs = {
  /** By default, **Poku** searches for _`.test.`_ and `.spec.` files, but you can customize it. */
  include?: string | string[];
  /** Reads an environment file and sets the environment variables. */
  envFile?: string;
  /** Terminates the specified ports, port ranges and process IDs. */
  kill?: {
    /** Terminates the specified ports before running the test suite. */
    port?: [number];
    /** Terminates the specified port range before running the test suite. */
    range?: [number, number][];
    /** Terminates the specified processes before running the test suite. */
    pid?: [number];
  };
};

export type ConfigJSONFile = {
  filter?: string;
  exclude?: string;
} & Omit<
  Configs,
  'beforeEach' | 'afterEach' | 'noExit' | 'filter' | 'exclude'
> &
  cliConfigs;

export type ConfigFile = Omit<Configs, 'noExit'> & cliConfigs;

export type ReporterPlugin = (configs?: Configs) => {
  onRunStart: () => void;
  onDescribeAsTitle: (title: string, options: DescribeOptions) => void;
  onDescribeStart: (options: { title?: string }) => void;
  onDescribeEnd: (options: { title?: string; duration: string }) => void;
  onItStart: (options: { title?: string }) => void;
  onItEnd: (options: { title?: string; duration: string }) => void;
  onAssertionSuccess: (options: { message: string }) => void;
  onAssertionFailure: (options: {
    assertOptions: ProcessAssertionOptions;
    error: AssertionError;
  }) => void;
  onSkipFile: (options: { message?: string }) => void;
  onSkipModifier: (options: { message: string }) => void;
  onTodoModifier: (options: { message: string }) => void;
  // onFileStart: () => void;
  // onFileResult: () => void;
  onRunResult: (options: { results: FileResults }) => void;
  onExit: (options: {
    results: typeof results;
    finalResults: FinalResults;
    fileResults: FileResults;
    code: number;
  }) => void;
};

export type ReporterEvents = Partial<ReturnType<ReporterPlugin>>;
