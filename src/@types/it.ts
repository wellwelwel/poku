import type { Modifier, Todo } from './modifiers.js';
import type { AsyncTestCallback, TestCallback } from './poku.js';

export type It = {
  (title: string, cb: AsyncTestCallback): Promise<void>;
  (title: string, cb: TestCallback): void;
  (cb: AsyncTestCallback): Promise<void>;
  (cb: TestCallback): void;
};

export type ItWithModifiers = It & {
  todo: Todo;
  skip: Modifier;
  only: Modifier;
};
