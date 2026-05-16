import type { backgroundColor } from '../services/format.js';
import type { Modifier, Todo } from './modifiers.js';
import type { AsyncTestCallback, TestCallback } from './poku.js';

export type DescribeOptions = {
  background?: keyof typeof backgroundColor | boolean;
  /**
   * @default "☰"
   */
  icon?: string;
};

export type Describe = {
  (message: string, cb: AsyncTestCallback): Promise<void>;
  (message: string, cb: TestCallback): void;
  (cb: AsyncTestCallback): Promise<void>;
  (cb: TestCallback): void;
  (message: string, options?: DescribeOptions): void;
};

export type DescribeWithModifiers = Describe & {
  todo: Todo;
  skip: Modifier;
  only: Modifier;
};
