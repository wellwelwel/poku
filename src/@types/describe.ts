import type { backgroundColor } from '../services/format.js';
import type { AsyncTestCb, TestCb } from './poku.js';

export type DescribeOptions = {
  background?: keyof typeof backgroundColor | boolean;
  /** @default "☰" */
  icon?: string;
};

export type Describe = {
  (message: string, cb: AsyncTestCb): Promise<void>;
  (message: string, cb: TestCb): void;
  (cb: AsyncTestCb): Promise<void>;
  (cb: TestCb): void;
  (message: string, options?: DescribeOptions): void;
};
