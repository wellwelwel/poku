export type WaitForExpectedResultOptions = {
  interval?: number;
  timeout?: number;
  delay?: number;
  strict?: boolean;
};

export type WaitForPortOptions = {
  host?: string;
} & Omit<WaitForExpectedResultOptions, 'strict'>;
