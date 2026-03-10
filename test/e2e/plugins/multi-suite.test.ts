import { GLOBAL, results } from '../../../src/configs/poku.js';
import { poku } from '../../../src/modules/essentials/poku.js';
import { multiSuite } from '../../../src/plugins/multi-suite/index.js';
import { reporter as reporterRegistry } from '../../../src/services/reporter.js';
import { errors } from '../../../src/services/reporters/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';

// Empty dir prevents the outer poku from scanning and running any test files.
// The inner suites use their own `include` paths.
const OUTER_DIR = 'test/__fixtures__/e2e/plugins/multi-suite/empty';

const runPlugin = async (
  suites: Parameters<typeof multiSuite>[0]
): Promise<{ exitCode: 0 | 1; passed: number; failed: number }> => {
  results.passed = results.failed = results.skipped = results.todo = 0;
  errors.length = 0;
  GLOBAL.configs = {} as (typeof GLOBAL)['configs'];
  GLOBAL.reporter = reporterRegistry['poku']();

  const originalExit = process.exit;
  let exitCode: 0 | 1 = 0;

  (process as NodeJS.Process).exit = ((code?: number) =>
    void (exitCode = code === 0 ? 0 : 1)) as typeof process.exit;

  try {
    await poku(OUTER_DIR, {
      quiet: true,
      plugins: [multiSuite(suites)],
    });
  } finally {
    process.exit = originalExit;
  }

  return { exitCode, passed: results.passed, failed: results.failed };
};

describe('Plugin: multi-suite', async () => {
  await it('defaults to "." when include is omitted', async () => {
    // filter: /^$/ prevents any file from matching — just exercises the dirs = ['.'] branch
    const { exitCode } = await runPlugin([{ filter: /^$/ }]);

    assert.strictEqual(exitCode, 0);
  });

  await it('processes envFile before running the suite', async () => {
    const { exitCode, passed } = await runPlugin([
      {
        include: 'test/__fixtures__/e2e/plugins/multi-suite/env-file/suite',
        envFile: 'test/__fixtures__/e2e/plugins/multi-suite/env-file/.env.test',
      },
    ]);

    assert.strictEqual(exitCode, 0);
    assert.strictEqual(passed, 1);
  });

  await it('processes kill options (port, range, pid) before running the suite', async () => {
    const { exitCode, passed } = await runPlugin([
      {
        include: 'test/__fixtures__/e2e/plugins/multi-suite/accumulated-results/suite-b',
        kill: {
          port: [59998],
          range: [[59996, 59997]],
          pid: [999999],
        },
      },
    ]);

    assert.strictEqual(exitCode, 0);
    assert.strictEqual(passed, 1);
  });

  await it('accumulates results across all suites', async () => {
    const { exitCode, passed, failed } = await runPlugin([
      { include: 'test/__fixtures__/e2e/plugins/multi-suite/accumulated-results/suite-a' },
      { include: 'test/__fixtures__/e2e/plugins/multi-suite/accumulated-results/suite-b' },
    ]);

    assert.strictEqual(exitCode, 0);
    assert.strictEqual(passed, 3, '2 from suite-a + 1 from suite-b');
    assert.strictEqual(failed, 0);
  });

  await it('suite B runs even when suite A fails (isolation)', async () => {
    const { exitCode, passed, failed } = await runPlugin([
      { include: 'test/__fixtures__/e2e/plugins/multi-suite/isolation/suite-a' },
      { include: 'test/__fixtures__/e2e/plugins/multi-suite/isolation/suite-b' },
    ]);

    assert.strictEqual(exitCode, 1, 'Exit code must reflect the failure in suite A');
    assert.strictEqual(passed, 2, 'Suite B results must be counted');
    assert.strictEqual(failed, 1, 'Suite A failure must be counted');
  });
});
