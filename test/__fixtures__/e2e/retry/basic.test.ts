import { assert, it, retry } from '../../../../src/modules/index.js';

let attempts = 0;

await retry(3, () => {
  it('should succeed on third attempt', () => {
    attempts++;
    assert.strictEqual(attempts, 3, 'Should be third attempt');
  });
});

it('should have attempted 3 times', () => {
  assert.strictEqual(attempts, 3);
});
