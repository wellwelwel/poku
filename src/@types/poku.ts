import type { Code } from './code.js';
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
  /** Run tests sequentially */
  sequential?: boolean;
  isolation?: 'none' | 'process' | CustomString;
  /** Stop execution at the first error */
  failFast?: boolean;
  /** @default (availableParallelism() || cpus().lenght) */
  concurrency?: number;
  /** Set a timeout for each test file */
  timeout?: number;
  /** @default "poku" */
  reporter?: Reporter;
  /** Run a callback or a file before each test file */
  beforeEach?: () => unknown | Promise<unknown>;
  /** Run a callback or a file after each test file */
  afterEach?: () => unknown | Promise<unknown>;
  deno?: DenoOptions;
  plugins?: PokuPlugin[];
  /** Only run tests whose title matches the given regex pattern */
  testNamePattern?: RegExp;
  /** Skip tests whose title matches the given regex pattern */
  testSkipPattern?: RegExp;
  debug?: boolean;
  quiet?: boolean;
  noExit?: boolean;
} & ListFilesConfigs;

export type Timespan = {
  started: Date;
  finished: Date;
  duration: number;
};

export type States = {
  isSinglePath?: boolean;
};

type CliConfigs = {
  include?: string | string[];
  envFile?: string;
  kill?: {
    port?: [number];
    range?: [number, number][];
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

export type Poku = {
  (
    targetPaths: string | string[],
    configs: Configs & { noExit: true }
  ): Promise<Code>;
  (targetPaths: string | string[], configs?: Configs): Promise<undefined>;
};

export type TestCb = (
  params?: Record<string, unknown>
) => unknown | Promise<unknown>;

export type AsyncTestCb = (
  params?: Record<string, unknown>
) => Promise<unknown>;
