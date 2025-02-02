import { assert } from '../../../src/modules/essentials/assert.js';
import { test } from '../../../src/modules/helpers/test.js';
import { sleep } from '../../../src/modules/helpers/wait-for.js';

test('Sleep "mini" helper', async () => {
  const startTime = Date.now();
  const delay = 500;
  await sleep(delay);
  const elapsedTime = Date.now() - startTime;
  const margin = 500;

  assert.ok(
    elapsedTime >= delay - margin && elapsedTime <= delay + margin,
    `Expected sleep time to be around ${delay}ms (±${margin}ms): Elapsed ${elapsedTime}ms`
  );
});
