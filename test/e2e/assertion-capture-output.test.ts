import { strict as nodeAssert } from 'node:assert';
import { ext, inspectPoku } from '../__utils__/capture-cli.test.js';
import { reportLines } from '../__utils__/report-lines.test.js';
import { describe, it } from '../../src/modules/index.js';

const fixture = `test/__fixtures__/integration/assertion-capture/deferred-output.test.${ext}`;

const runScenario = (scenario: string, isolation: string) =>
  inspectPoku(`${fixture} --isolation=${isolation}`, {
    env: { ...process.env, CAPTURE_OUTPUT_SCENARIO: scenario },
  });

await describe('Output of tests deferred by an assertion capture', async () => {
  for (const isolation of ['process', 'none']) {
    await it(`prints nothing for a discarded test with ${isolation} isolation`, async () => {
      const captured = await runScenario('discard', isolation);
      const empty = await runScenario('empty', isolation);

      nodeAssert.strictEqual(captured.exitCode, 0, captured.stdout);
      nodeAssert.deepStrictEqual(
        reportLines(captured.stdout),
        reportLines(empty.stdout)
      );
    });

    await it(`prints only the winning polling attempt, as a direct test would, with ${isolation} isolation`, async () => {
      const captured = await runScenario('polling', isolation);
      const direct = await runScenario('polling-direct', isolation);

      nodeAssert.match(reportLines(direct.stdout).join('\n'), /◌ attempt 2/);
      nodeAssert.strictEqual(captured.exitCode, direct.exitCode);
      nodeAssert.deepStrictEqual(
        reportLines(captured.stdout),
        reportLines(direct.stdout)
      );
    });

    await it(`replays nested tests in their hierarchy, as a direct run would, with ${isolation} isolation`, async () => {
      const captured = await runScenario('nested', isolation);
      const direct = await runScenario('nested-direct', isolation);

      nodeAssert.match(
        reportLines(direct.stdout).join('\n'),
        /✘ inner assertion/
      );
      nodeAssert.strictEqual(captured.exitCode, direct.exitCode);
      nodeAssert.deepStrictEqual(
        reportLines(captured.stdout),
        reportLines(direct.stdout)
      );
    });
  }
});
