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
