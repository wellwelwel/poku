import { assert } from '../../../../../src/modules/essentials/assert.js';
import { test } from '../../../../../src/modules/helpers/test.js';
import {
  resource,
  waitForExpectedResult,
} from '../../../../../src/modules/index.js';
import { CounterContext, FlagContext } from '../counter.js';

test('Test two Resources from Same File', async () => {
  const counter = await resource.use(CounterContext);
  const flag = await resource.use(FlagContext);

  assert.strictEqual(await counter.getCount(), 0, 'Counter should start at 0');

  await counter.increment();
  assert.strictEqual(
    await counter.getCount(),
    1,
    'Counter should be 1 after increment'
  );

  assert.strictEqual(
    await flag.isActive(),
    false,
    'Flag should start inactive'
  );
  await flag.activate();
  assert.strictEqual(
    await flag.isActive(),
    true,
    'Flag should be active after activation'
  );

  await waitForExpectedResult(counter.getCount, 2);
  assert.strictEqual(
    await counter.getCount(),
    2,
    'Counter should be 2 after waiting'
  );
});
