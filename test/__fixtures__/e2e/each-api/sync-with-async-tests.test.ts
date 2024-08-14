import {
  beforeEach,
  afterEach,
  log,
  test,
  describe,
  assert,
  sleep,
} from '../../../../src/modules/index.js';

const clearFixture = () => {
  log('  - Cleaning');
};

const writeFixture = () => {
  log('  - Writing');
};

const toTest = async (message: string) => {
  await sleep(500);
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

describe(async () => {
  await test('first test', async () => {
    log('  before first test');

    assert(true, await toTest('first test'));

    log('  after first test');
  });

  await test('second test', async () => {
    log('  before second test');

    assert(true, await toTest('second test'));

    log('  after second test');
  });
});
