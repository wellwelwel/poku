import { assert } from '../../../../src/modules/index.js';
import { captureAssertions } from '../../../../src/modules/plugins.js';

await captureAssertions(() => {
  assert.ok(true, 'discarded attempt');
});

const reportedAttempt = await captureAssertions(() => {
  assert.ok(true, 'reported attempt');
});

reportedAttempt.report();
