import { assert } from '../../../../src/modules/essentials/assert.js';
import { test } from '../../../../src/modules/helpers/test.js';
import { waitForExpectedResult } from '../../../../src/modules/index.js';
import { useCounter } from './counter.js';

test('Test A: Increment Counter', async () => {
  const counter = await useCounter();

  const current = await counter.get();
  assert.strictEqual(current, 0, 'Should start at 0');

  const next = await counter.inc();
  assert.strictEqual(next, 1, 'Should be 1 after increment');

  await waitForExpectedResult(counter.get, 2);
  assert.strictEqual(await counter.get(), 2, 'Should be 2 after waiting');
});
