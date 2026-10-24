import { strict as nodeAssert } from 'node:assert';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

await describe('Scope disposal failure reporting', async () => {
  for (const isolation of ['process', 'none']) {
    await it(`fails each test and continues with ${isolation} isolation`, async () => {
      const extension = isBuild ? 'mjs' : 'mts';
      const result = await inspectPoku(
        `scope-disposal.test.${extension} --isolation=${isolation} --debug`,
        { cwd: 'test/__fixtures__/e2e/no-isolate' }
      );
      nodeAssert.strictEqual(result.exitCode, 1);
      nodeAssert.match(result.stdout, /first body executed/);
      nodeAssert.match(result.stdout, /second body executed/);
      nodeAssert.match(result.stdout, /scope-end:first:false/);
      nodeAssert.match(result.stdout, /scope-end:second:false/);
      nodeAssert.match(
        result.stdout,
        /scope-counts:\[\["first",1\],\["second",1\]\]/
      );
    });
  }
});
