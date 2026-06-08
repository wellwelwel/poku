import type { Control, EachConfigs, EachOptions } from '../../@types/each.js';
import { each } from '../../configs/each.js';

const createEachControl = (
  slot: EachConfigs,
  callback: () => unknown
): Control => {
  slot.cb = () => {
    if (slot.status) return callback();
  };

  const pause = () => {
    slot.status = false;
  };

  const continueFunc = () => {
    slot.status = true;
  };

  const reset = () => {
    slot.cb = undefined;
  };

  return { pause, continue: continueFunc, reset };
};

export const beforeEach = (
  callback: () => unknown,
  options?: EachOptions
): Control => {
  options?.immediate && callback();

  return createEachControl(each.before, callback);
};

export const afterEach = (callback: () => unknown): Control =>
  createEachControl(each.after, callback);
