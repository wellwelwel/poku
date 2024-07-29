import { describe } from '../../../../src/modules/helpers/describe.js';
import { it } from '../../../../src/modules/helpers/it/core.js';
import { assert } from '../../../../src/modules/essentials/assert.js';
import { beforeEach, afterEach } from '../../../../src/modules/helpers/each.js';

let counter = 0;

const asyncPreIncrement = async () =>
  await new Promise((resolve) => resolve(++counter));

const beforeEachHelper = beforeEach(asyncPreIncrement, { immediate: true });

const afterEachHelper = afterEach(asyncPreIncrement);

describe('Asynchronous Before and After Each Suite (it)', async () => {
  await it(() =>
    assert.equal(counter, 2, 'Counter should be 2 after beforeEach')
  );

  await it(() =>
    assert.equal(counter, 4, 'Counter should be 4 after before/afterEach')
  );

  afterEachHelper.pause();
  beforeEachHelper.pause();

  it(() => assert.equal(counter, 5, 'Counter should remain 5 after pausing'));
  it(() => assert.equal(counter, 5, 'Counter should still be 5'));

  afterEachHelper.continue();
  beforeEachHelper.continue();

  await it(() =>
    assert.equal(counter, 6, 'Counter should be 6 after resuming')
  );

  await it(() =>
    assert.equal(counter, 8, 'Counter should be 8 after before/afterEach')
  );

  beforeEachHelper.reset();
  afterEachHelper.reset();

  await it(() => assert.equal(counter, 9, 'Counter should be 9 after reset'));
});
