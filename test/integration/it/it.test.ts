import { test } from '../../../src/modules/helpers/test.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';

test('Testing "it" overloads', () => {
  describe(async () => {
    it(() => {});
    it(() => true);
    it(() => false);
    it(() => undefined);
    it(() => new Promise((resolve) => resolve(undefined)));
    it(async () => await new Promise((resolve) => resolve(undefined)));

    await it(() => new Promise((resolve) => resolve(undefined)));
    await it(async () => await new Promise((resolve) => resolve(undefined)));
  });

  describe(async () => {
    it('', () => {});
    it('', () => true);
    it('', () => false);
    it('', () => undefined);
    it('', () => new Promise((resolve) => resolve(undefined)));
    it('', async () => await new Promise((resolve) => resolve(undefined)));

    await it('', () => new Promise((resolve) => resolve(undefined)));
    await it('', async () =>
      await new Promise((resolve) => resolve(undefined)));
  });

  it('it without describe', async () =>
    await new Promise((resolve) => resolve(undefined)));
});

it('it without scope', async () =>
  await new Promise((resolve) => resolve(undefined)));
