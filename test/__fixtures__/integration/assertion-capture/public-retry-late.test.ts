import { assert, it, retry } from '../../../../src/modules/index.js';

await retry(2, () => {
  it('async test that is not awaited', async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.strictEqual(1, 2, 'late failure');
  });
});
