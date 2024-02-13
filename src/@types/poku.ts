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
   * Customize `stdout` options.
   */
  log?: {
    /**
     * @default false
     */
    success?: boolean;
    /**
     * @default true
     */
    fail?: boolean;
  };
  /**
   * This option overwrites all `log` settings
   *
   * @default false
   */
  quiet?: boolean;
  /**
   * Filter by path to match only the files that should be performed
   *
   * @default /\.test\./i
   */
  filter?: RegExp;
  parallel?: boolean;
};
