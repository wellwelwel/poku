import { assert, it } from '../../../../src/modules/index.js';

it('passing test', () => {
  assert.ok(true, 'passing assertion');
});

it('failing test', () => {
  assert.strictEqual(1, 2, 'failing assertion');
});
