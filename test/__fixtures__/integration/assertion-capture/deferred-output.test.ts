import { assert, it } from '../../../../src/modules/index.js';
import { captureAssertions } from '../../../../src/modules/plugins.js';

const scenario = process.env.CAPTURE_OUTPUT_SCENARIO;

const checkStatus = (attempt: number) => () => {
  assert.strictEqual(attempt, 2, `status on attempt ${attempt}`);
};

const nestedTests = () =>
  it('outer test', () => {
    it('inner test', () => {
      assert.strictEqual(1, 2, 'inner assertion');
    });
  });

if (scenario === 'discard')
  await captureAssertions(() => it('discarded test', checkStatus(1)));

if (scenario === 'polling') {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const result = await captureAssertions(() =>
      it(`attempt ${attempt}`, checkStatus(attempt))
    );

    if (result.status === 'passed' || attempt === 3) {
      result.report();
      break;
    }
  }
}

if (scenario === 'polling-direct') it('attempt 2', checkStatus(2));

if (scenario === 'nested') (await captureAssertions(nestedTests)).report();

if (scenario === 'nested-direct') nestedTests();
