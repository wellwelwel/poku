import { test } from '../../../../src/modules/test.js';
import { assert } from '../../../../src/modules/assert.js';
import { beforeEach, afterEach } from '../../../../src/modules/each.js';

test('Asynchronous Before and After Each Suite (test)', () => {
  let counter = 0;

  const asyncPreIncrement = async () =>
    await new Promise((resolve) => resolve(++counter));

  const beforeEachHelper = beforeEach(asyncPreIncrement, { immediate: true });

  const afterEachHelper = afterEach(asyncPreIncrement, {});

  test(() => {
    assert.equal(counter, 2, 'Counter should be 2 after immediate beforeEach');
  });

  test(() => {
    assert.equal(counter, 4, 'Counter should be 4 after before/afterEach');
  });

  afterEachHelper.pause();
  beforeEachHelper.pause();

  test(() => {
    assert.equal(counter, 5, 'Counter should remain 5 after pausing hooks');
  });

  test(() => {
    assert.equal(counter, 5, 'Counter should still be 5 with hooks paused');
  });

  afterEachHelper.continue();
  beforeEachHelper.continue();

  test(() => {
    assert.equal(counter, 6, 'Counter should be 6 after resuming beforeEach');
  });

  test(() => {
    assert.equal(counter, 8, 'Counter should be 8 after before/afterEach');
  });

  beforeEachHelper.reset();
  afterEachHelper.reset();

  test(() => {
    assert.equal(counter, 9, 'Counter should be 9 after resetting hooks');
  });
});
