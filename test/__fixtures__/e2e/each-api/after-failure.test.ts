import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import {
  afterEach,
  assert,
  beforeEach,
  describe,
  log,
  test,
} from '../../../../src/modules/index.js';

const testDir = '../../.temp/after-failure';
const testFile = `${testDir}/each-hook`;

const clearFixture = async () => {
  try {
    await rm(testFile);
    await rm(testDir, { recursive: true, force: true });
    log('  - Cleaning');
  } catch {}
};

const writeFixture = async () => {
  await mkdir(testDir);
  await writeFile(testFile, 'test', 'utf8');
  log('  - Writing');
};

const toTest = async (message: string) => {
  await readFile(testFile, 'utf8');
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
  await clearFixture();

  await test('first test', async () => {
    log('  before first test');

    assert(true, await toTest('first test'));

    log('  after first test');
  });

  await writeFixture();
  await test('Force failure', async () => {
    log('  before first test');

    assert(true, await toTest('first test'));

    log('  after first test');
  });
});
