import { test } from '../../../src/modules/helpers/test.js';

test('Testing "test" overloads', async () => {
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
