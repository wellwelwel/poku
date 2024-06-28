import { test } from '../../../src/modules/helpers/test.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { beforeEach, afterEach } from '../../../src/modules/helpers/each.js';

let counter = 0;

const beforeEachHelper = beforeEach(() => ++counter, {
  immediate: true,
  assert: true,
  test: false,
});
const afterEachHelper = afterEach(() => ++counter, {
  assert: true,
  test: false,
});

test('Before and After Each Suite (assert)', () => {
  assert.equal(counter, 1, 'Counter should be 1 after immediate beforeEach');

  test(() =>
    assert.equal(
      counter,
      3,
      'Counter should be 3 after beforeEach and afterEach'
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

  assert.equal(counter, 5, 'Counter should be 5 after resuming beforeEach');

  assert.equal(
    counter,
    7,
    'Counter should be 7 after beforeEach and afterEach'
  );

  beforeEachHelper.reset();
  afterEachHelper.reset();

  assert.equal(counter, 9, 'Counter should be 9 after resetting hooks');
});
