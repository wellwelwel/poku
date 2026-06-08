import type { Runner } from './runner.js';

type BackgroundProcessOptions = {
  startAfter?: string | number;
  timeout?: number;
  verbose?: boolean;
  cwd?: string | undefined;
};

export type StartScriptOptions = {
  readonly runner?: Runner;
} & BackgroundProcessOptions;

export type StartServiceOptions = BackgroundProcessOptions;

export type End = (port?: number | number[]) => Promise<void>;
