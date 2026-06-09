import { getSharedState } from './shared-state.js';

export const results = getSharedState('results', {
  passed: 0,
  failed: 0,
  skipped: 0,
  todo: 0,
});

export const errors = getSharedState<{ file: string; output?: string }[]>(
  'errors',
  []
);

export const addError = (file: string, output?: string): void => {
  errors.push({ file, output });
};
