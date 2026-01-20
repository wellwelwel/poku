import type { AssertionError } from 'node:assert';
import type { results } from '../configs/poku.js';
import type { ProcessAssertionOptions } from './assert.js';
import type { DescribeOptions } from './describe.js';
import type { Configs as ListFilesConfigs } from './list-files.js';

type CustomString = string & NonNullable<unknown>;

export type DenoOptions = {
  allow?: string[];
  deny?: string[];
  cjs?: boolean | string[];
};

export type Runtime = 'node' | 'bun' | 'deno';

export type Reporter =
  | 'poku'
  | 'focus'
  | 'dot'
  | 'verbose'
  | 'compact'
  | 'classic'
  | CustomString;

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
   * By default, **Poku** runs in full isolation mode. Sharing resources allows IPC-based sharing of resources between test files.
   *
   * @default false
   */
  sharedResources?: boolean;
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

export type Timespan = {
  started: Date;
  finished: Date;
  /** Calculation from `process.hrtime()`. */
  duration: number;
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

type Results = {
  code: number;
  timespan: Timespan;
  results: typeof results;
};

type Path = {
  absolute: string;
  relative: string;
};

export type ReporterPlugin = (configs?: Configs) => {
  onRunStart: () => void;
  onDescribeAsTitle: (title: string, options: DescribeOptions) => void;
  onDescribeStart: (options: { title?: string }) => void;
  onDescribeEnd: (options: {
    duration: number;
    success?: boolean;
    title?: string;
  }) => void;
  onItStart: (options: { title?: string }) => void;
  onItEnd: (options: {
    duration: number;
    success?: boolean;
    title?: string;
  }) => void;
  onAssertionSuccess: (options: { message: string }) => void;
  onAssertionFailure: (options: {
    assertOptions: ProcessAssertionOptions;
    error: AssertionError;
  }) => void;
  onSkipFile: (options: { message: string }) => void;
  onSkipModifier: (options: { message: string }) => void;
  onTodoModifier: (options: { message: string }) => void;
  onFileStart: (options: { path: Path }) => void;
  onFileResult: (options: {
    status: boolean;
    path: Path;
    duration: number;
    output?: string;
  }) => void;
  onRunResult: (options: Results) => void;
  onExit: (options: Results) => void;
};

export type ReporterEvents = Partial<ReturnType<ReporterPlugin>>;
