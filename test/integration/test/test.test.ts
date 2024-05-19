import { test } from '../../../src/index.js';

(async () => {
  test(() => true);
  test(() => false);
  test(() => undefined);
  test(() => new Promise((resolve) => resolve(undefined)));
  test(async () => await new Promise((resolve) => resolve(undefined)));
  await test(() => new Promise((resolve) => resolve(undefined)));
  await test(async () => await new Promise((resolve) => resolve(undefined)));
})();
