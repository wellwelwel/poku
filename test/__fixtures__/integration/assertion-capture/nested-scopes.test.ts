import { strict as nodeAssert } from 'node:assert';
import { assert, it, retry } from '../../../../src/modules/index.js';
import { captureAssertions } from '../../../../src/modules/plugins.js';

const scenario = process.env.CAPTURE_SCENARIO!;
let attempts = 0;

if (scenario === 'capture-in-retry') {
  await retry(2, async () => {
    attempts++;
    const result = await captureAssertions(() =>
      assert.strictEqual(attempts, 2, `attempt ${attempts}`)
    );
    result.report();
  });
  nodeAssert.strictEqual(attempts, 2);
} else {
  const result = await captureAssertions(async () => {
    if (scenario.startsWith('it-')) {
      await it('captured test', () => {
        if (scenario.includes('error')) throw new Error('native test failure');
        assert.strictEqual(1, 2, 'captured assertion failure');
      });
      return;
    }

    await retry(2, async () => {
      attempts++;
      const check = () =>
        assert.strictEqual(
          attempts,
          scenario.includes('exhaust') ? 3 : 2,
          `attempt ${attempts}`
        );
      if (scenario.startsWith('retry-it-')) await it('retry test', check);
      else if (scenario === 'retry-caught-recover') {
        try {
          check();
        } catch {}
      } else check();
    });
  });

  console.log(`capture status:${result.status}`);
  if (scenario.endsWith('report') || scenario.includes('recover')) {
    result.report();
    result.report();
  }
  if (scenario.startsWith('retry-')) nodeAssert.strictEqual(attempts, 2);
}
