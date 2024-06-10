import { describe } from '../../../src/modules/describe.js';
import { it } from '../../../src/modules/it.js';

describe('Testing "it" method', {
  icon: '🔬',
});

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
  await it('', async () => await new Promise((resolve) => resolve(undefined)));
});
