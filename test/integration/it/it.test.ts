import { test } from '../../../src/modules/test.js';
import { describe } from '../../../src/modules/describe.js';
import { it } from '../../../src/modules/it.js';

test('Testing "it" method', () => {
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
});
