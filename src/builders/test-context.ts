import type { ScopedTestContext, TestContext } from '../@types/poku.js';
import type { assertSnapshot } from '../parsers/snapshot.js';
import { processAssert } from '../services/assert.js';

let testFileResolved = false;

export const createTestContext = (
  itTitle: string | undefined,
  requestAssertSnapshot: () => Promise<typeof assertSnapshot>
): ScopedTestContext => {
  let counters: Map<string, number> | undefined;
  let pending: Promise<void> | undefined;

  const context: TestContext = {
    snapshot: (value, hint) => {
      if (!counters) counters = new Map();

      const stack = testFileResolved ? undefined : new Error().stack;
      const activeCounters = counters;

      const run = async () => {
        const assert = await requestAssertSnapshot();

        processAssert(
          () =>
            assert(value, hint, { itTitle, counters: activeCounters, stack }),
          {
            message: hint,
            defaultMessage: 'Snapshot does not match',
            actual: 'Received',
            expected: 'Snapshot',
          }
        );

        testFileResolved = true;
      };

      pending = pending ? pending.then(run) : run();
    },
  };

  return {
    context,
    flush: () => pending,
  };
};
