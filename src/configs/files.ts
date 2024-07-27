import type { FileResults } from '../@types/list-files.js';
import type { FinalResults, States } from '../@types/poku.js';

export const states = {} as States;

export const fileResults: FileResults = {
  success: new Map(),
  fail: new Map(),
};

export const finalResults = {} as FinalResults;
