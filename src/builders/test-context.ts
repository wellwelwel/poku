import type { TestContext } from '../@types/poku.js';
import { assertSnapshot } from '../parsers/snapshot.js';
import { processAssert } from '../services/assert.js';

export const createTestContext = (itTitle: string | undefined): TestContext => {
  let counters: Map<string, number> | undefined;

  return {
    snapshot: (value, hint) =>
      processAssert(
        () =>
          assertSnapshot(value, hint, {
            itTitle,
            counters: (counters ??= new Map()),
          }),
        {
          message: hint,
          defaultMessage: 'Snapshot does not match',
          actual: 'Received',
          expected: 'Snapshot',
        }
      ),
  };
};
