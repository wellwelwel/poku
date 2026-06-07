import { assert, it, retry } from '../../../../src/modules/index.js';

let attempts = 0;

await retry(3, () => {
  it('should succeed immediately', () => {
    attempts++;
    assert.strictEqual(attempts, 1, 'Should be first attempt');
  });
});

it('should have attempted only once', () => {
  assert.strictEqual(attempts, 1);
});
