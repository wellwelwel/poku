import type { Control, EachOptions } from '../../@types/each.js';
import { each } from '../../configs/each.js';

/**
 * Handle **global states** and **external** services before each `test` or `it`.
 *
 * ---
 *
 * ```ts
 * import { beforeEach } from 'poku';
 *
 * const before = beforeEach(() => {
 *   // prepare
 * };
 *
 * before.pause();
 * before.continue();
 * before.reset();
 * ```
 */
export const beforeEach = (
  callback: () => unknown,
  options?: EachOptions
): Control => {
  options?.immediate && callback();

  each.before.cb = (): unknown => {
    if (each.before.status) return callback();
  };

  const pause = (): void => {
    each.before.status = false;
  };

  const continueFunc = (): void => {
    each.before.status = true;
  };

  const reset = (): void => {
    each.before.cb = undefined;
  };

  return { pause, continue: continueFunc, reset };
};

/**
 * Handle **global states** and **external** services after each `test` or `it`.
 *
 * ---
 *
 * ```ts
 * import { afterEach } from 'poku';
 *
 * const after = afterEach(() => {
 *   // cleanup
 * };
 *
 * after.pause();
 * after.continue();
 * after.reset();
 * ```
 */
export const afterEach = (callback: () => unknown): Control => {
  each.after.cb = (): unknown => {
    if (each.after.status) return callback();
  };

  const pause = (): void => {
    each.after.status = false;
  };

  const continueFunc = (): void => {
    each.after.status = true;
  };

  const reset = (): void => {
    each.after.cb = undefined;
  };

  return { pause, continue: continueFunc, reset };
};
