import { assert } from '../../../../src/modules/essentials/assert.js';
import { describe } from '../../../../src/modules/helpers/describe.js';
import { afterEach, beforeEach } from '../../../../src/modules/helpers/each.js';
import { it } from '../../../../src/modules/helpers/it/core.js';

let counter = 0;

const beforeEachHelper = beforeEach(
  () => {
    ++counter;
  },
  { immediate: true }
);

const afterEachHelper = afterEach(() => {
  ++counter;
});

describe('Before and After Each Suite (it)', () => {
  it(() =>
    assert.equal(counter, 2, 'Counter should be 2 after immediate beforeEach')
  );

  it(() =>
    assert.equal(counter, 4, 'Counter should be 4 after before/afterEach')
  );

  afterEachHelper.pause();
  beforeEachHelper.pause();

  it(() =>
    assert.equal(counter, 5, 'Counter should remain 5 after pausing hooks')
  );

  it(() =>
    assert.equal(counter, 5, 'Counter should still be 5 with hooks paused')
  );

  afterEachHelper.continue();
  beforeEachHelper.continue();

  it(() =>
    assert.equal(counter, 6, 'Counter should be 6 after resuming beforeEach')
  );

  it(() =>
    assert.equal(counter, 8, 'Counter should be 8 after before/afterEach')
  );

  beforeEachHelper.reset();
  afterEachHelper.reset();

  it(() =>
    assert.equal(counter, 9, 'Counter should be 9 after resetting hooks')
  );
});
