import { test } from '../../../../src/modules/helpers/test.js';
import { assert } from '../../../../src/modules/essentials/assert.js';
import { beforeEach, afterEach } from '../../../../src/modules/helpers/each.js';

test('Before and After Each Suite (test)', () => {
  let counter = 0;

  const beforeEachHelper = beforeEach(() => ++counter, { immediate: true });
  const afterEachHelper = afterEach(() => ++counter);

  test(() =>
    assert.equal(counter, 2, 'Counter should be 2 after immediate beforeEach')
  );

  test(() =>
    assert.equal(
      counter,
      4,
      'Counter should be 4 after beforeEach and afterEach'
    )
  );

  afterEachHelper.pause();
  beforeEachHelper.pause();

  test(() =>
    assert.equal(counter, 5, 'Counter should remain 5 after pausing hooks')
  );

  test(() =>
    assert.equal(counter, 5, 'Counter should still be 5 with hooks paused')
  );

  afterEachHelper.continue();
  beforeEachHelper.continue();

  test(() =>
    assert.equal(counter, 6, 'Counter should be 6 after resuming beforeEach')
  );

  test(() =>
    assert.equal(
      counter,
      8,
      'Counter should be 8 after beforeEach and afterEach'
    )
  );

  beforeEachHelper.reset();
  afterEachHelper.reset();

  test(() =>
    assert.equal(counter, 9, 'Counter should be 9 after resetting hooks')
  );
});
