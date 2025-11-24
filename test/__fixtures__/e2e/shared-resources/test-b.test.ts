import { assert } from '../../../../src/modules/essentials/assert.js';
import { test } from '../../../../src/modules/helpers/test.js';
import {
  shared,
  waitForExpectedResult,
} from '../../../../src/modules/index.js';
import { CounterContext } from './counter.js';

test('Test B: Verify Counter State', async () => {
  const counter = await shared(CounterContext);

  await waitForExpectedResult(counter.get, 1);
  assert.strictEqual(await counter.get(), 1, 'Should be 1 at start of Test B');

  const next = await counter.inc();
  assert.strictEqual(next, 2, 'Should be 2 after second increment');
});
