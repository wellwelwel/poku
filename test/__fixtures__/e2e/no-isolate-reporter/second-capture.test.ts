import { assert, it } from '../../../../src/modules/index.js';
import { captureAssertions } from '../../../../src/modules/plugins.js';

await captureAssertions(() =>
  it('discarded test in the second run', () => {
    assert.ok(true, 'discarded in the second run');
  })
);

assert.ok(true, 'reported in the second run');
