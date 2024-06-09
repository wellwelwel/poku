import { describe } from '../../../src/modules/describe.js';
import { test } from '../../../src/modules/test.js';

describe('Testing "test" method', {
  icon: '🔬',
});

test(async () => {
  test(() => {});
  test(() => true);
  test(() => false);
  test(() => undefined);
  test(() => new Promise((resolve) => resolve(undefined)));
  test(async () => await new Promise((resolve) => resolve(undefined)));

  await test(() => new Promise((resolve) => resolve(undefined)));
  await test(async () => await new Promise((resolve) => resolve(undefined)));
});

test(async () => {
  test('', () => {});
  test('', () => true);
  test('', () => false);
  test('', () => undefined);
  test('', () => new Promise((resolve) => resolve(undefined)));
  test('', async () => await new Promise((resolve) => resolve(undefined)));

  await test('', () => new Promise((resolve) => resolve(undefined)));
  await test('', async () =>
    await new Promise((resolve) => resolve(undefined)));
});
