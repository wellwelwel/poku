import { strict as nodeAssert } from 'node:assert';
import { AsyncLocalStorage } from 'node:async_hooks';
import { each } from '../../src/configs/each.js';
import { GLOBAL } from '../../src/configs/poku.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it, itBase } from '../../src/modules/helpers/it.js';

const scopeHooksKey = Symbol.for('@pokujs/poku.test-scope-hooks');
const scopeGlobals = globalThis as Record<symbol, unknown>;

describe('Scope hook lifecycle regressions', async () => {
  await it('finishes synchronous reporting before the next test starts', async () => {
    const originalHooks = scopeGlobals[scopeHooksKey];
    const originalOnEnd = GLOBAL.reporter.onItEnd;
    const calls: string[] = [];
    scopeGlobals[scopeHooksKey] = undefined;
    GLOBAL.reporter.onItEnd = () => {
      calls.push('end');
    };
    try {
      const result = itBase('synchronous test', () => {
        calls.push('body');
      });
      calls.push('next');
      await result;
      nodeAssert.deepStrictEqual(calls, ['body', 'end', 'next']);
    } finally {
      scopeGlobals[scopeHooksKey] = originalHooks;
      GLOBAL.reporter.onItEnd = originalOnEnd;
    }
  });

  await it('forwards scope provider parameters to the test callback', async () => {
    const originalHooks = scopeGlobals[scopeHooksKey];
    let received: Record<string, unknown> | undefined;
    scopeGlobals[scopeHooksKey] = {
      createHolder: () => ({ scope: undefined }),
      runScoped: async (
        _holder: unknown,
        callback: (params: Record<string, unknown>) => Promise<void>
      ) => callback({ token: 42 }),
    };
    try {
      await itBase((params) => {
        received = params;
      });
    } finally {
      scopeGlobals[scopeHooksKey] = originalHooks;
    }
    nodeAssert.deepStrictEqual(received, { token: 42 });
  });

  await it('runs afterEach once inside the scope when scope disposal fails', async () => {
    const originalHooks = scopeGlobals[scopeHooksKey];
    const originalAfter = each.after.cb;
    const storage = new AsyncLocalStorage<boolean>();
    const calls: Array<boolean | undefined> = [];
    const cleanupError = new Error('scope disposal failed');
    scopeGlobals[scopeHooksKey] = {
      createHolder: () => ({ scope: undefined }),
      runScoped: async (_holder: unknown, callback: () => Promise<void>) => {
        await storage.run(true, callback);
        throw cleanupError;
      },
    };
    each.after.cb = () => {
      calls.push(storage.getStore());
    };
    try {
      await nodeAssert.rejects(
        itBase(() => {}),
        cleanupError
      );
    } finally {
      each.after.cb = originalAfter;
      scopeGlobals[scopeHooksKey] = originalHooks;
    }
    nodeAssert.deepStrictEqual(calls, [true]);
  });

  await it('runs afterEach inside the scope when beforeEach fails', async () => {
    const originalHooks = scopeGlobals[scopeHooksKey];
    const originalBefore = each.before.cb;
    const originalAfter = each.after.cb;
    const storage = new AsyncLocalStorage<boolean>();
    const calls: Array<boolean | undefined> = [];
    const setupError = new Error('setup failed');
    scopeGlobals[scopeHooksKey] = {
      createHolder: () => ({ scope: undefined }),
      runScoped: async (_holder: unknown, callback: () => Promise<void>) =>
        storage.run(true, callback),
    };
    each.before.cb = () => {
      throw setupError;
    };
    each.after.cb = () => {
      calls.push(storage.getStore());
    };
    try {
      await nodeAssert.rejects(
        itBase(() => {}),
        setupError
      );
    } finally {
      each.before.cb = originalBefore;
      each.after.cb = originalAfter;
      scopeGlobals[scopeHooksKey] = originalHooks;
    }
    nodeAssert.deepStrictEqual(calls, [true]);
  });

  await it('does not repeat a throwing afterEach callback', async () => {
    const originalAfter = each.after.cb;
    const cleanupError = new Error('afterEach failed');
    let calls = 0;
    each.after.cb = () => {
      calls++;
      throw cleanupError;
    };
    try {
      await nodeAssert.rejects(
        itBase(() => {}),
        cleanupError
      );
    } finally {
      each.after.cb = originalAfter;
    }
    nodeAssert.strictEqual(calls, 1);
  });
});
