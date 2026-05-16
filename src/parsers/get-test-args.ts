import type { TestCb } from '../@types/poku.js';

export const getTitle = (input: unknown): string | undefined =>
  typeof input === 'string' ? input : undefined;

export const getCallback = (input: unknown): TestCb | undefined =>
  typeof input === 'function' ? (input as TestCb) : undefined;
