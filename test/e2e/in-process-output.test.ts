import { strict as nodeAssert } from 'node:assert';
import {
  ext,
  inspectPoku,
  isBuild,
  stripAnsi,
} from '../__utils__/capture-cli.test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

const cwd = 'test/__fixtures__/e2e/no-isolate';
const moduleExtension = isBuild ? 'mjs' : 'mts';

await describe('In-process output compatibility', async () => {
  await it('flushes stdout and stderr callbacks asynchronously and finishes reporting', async () => {
    const result = await inspectPoku(
      `stream-callbacks.test.${moduleExtension} --isolation=none --debug`,
      { cwd, timeout: 10000 }
    );
    const output = stripAnsi(result.stdout);
    nodeAssert.strictEqual(result.exitCode, 0, result.stdout + result.stderr);
    for (const stream of ['stdout', 'stderr']) {
      nodeAssert.match(output, new RegExp(`${stream} string flushed`));
      nodeAssert.match(output, new RegExp(`${stream} buffer flushed`));
      nodeAssert.match(output, new RegExp(`${stream} bytes á flushed`));
      nodeAssert.match(output, new RegExp(`${stream} callbacks completed`));
    }
    nodeAssert.match(output, /PASS\s*›\s*1/);
    nodeAssert.match(output, /FAIL\s*›\s*0/);
  });

  for (const [fixture, label] of [
    ['top-level-assertion', 'Assertion Error'],
    ['top-level-assertion-label', 'top-level labeled failure'],
  ]) {
    await it(`preserves ${fixture} diagnostics without appending an assertion stack`, async () => {
      const result = await inspectPoku(
        `${fixture}.test.${moduleExtension} --isolation=none`,
        { cwd }
      );
      const output = stripAnsi(result.stdout + result.stderr);
      nodeAssert.strictEqual(result.exitCode, 1);
      nodeAssert.match(output, new RegExp(`✘ ${label}`));
      nodeAssert.match(output, /Operator\s+strictEqual/);
      nodeAssert.match(output, /Actual:\s+1/);
      nodeAssert.match(output, /Expected:\s+2/);
      nodeAssert.match(output, /FAIL\s*›\s*1/);
      nodeAssert.doesNotMatch(output, /AssertionError \[ERR_ASSERTION\]/);
      nodeAssert.doesNotMatch(output, /at processAssert/);
    });
  }

  await it('retains diagnostics for an ordinary top-level error', async () => {
    const result = await inspectPoku(`throw.test.${ext} --isolation=none`, {
      cwd,
    });
    nodeAssert.strictEqual(result.exitCode, 1);
    nodeAssert.match(result.stdout + result.stderr, /Error: Top-level throw/);
  });
});
