import {
  describe,
  assert,
  beforeEach,
  afterEach,
  test,
} from '../../src/index.js';

describe('Asynchronous Before and After Each Suite', {
  background: false,
  icon: '🔬',
});

let counter = 0;

const asyncPreIncrement = async () =>
  await new Promise((resolve) => resolve(++counter));

const beforeEachHelper = beforeEach(asyncPreIncrement, { immediate: true });

const afterEachHelper = afterEach(asyncPreIncrement, {});

test(() => {
  assert.equal(
    counter,
    2,
    'value incremented by 1 from beforeEach with immediate option should be 2'
  );
});

test(() => {
  assert.equal(
    counter,
    4,
    'value incremented by 1 from beforeEach with immediate option and by 1 from previous test with afterEach should be 4'
  );
});

afterEachHelper.pause();
beforeEachHelper.pause();

test(() => {
  assert.equal(
    counter,
    5,
    'value should still 5 by pausing both beforeEach and afterEach, considering the abscence of beforeEach effect'
  );
});

test(() => {
  assert.equal(
    counter,
    5,
    'value should still 5 by pausing both beforeEach and afterEach, considering the the abscence of beforeEach and afterEach (from previous test) effects'
  );
});

afterEachHelper.continue();
beforeEachHelper.continue();

test(() => {
  assert.equal(
    counter,
    6,
    'value incremented by 1 from unpausing beforeEach should be 6'
  );
});

test(() => {
  assert.equal(
    counter,
    8,
    'value incremented by 1 from beforeEach and 1 by previous test with afterEach should be 8'
  );
});

beforeEachHelper.reset();
afterEachHelper.reset();

test(() => {
  assert.equal(
    counter,
    9,
    'value should still 9 by reseting both beforeEach and afterEach'
  );
});
