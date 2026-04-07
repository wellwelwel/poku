import { assert } from '../../src/modules/essentials/assert.js';
import { test } from '../../src/modules/helpers/test.js';
import { defineConfig } from '../../src/modules/index.js';
import { definePlugin } from '../../src/modules/plugins.js';

test('defineConfig', () => {
  const config = defineConfig({ include: ['.'] });
  assert.deepStrictEqual(
    config,
    { include: ['.'] },
    'Returns the config object'
  );
});

test('definePlugin', () => {
  const plugin = definePlugin({ name: 'test-plugin' });
  assert.strictEqual(plugin.name, 'test-plugin', 'Returns the plugin object');
});
