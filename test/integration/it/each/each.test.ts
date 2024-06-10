import { describe } from '../../../../src/modules/describe.js';
import { it } from '../../../../src/modules/it.js';
import { assert } from '../../../../src/modules/assert.js';
import { beforeEach, afterEach } from '../../../../src/modules/each.js';

let counter = 0;

const beforeEachHelper = beforeEach(
  () => {
    ++counter;
  },
  { immediate: true }
);

const afterEachHelper = afterEach(() => {
  ++counter;
}, {});

describe('Before and After Each Suite (it)', () => {
  it(() => {
    assert.equal(
      counter,
      2,
      'value incremented by 1 from beforeEach with immediate option should be 2'
    );
  });

  it(() => {
    assert.equal(
      counter,
      4,
      'value incremented by 1 from beforeEach with immediate option and by 1 from previous test with afterEach should be 4'
    );
  });

  afterEachHelper.pause();
  beforeEachHelper.pause();

  it(() => {
    assert.equal(
      counter,
      5,
      'value should still 5 by pausing both beforeEach and afterEach, considering the abscence of beforeEach effect'
    );
  });

  it(() => {
    assert.equal(
      counter,
      5,
      'value should still 5 by pausing both beforeEach and afterEach, considering the the abscence of beforeEach and afterEach (from previous test) effects'
    );
  });

  afterEachHelper.continue();
  beforeEachHelper.continue();

  it(() => {
    assert.equal(
      counter,
      6,
      'value incremented by 1 from unpausing beforeEach should be 6'
    );
  });

  it(() => {
    assert.equal(
      counter,
      8,
      'value incremented by 1 from beforeEach and 1 by previous test with afterEach should be 8'
    );
  });

  beforeEachHelper.reset();
  afterEachHelper.reset();

  it(() => {
    assert.equal(
      counter,
      9,
      'value should still 9 by reseting both beforeEach and afterEach'
    );
  });
});
