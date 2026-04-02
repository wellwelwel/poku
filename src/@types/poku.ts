import type { Configs as ListFilesConfigs } from './list-files.js';
import type { PokuPlugin, ReporterPlugin } from './plugin.js';

export type {
  PluginContext,
  PokuPlugin,
  ReporterPlugin,
  ReporterEvents,
} from './plugin.js';

type CustomString = string & NonNullable<unknown>;

export type DenoOptions = {
  allow?: string[];
  deny?: string[];
};

export type Runtime = 'node' | 'bun' | 'deno';

export type Reporter =
  | 'poku'
  | 'focus'
  | 'dot'
  | 'compact'
  | 'classic'
  | ReporterPlugin
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
   * Controls process isolation for test files.
   *
   * - `'process'` (default): each test file runs in a separate child process.
   * - `'worker'`: test files run in a pool of reusable worker threads (faster startup, shared memory). TypeScript files fallback to `'process'`.
   * - `'none'`: all test files run in the same process (useful for debugging with `--inspect`).
   *
   * @default 'process'
   */
  isolation?: 'none' | 'process' | 'worker' | (string & NonNullable<unknown>);
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
   * Sets the maximum time in milliseconds that each test file is allowed to run.
   *
   * @default undefined
   */
  timeout?: number;
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
  /**
   * Plugins to extend Poku's behavior.
   *
   * @default undefined
   */
  plugins?: PokuPlugin[];
  /**
   * Only run tests whose title matches the given regex pattern.
   *
   * @default undefined
   */
  testNamePattern?: RegExp;
  /**
   * Skip tests whose title matches the given regex pattern.
   *
   * @default undefined
   */
  testSkipPattern?: RegExp;
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

type CliConfigs = {
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
  testNamePattern?: string;
  testSkipPattern?: string;
} & Omit<
  Configs,
  | 'beforeEach'
  | 'afterEach'
  | 'noExit'
  | 'filter'
  | 'exclude'
  | 'plugins'
  | 'testNamePattern'
  | 'testSkipPattern'
> &
  CliConfigs;

export type ConfigFile = Omit<Configs, 'noExit'> & CliConfigs;
