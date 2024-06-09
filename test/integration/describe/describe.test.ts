import { describe } from '../../../src/modules/describe.js';
import { test } from '../../../src/modules/test.js';

describe('Testing "describe" method', {
  icon: '🔬',
});

test('Using as titles', () => {
  describe('');
  describe('', {});
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
