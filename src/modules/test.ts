import { each } from '../configs/each.js';

export async function test(cb: () => Promise<unknown>): Promise<void>;
export function test(cb: () => unknown): void;
export async function test(
  cb: () => unknown | Promise<unknown>
): Promise<void> {
  if (typeof each.before.cb === 'function' && each.before.test) {
    const beforeResult = each.before.cb();
    if (beforeResult instanceof Promise) await beforeResult;
  }

  const resultCb = cb();
  /* c8 ignore next */
  if (resultCb instanceof Promise) await resultCb;

  if (typeof each.after.cb === 'function' && each.after.test) {
    const afterResult = each.after.cb();
    if (afterResult instanceof Promise) await afterResult;
  }
}
