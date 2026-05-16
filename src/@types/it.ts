import type { AsyncTestCb, TestCb } from './poku.js';

export type It = {
  (title: string, cb: AsyncTestCb): Promise<void>;
  (title: string, cb: TestCb): void;
  (cb: AsyncTestCb): Promise<void>;
  (cb: TestCb): void;
};
