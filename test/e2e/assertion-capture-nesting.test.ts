import { strict as nodeAssert } from 'node:assert';
import { ext, inspectPoku, stripAnsi } from '../__utils__/capture-cli.test.js';
import { describe, it } from '../../src/modules/index.js';

await describe('Assertion capture with test and retry scopes', async () => {
  for (const isolation of ['process', 'none']) {
    for (const scenario of [
      'it-discard',
      'it-report',
      'it-error-discard',
      'it-error-report',
      'retry-recover',
      'retry-it-recover',
      'retry-caught-recover',
      'retry-it-exhaust-discard',
      'retry-it-exhaust-report',
      'retry-exhaust-discard',
      'retry-exhaust-report',
      'capture-in-retry',
    ]) {
      await it(`${scenario} with ${isolation} isolation`, async () => {
        const result = await inspectPoku(
          `test/__fixtures__/integration/assertion-capture/nested-scopes.test.${ext} --debug --isolation=${isolation}`,
          { env: { ...process.env, CAPTURE_SCENARIO: scenario } }
        );
        const output =
          stripAnsi(result.stdout).split('test file(s) failed:')[0] +
          stripAnsi(result.stderr);
        nodeAssert.strictEqual(
          result.exitCode,
          scenario.endsWith('report') ? 1 : 0,
          output
        );

        if (scenario !== 'capture-in-retry') {
          nodeAssert.match(
            output,
            scenario.includes('recover')
              ? /capture status:passed/
              : /capture status:failed/
          );
        }

        if (scenario.startsWith('it-')) {
          const message = scenario.includes('error')
            ? /(?:Error|error): native test failure/g
            : /captured assertion failure/g;
          nodeAssert.strictEqual(
            (output.match(message) ?? []).length,
            scenario.endsWith('report') ? 1 : 0,
            output
          );
        }

        if (scenario.startsWith('retry-')) {
          nodeAssert.doesNotMatch(output, /[✘✔] attempt 1/);
          if (scenario.endsWith('discard')) {
            nodeAssert.doesNotMatch(output, /[✘✔] attempt 2/);
          } else {
            nodeAssert.match(
              output,
              scenario.includes('recover') ? /✔ attempt 2/ : /✘ attempt 2/
            );
          }
        }
      });
    }
  }
});
