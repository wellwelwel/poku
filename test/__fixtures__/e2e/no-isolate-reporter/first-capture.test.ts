import { assert } from '../../../../src/modules/index.js';
import { captureAssertions } from '../../../../src/modules/plugins.js';

await captureAssertions(() => {
  assert.ok(true, 'discarded in the first run');
});
