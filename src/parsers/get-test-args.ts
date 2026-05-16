import type { TestCallback } from '../@types/poku.js';

export const getTitle = (input: unknown): string | undefined =>
  typeof input === 'string' ? input : undefined;

export const getCallback = (input: unknown): TestCallback | undefined =>
  typeof input === 'function' ? (input as TestCallback) : undefined;
