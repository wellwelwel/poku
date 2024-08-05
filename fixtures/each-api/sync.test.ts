import {
  beforeEach,
  afterEach,
  log,
  test,
  describe,
  assert,
} from '../../src/modules/index.js';

const clearFixture = () => {
  log('  - Cleaning');
};

const writeFixture = () => {
  log('  - Writing');
};

const toTest = (message: string) => {
  return message;
};

beforeEach(() => {
  log('- before beforeEach writeFixture');

  writeFixture();

  log('- after beforeEach writeFixture');
});

afterEach(() => {
  log('- before afterEach clearFixture');

  clearFixture();

  log('- after afterEach clearFixture');
});

describe(() => {
  test('first test', () => {
    log('  before first test');

    assert(true, toTest('first test'));

    log('  after first test');
  });

  test('second test', () => {
    log('  before second test');

    assert(true, toTest('second test'));

    log('  after second test');
  });
});
