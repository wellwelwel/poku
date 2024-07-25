import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import {
  beforeEach,
  afterEach,
  log,
  test,
  describe,
  assert,
} from '../../src/modules/index.js';

const testDir = '../../.temp';
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
  await writeFile(testFile, 'test', 'utf-8');
  log('  - Writing');
};

const toTest = async (message: string) => {
  await readFile(testFile, 'utf-8');
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
