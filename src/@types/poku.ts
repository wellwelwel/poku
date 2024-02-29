import type { Configs as ListFilesConfigs } from './list-files.js';

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
   * @deprecated
   * Customize `stdout` options.
   */
  log?: {
    /**
     * @deprecated
     *
     * @default false
     */
    success?: boolean;
    /**
     * @deprecated
     *
     * @default true
     */
    fail?: boolean;
  };
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
  parallel?: boolean;
  /**
   * Determines the platform for test execution.
   *
   * @default 'node'
   */
  platform?: 'node' | 'bun' | 'deno';
  /**
   * You can use this option to run a **callback** or a **file** before each test file on your suite.
   *
   * Ex.:
   *
   * ```ts
   * beforeEach(prepare)
   * ```
   *
   * ```ts
   * beforeEach('/tools/prepare.ts')
   * ```
   */
  beforeEach?: () => unknown | Promise<unknown>;
  /**
   * You can use this option to run a **callback** or a **file** after each test file on your suite.
   *
   * Ex.:
   *
   * ```ts
   * afterEach(cleanup)
   * ```
   *
   * ```ts
   * afterEach('/tools/cleanup.ts')
   * ```
   */
  afterEach?: () => unknown | Promise<unknown>;
} & ListFilesConfigs;
