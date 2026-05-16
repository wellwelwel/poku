import type { AssertPredicate } from 'node:assert';

export type ProcessAssertionOptions = {
  message?: string | Error;
  defaultMessage?: string;
  actual?: string;
  expected?: string;
  throw?: boolean;
  hideDiff?: boolean;
};

export type AssertionMessage = ProcessAssertionOptions['message'];

export type AssertValue = (value: unknown, message?: AssertionMessage) => void;

export type AssertEqual = (
  actual: unknown,
  expected: unknown,
  message?: AssertionMessage
) => void;

export type AssertMatch = (
  value: string,
  regExp: RegExp,
  message?: AssertionMessage
) => void;

export type AsyncBlock = (() => Promise<unknown>) | Promise<unknown>;

export type AssertThrows = {
  (block: () => unknown, message?: AssertionMessage): void;
  (
    block: () => unknown,
    error: AssertPredicate,
    message?: AssertionMessage
  ): void;
};

export type AssertRejects = {
  (block: AsyncBlock, message?: AssertionMessage): Promise<void>;
  (
    block: AsyncBlock,
    error: AssertPredicate,
    message?: AssertionMessage
  ): Promise<void>;
};
