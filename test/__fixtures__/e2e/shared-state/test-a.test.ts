import { assert } from '../../../../src/modules/essentials/assert.js';
import { test } from '../../../../src/modules/helpers/test.js';
import { useCounter } from './counter.js';

test('Test A: Increment Counter', async () => {
  const counter = await useCounter();

  const current = await counter.get();
  assert.strictEqual(current, 0, 'Counter should start at 0');

  const next = await counter.inc();
  assert.strictEqual(next, 1, 'Counter should be 1 after increment');
});
