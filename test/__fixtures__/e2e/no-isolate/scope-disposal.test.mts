import { GLOBAL } from '../../../../src/configs/poku.js';
import { describe, it } from '../../../../src/modules/index.js';

const counts = new Map<string | undefined, number>();
const originalEnd = GLOBAL.reporter.onItEnd;
GLOBAL.reporter.onItEnd = (result) => {
  counts.set(result.title, (counts.get(result.title) ?? 0) + 1);
  console.log(`scope-end:${result.title}:${result.success}`);
  originalEnd(result);
};

(globalThis as Record<symbol, unknown>)[
  Symbol.for('@pokujs/poku.test-scope-hooks')
] = {
  createHolder: () => ({ scope: undefined }),
  runScoped: async (_holder: unknown, callback: () => Promise<void>) => {
    await callback();
    throw new Error('scope disposal failed');
  },
};

await describe('suite with failing scope disposal', async () => {
  await it('first', () => {
    console.log('first body executed');
  });
  await it('second', () => {
    console.log('second body executed');
  });
});

console.log(`scope-counts:${JSON.stringify([...counts])}`);
