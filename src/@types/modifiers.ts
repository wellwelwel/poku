import type { AsyncTestCallback, TestCallback } from './poku.js';

export type Todo = {
  (message: string): void;
  (message: string, cb?: AsyncTestCallback): Promise<void>;
  (message: string, cb?: TestCallback): void;
};

export type Modifier = {
  (message: string, cb: AsyncTestCallback): Promise<void>;
  (message: string, cb: TestCallback): void;
  (cb: AsyncTestCallback): Promise<void>;
  (cb: TestCallback): void;
};
