import type { AsyncTestCb, TestCb } from './poku.js';

export type Todo = {
  (message: string): void;
  (message: string, cb?: AsyncTestCb): Promise<void>;
  (message: string, cb?: TestCb): void;
};

export type Modifier = {
  (message: string, cb: AsyncTestCb): Promise<void>;
  (message: string, cb: TestCb): void;
  (cb: AsyncTestCb): Promise<void>;
  (cb: TestCb): void;
};
