import { each } from '../modules/assert.js';

type Control = {
  pause: () => void;
  continue: () => void;
  reset: () => void;
};

const status = {
  before: true,
  after: true,
};

/**
 * - ✅ Handling **global** and **external** services (_preparing a database, for example_)
 * - ✅ It's made for **exclusive use** in combination with **Poku**'s **`assert`** methods
 * - ❌ Changing local variables values and states ([_use a mock instead_](https://poku.dev/docs/category/mock))
 *
 * ---
 *
 * ### Available methos:
 *
 * ```ts
 * import { assert, beforeEach } from 'poku';
 *
 * const before = beforeEach(() => {
 *   // preparing an external or global state
 * };
 *
 * before.pause();
 * before.continue();
 * before.reset();
 * ```
 */
export const beforeEach = (callback: () => unknown): Control => {
  each.before = () => {
    if (status.before) callback();
  };

  const pause = () => {
    status.before = false;
  };

  const continueFunc = () => {
    status.before = true;
  };

  const reset = () => {
    each.before = undefined;
  };

  return { pause, continue: continueFunc, reset };
};

/**
 * - ✅ Handling **global** and **external** services (_preparing a database, for example_)
 * - ✅ It's made for **exclusive use** in combination with **Poku**'s **`assert`** methods
 * - ❌ Changing local variables values and states ([_use a mock instead_](https://poku.dev/docs/category/mock))
 *
 * ---
 *
 * ### Available methos:
 *
 * ```ts
 * import { assert, afterEach } from 'poku';
 *
 * const after = afterEach(() => {
 *   // cleanup an external or global state
 * };
 *
 * after.pause();
 * after.continue();
 * after.reset();
 * ```
 */
export const afterEach = (callback: () => unknown): Control => {
  each.after = () => {
    if (status.after) callback();
  };

  const pause = () => {
    status.after = false;
  };

  const continueFunc = () => {
    status.after = true;
  };

  const reset = () => {
    each.after = undefined;
  };

  return { pause, continue: continueFunc, reset };
};
