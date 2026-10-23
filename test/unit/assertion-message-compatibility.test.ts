import { AssertionError, strict as nodeAssert } from 'node:assert';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

process.exitCode ??= 0;

await describe('Assertion error compatibility', async () => {
  await it('preserves generated comparison messages and reporter labels', () => {
    let expectedError!: AssertionError;
    try {
      nodeAssert.strictEqual(1, 2);
    } catch (error) {
      nodeAssert.ok(error instanceof AssertionError);
      expectedError = error;
    }
    const previousExitCode = process.exitCode;
    const originalFailure = GLOBAL.reporter.onAssertionFailure;
    const labels: unknown[] = [];
    GLOBAL.reporter.onAssertionFailure = ({ assertOptions }) => {
      labels.push(assertOptions.message);
    };

    try {
      for (const message of [undefined, 'comparison label']) {
        nodeAssert.throws(
          () => assert.strictEqual(1, 2, message),
          (error: unknown) => {
            nodeAssert.ok(error instanceof AssertionError);
            nodeAssert.strictEqual(
              error.generatedMessage,
              expectedError.generatedMessage
            );
            nodeAssert.match(
              error.message,
              /1.*(?:!==|!=|not).*2|strictly equal/s
            );
            nodeAssert.strictEqual(error.actual, 1);
            nodeAssert.strictEqual(error.expected, 2);
            nodeAssert.strictEqual(error.operator, 'strictEqual');
            return true;
          }
        );
      }
      nodeAssert.deepStrictEqual(labels, [undefined, 'comparison label']);
    } finally {
      GLOBAL.reporter.onAssertionFailure = originalFailure;
      process.exitCode = previousExitCode ?? 0;
    }
  });
});
