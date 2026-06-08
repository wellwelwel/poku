import { assert, it, retry } from '../../../../src/modules/index.js';

let attempts = 0;

const delay = 200;
const start = process.hrtime.bigint();

await retry({ attempts: 2, delay }, () => {
  it('should succeed on second attempt', () => {
    attempts++;
    assert.strictEqual(attempts, 2, 'Should be second attempt');
  });
});

const elapsed = Number(process.hrtime.bigint() - start) / 1e6;

it('should wait the configured delay between attempts', () => {
  assert.strictEqual(attempts, 2, 'should have attempted 2 times');
  assert.ok(
    elapsed >= delay,
    'should have waited at least the configured delay'
  );
});
