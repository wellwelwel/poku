import {
  beforeEach,
  afterEach,
  log,
  test,
  describe,
  assert,
  sleep,
} from '../../src/modules/index.js';

const clearFixture = async () => {
  await sleep(250);
  log('  - Cleaning');
};

const writeFixture = async () => {
  await sleep(250);
  log('  - Writing');
};

const toTest = async (message: string) => {
  await sleep(500);
  return message;
};

beforeEach(async () => {
  log('- before beforeEach writeFixture');

  await writeFixture();

  log('- after beforeEach writeFixture');
});

afterEach(async () => {
  log('- before afterEach clearFixture');

  await clearFixture();

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
