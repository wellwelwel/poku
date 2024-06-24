export type WaitForPortOptions = {
  /**
   * Retry interval in milliseconds
   *
   * ---
   *
   * @default 100
   */
  interval?: number;
  /**
   * Timeout in milliseconds
   *
   * ---
   *
   * @default 60000
   */
  timeout?: number;
  /**
   * Delays both the start and end by the defined milliseconds.
   *
   * ---
   *
   * @default 0
   */
  delay?: number;
};
