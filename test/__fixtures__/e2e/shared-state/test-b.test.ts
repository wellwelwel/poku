import { assert } from '../../../../src/modules/essentials/assert.js';
import { test } from '../../../../src/modules/helpers/test.js';
import { waitForExpectedResult } from '../../../../src/modules/index.js';
import { useCounter } from './counter.js';

test('Test B: Verify Counter State', async () => {
  const counter = await useCounter();

  await waitForExpectedResult(counter.get, 1, { timeout: 1000 });

  const next = await counter.inc();
  assert.strictEqual(next, 2, 'Counter should be 2 after second increment');
});
