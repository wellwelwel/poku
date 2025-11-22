import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { shared } from '../../src/modules/helpers/shared-resources.js';
import { test } from '../../src/modules/helpers/test.js';

const TestContext = {
  name: 'test-resource',
  factory: () => ({
    value: 0,
    inc() {
      this.value++;
      return this.value;
    },
    getValue() {
      return this.value;
    },
  }),
  cleanup: () => {
    console.log('Cleaning up test-resource');
  },
};

describe(async () => {
  await test('should use shared resource v2', async () => {
    const resource = await shared(TestContext);

    assert.strictEqual(
      await resource.getValue(),
      0,
      'Initial value should be 0'
    );
    assert.strictEqual(await resource.inc(), 1, 'Value should be 1 after inc');
    assert.strictEqual(await resource.getValue(), 1, 'Value should be 1');
  });

  await test('should share state across calls', async () => {
    const resource = await shared(TestContext);

    assert.strictEqual(
      await resource.getValue(),
      1,
      'Value should be 1 from previous test'
    );
    assert.strictEqual(await resource.inc(), 2, 'Value should be 2');
  });
});
