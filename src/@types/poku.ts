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
  sequential?: boolean;
  failFast?: boolean;
  concurrency?: number;
  timeout?: number;
  reporter?: Reporter;
  beforeEach?: () => unknown | Promise<unknown>;
  afterEach?: () => unknown | Promise<unknown>;
  deno?: DenoOptions;
  plugins?: PokuPlugin[];
  testNamePattern?: RegExp;
  testSkipPattern?: RegExp;
  isolation?: 'none' | 'process' | CustomString;
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

export type TestContext = {
  snapshot: (value: unknown, hint?: string) => void;
};

export type ScopedTestContext = {
  context: TestContext;
  flush: () => Promise<void> | undefined;
};

export type TestCb = (context: TestContext) => unknown | Promise<unknown>;

export type AsyncTestCb = (context: TestContext) => Promise<unknown>;
