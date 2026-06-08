import type { Control, EachConfigs, EachOptions } from '../../@types/each.js';
import { each } from '../../configs/each.js';

const createEachControl = (
  slot: EachConfigs,
  callback: () => unknown
): Control => {
  slot.cb = () => {
    if (slot.status) return callback();
  };

  const pause = (): void => {
    slot.status = false;
  };

  const continueFunc = (): void => {
    slot.status = true;
  };

  const reset = (): void => {
    slot.cb = undefined;
  };

  return { pause, continue: continueFunc, reset };
};

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

  return createEachControl(each.before, callback);
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
export const afterEach = (callback: () => unknown): Control =>
  createEachControl(each.after, callback);
