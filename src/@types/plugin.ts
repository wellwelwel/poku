import type { AssertionError } from 'node:assert';
import type {
  ChildProcess,
  ChildProcessWithoutNullStreams,
} from 'node:child_process';
import type { results, timespan } from '../configs/poku.js';
import type { ProcessAssertionOptions } from './assert.js';
import type { DescribeOptions } from './describe.js';
import type { Configs, Runtime, Timespan } from './poku.js';

export type PluginContext = {
  readonly configs: Configs;
  readonly runtime: Runtime;
  readonly cwd: string;
  readonly configFile: string | undefined;
  readonly runAsOnly: boolean;
  readonly results: typeof results;
  readonly timespan: typeof timespan;
  readonly reporter: ReturnType<ReporterPlugin>;
};

export type PokuPlugin = {
  /** Plugin name */
  name?: string;
  /** Modify the command array before spawning a test file process */
  runner?: (command: string[], file: string) => string[];
  /** Run before the test suite begins */
  setup?: (context: PluginContext) => void | Promise<void>;
  /** Run after the test suite completes */
  teardown?: (context: PluginContext) => void | Promise<void>;
  /** Enable IPC channel for child processes */
  ipc?: boolean;
  /** Called after each test file process is spawned */
  onTestProcess?: (child: ChildProcess, file: string) => void;
  /** Intercept file discovery. Return file paths, or null to use default discovery. */
  discoverFiles?: (
    paths: string[],
    context: PluginContext
  ) => string[] | null | Promise<string[] | null>;
};

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
  onDescribeAsTitle: (title: string, options?: DescribeOptions) => void;
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

export type InspectCLIResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
  process: ChildProcessWithoutNullStreams;
  PID: number;
  kill: () => Promise<void>;
};
