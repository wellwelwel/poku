/* c8 ignore start */

export type Configs = {
  /**
   * Filter by path to match only the files that should be performed.
   *
   * @default /\.test\./i
   */
  filter?: RegExp;
  /**
   * Exclude by path to match only the files that should be performed.
   *
   * @default undefined
   */
  exclude?: RegExp | RegExp[];
};

export type FileResults = {
  success: string[];
  fail: string[];
};

/* c8 ignore stop */
