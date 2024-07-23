import {
  beforeEach,
  afterEach,
  log,
  test,
  assert,
} from '../../src/modules/index.js';

const clearFixture = () => log('  - Cleaning');
const writeFixture = () => log('  - Writing');

beforeEach(() => {
  log('- before beforeEach writeFixture');

  writeFixture();

  log('- after beforeEach writeFixture');

  return true;
});

afterEach(() => {
  log('- before afterEach clearFixture');

  clearFixture();

  log('- after afterEach clearFixture');

  return true;
});

test('first test', () => {
  log('  before first test');

  assert(true, 'first test');

  log('  after first test');
});

test('second test', () => {
  log('  before second test');

  assert(true, 'second test');

  log('  after second test');
});
