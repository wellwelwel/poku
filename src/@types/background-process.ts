import type { Runner } from './runner.js';

type BackgroundProcessOptions = {
  /**
   * - By default, it will resolve in the first console output
   * - By setting a string: it will wait for a specifc string on console output to resolve
   * - By setting a number: it will wait for time in milliseconds to resolve
   *
   * ---
   *
   * ℹ️ `startAfter` is case sensitive.
   *
   * ---
   *
   * @default undefined
   */
  startAfter?: string | number;
  /**
   * Stops the service for neither success nor failure after:
   * @default 60000
   */
  timeout?: number;
  /**
   * Shows the output from service
   */
  verbose?: boolean;
  /**
   * Specify a target path to start the process
   *
   * @default "./"
   */
  cwd?: string | undefined;
};

export type StartScriptOptions = {
  /**
   * By default, Poku will use `npm`. Change it as you want.
   */
  readonly runner?: Runner;
} & BackgroundProcessOptions;

export type StartServiceOptions = BackgroundProcessOptions;

export type End = (port?: number | number[]) => Promise<void>;
