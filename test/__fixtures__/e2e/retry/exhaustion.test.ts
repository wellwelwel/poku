import { assert, it, retry } from '../../../../src/modules/index.js';

await retry(2, () => {
  it('should always fail', () => {
    assert.strictEqual(1, 2, 'Should always fail');
  });
});
