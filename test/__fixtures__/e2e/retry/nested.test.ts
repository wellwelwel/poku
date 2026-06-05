import { assert, it, retry } from '../../../../src/modules/index.js';

let outerAttempts = 0;
let innerAttempts = 0;

await retry(2, async () => {
  outerAttempts++;

  await retry(2, () => {
    it('nested test', () => {
      innerAttempts++;
      assert.strictEqual(innerAttempts, 2, 'Should be second inner attempt');
    });
  });
});

it('should have correct attempt counts', () => {
  assert.strictEqual(outerAttempts, 1);
  assert.strictEqual(innerAttempts, 2);
});
