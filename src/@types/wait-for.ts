export type WaitForExpectedResultOptions = {
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
  /**
   * Ensure strict comparisons.
   *
   * - For **Bun** users, this option isn't necessary.
   *
   * ---
   *
   * @default false
   */
  strict?: boolean;
};

export type WaitForPortOptions = {
  /**
   * Host to check the port on.
   *
   * ---
   *
   * @default "localhost"
   */
  host?: string;
} & Omit<WaitForExpectedResultOptions, 'strict'>;
