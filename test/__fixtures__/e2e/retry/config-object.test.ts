import { assert, it, retry } from '../../../../src/modules/index.js';

let attempts = 0;

await retry({ attempts: 2 }, () => {
  it('should succeed on second attempt', () => {
    attempts++;
    assert.strictEqual(attempts, 2, 'Should be second attempt');
  });
});

it('should have attempted 2 times', () => {
  assert.strictEqual(attempts, 2);
});
