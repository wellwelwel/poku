export type WaitForExpectedResultOptions = {
  /** @default 100 */
  interval?: number;
  /** @default 60000 */
  timeout?: number;
  delay?: number;
  /** Ensure strict comparisons */
  strict?: boolean;
};

export type WaitForPortOptions = {
  /** @default "localhost" */
  host?: string;
} & Omit<WaitForExpectedResultOptions, 'strict'>;
