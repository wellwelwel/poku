import { assert } from '../../src/modules/essentials/assert.js';
import { test } from '../../src/modules/helpers/test.js';
import { defineConfig } from '../../src/modules/index.js';
import { composeScopeHooks, definePlugin } from '../../src/modules/plugins.js';

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

test('composeScopeHooks composes providers in registration order', async () => {
  const SCOPE_HOOKS_KEY = Symbol.for('@pokujs/poku.test-scope-hooks');
  const g = globalThis as Record<symbol, unknown>;
  const original = g[SCOPE_HOOKS_KEY];

  try {
    delete g[SCOPE_HOOKS_KEY];

    const calls: string[] = [];

    composeScopeHooks({
      name: 'provider-a',
      createHolder: () => ({ scope: { id: 'A' } }),
      runScoped: async (_holder, fn) => {
        calls.push('a:before');
        const result = fn();
        if (result instanceof Promise) await result;
        calls.push('a:after');
      },
    });

    const hooks = composeScopeHooks({
      name: 'provider-b',
      createHolder: () => ({ scope: { id: 'B' } }),
      runScoped: async (_holder, fn) => {
        calls.push('b:before');
        const result = fn();
        if (result instanceof Promise) await result;
        calls.push('b:after');
      },
    });

    const holder = hooks.createHolder();

    await hooks.runScoped(holder, () => {
      calls.push('manual:test:run');
    });

    const marker = calls.indexOf('manual:test:run');

    assert.ok(marker >= 2, 'Marker is wrapped by both providers');
    const beforeA = calls.lastIndexOf('a:before', marker);
    const beforeB = calls.lastIndexOf('b:before', marker);

    assert.ok(beforeA >= 0, 'A runs before callback');
    assert.ok(beforeB >= 0, 'B runs before callback');
    assert.ok(beforeA < beforeB, 'A enters before B');

    const afterB = calls.indexOf('b:after', marker);
    const afterA = calls.indexOf('a:after', marker);

    assert.ok(afterB > marker, 'B unwinds after callback');
    assert.ok(afterA > marker, 'A unwinds after callback');
    assert.ok(afterB < afterA, 'B unwinds before A');
  } finally {
    if (original === undefined) delete g[SCOPE_HOOKS_KEY];
    else g[SCOPE_HOOKS_KEY] = original;
  }
});

test('composeScopeHooks dedupes providers by name', () => {
  const SCOPE_HOOKS_KEY = Symbol.for('@pokujs/poku.test-scope-hooks');
  const g = globalThis as Record<symbol, unknown>;
  const original = g[SCOPE_HOOKS_KEY];

  try {
    delete g[SCOPE_HOOKS_KEY];

    const first = composeScopeHooks({
      name: 'provider-singleton',
      createHolder: () => ({ scope: undefined }),
      runScoped: async (_holder, fn) => {
        const result = fn();
        if (result instanceof Promise) await result;
      },
    });

    const second = composeScopeHooks({
      name: 'provider-singleton',
      createHolder: () => ({ scope: { replaced: true } }),
      runScoped: async (_holder, fn) => {
        const result = fn();
        if (result instanceof Promise) await result;
      },
    });

    assert.strictEqual(first, second, 'Provider is not composed twice');
  } finally {
    if (original === undefined) delete g[SCOPE_HOOKS_KEY];
    else g[SCOPE_HOOKS_KEY] = original;
  }
});
