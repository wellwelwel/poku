import { describe } from '../../../src/modules/helpers/describe.js';
import { log } from '../../../src/modules/helpers/log.js';
import { test } from '../../../src/modules/helpers/test.js';

describe('Testing "describe" method', {
  icon: '🔬',
});

test('Using as titles', () => {
  describe('');
  describe('', {});
  describe('Default');
  describe('Background (Boolean)', { background: true });
  describe('Background (String)', { background: 'blue' });
});

test('Using as functions', async () => {
  describe(() => {});
  describe(() => true);
  describe(() => false);
  describe(() => undefined);
  describe(() => new Promise((resolve) => resolve(undefined)));
  describe(async () => await new Promise((resolve) => resolve(undefined)));

  await describe(() => new Promise((resolve) => resolve(undefined)));
  await describe(
    async () => await new Promise((resolve) => resolve(undefined))
  );
});

test('Using as groups', async () => {
  describe('', () => {});
  describe('', () => true);
  describe('', () => false);
  describe('', () => undefined);
  describe('', () => new Promise((resolve) => resolve(undefined)));
  describe('', async () => await new Promise((resolve) => resolve(undefined)));

  await describe('', () => new Promise((resolve) => resolve(undefined)));
  await describe('', async () =>
    await new Promise((resolve) => resolve(undefined)));
});

test('Using log "mini" helper', () => {
  log('Custom Log');
});
