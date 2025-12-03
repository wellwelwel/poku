import { assert } from '../../src/modules/essentials/assert.js';
import { ResourceRegistry } from '../../src/modules/helpers/resource-registry.js';
import { test } from '../../src/modules/helpers/test.js';

test('ResourceRegistry', () => {
  const registry = new ResourceRegistry<string>();

  test('should register and retrieve a resource', () => {
    registry.register('test-resource', 'test-value');
    assert.strictEqual(
      registry.get('test-resource'),
      'test-value',
      'Resource retrieved correctly'
    );
  });

  test('should check if a resource exists', () => {
    assert.strictEqual(registry.has('test-resource'), true, 'Resource exists');
    assert.strictEqual(
      registry.has('non-existent'),
      false,
      'Resource does not exist'
    );
  });

  test('should manage isRegistering state', () => {
    assert.strictEqual(
      registry.getIsRegistering(),
      false,
      'Initial state is false'
    );
    registry.setIsRegistering(true);
    assert.strictEqual(
      registry.getIsRegistering(),
      true,
      'State updated to true'
    );
    registry.setIsRegistering(false);
    assert.strictEqual(
      registry.getIsRegistering(),
      false,
      'State updated to false'
    );
  });

  test('should return the entire registry', () => {
    const reg = registry.getRegistry();
    assert.deepStrictEqual(
      reg,
      { 'test-resource': 'test-value' },
      'Registry object returned'
    );
  });

  test('should clear the registry', () => {
    registry.clear();
    assert.strictEqual(
      registry.has('test-resource'),
      false,
      'Registry cleared'
    );
    assert.deepStrictEqual(
      registry.getRegistry(),
      {},
      'Registry object is empty'
    );
  });
});
