import { Control, each } from '../configs/each.js';

type EachOptions = {
  immediate?: boolean;
  test?: boolean;
  assert?: boolean;
};

/**
 * - ✅ Handling **global** and **external** services (_preparing a database, for example_)
 * - ✅ It's made for **exclusive use** in combination with **Poku**'s **`assert`** methods
 * - ⚠️ Although `beforeEach` accepts local variables changes by using the `imediate` option, it's strongly discouraged ([_use a mock instead_](https://poku.io/docs/category/mock))
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
export const beforeEach = (
  callback: () => unknown,
  options?: EachOptions
): Control => {
  each.before.test = typeof options?.test === 'boolean' ? options.test : true;
  each.before.assert =
    typeof options?.assert === 'boolean' ? options.assert : false;

  options?.immediate && callback();

  each.before.cb = () => {
    if (each.before.status) callback();
  };

  const pause = () => {
    each.before.status = false;
  };

  const continueFunc = () => {
    each.before.status = true;
  };

  const reset = () => {
    each.before.cb = undefined;
  };

  return { pause, continue: continueFunc, reset };
};

/**
 * - ✅ Handling **global** and **external** services (_preparing a database, for example_)
 * - ✅ It's made for **exclusive use** in combination with **Poku**'s **`assert`** methods
 * - ⚠️ Although `afterEach` accepts local variables changes, it's strongly discouraged ([_use a mock instead_](https://poku.io/docs/category/mock))
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
export const afterEach = (
  callback: () => unknown,
  options: Omit<EachOptions, 'immediate'>
): Control => {
  each.after.test = typeof options?.test === 'boolean' ? options.test : true;
  each.after.assert =
    typeof options?.assert === 'boolean' ? options.assert : false;

  each.after.cb = () => {
    if (each.after.status) callback();
  };

  const pause = () => {
    each.after.status = false;
  };

  const continueFunc = () => {
    each.after.status = true;
  };

  const reset = () => {
    each.after.cb = undefined;
  };

  return { pause, continue: continueFunc, reset };
};
