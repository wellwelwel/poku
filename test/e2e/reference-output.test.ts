import { strict as nodeAssert } from 'node:assert';
import { normalize } from 'node:path';
import { ext, inspectPoku } from '../__utils__/capture-cli.test.js';
import { reportLines } from '../__utils__/report-lines.test.js';
import { describe, it } from '../../src/modules/index.js';

const fixture = `test/__fixtures__/e2e/reference-output/suite.test.${ext}`;

const assertionDetails = [
  '            Code ERR_ASSERTION',
  '        Operator strictEqual',
  '        Actual:',
  '        1 [fail]',
  '        Expected:',
  '        2 [success]',
];

const expectedLines = [
  `› ${normalize(fixture)} [fail]`,
  '  ◌ sync suite',
  '    ◌ first',
  '      ✔ first passes [success]',
  '    ● first [success]',
  '    ◌ second',
  '      ◌ nested',
  '        ✔ nested passes [success]',
  '      ● nested [success]',
  '    ● second [success]',
  '  ● sync suite [success]',
  '  ◌ async suite',
  '    ◌ fails',
  '      ✘ failure [fail]',
  ...assertionDetails,
  '    ● fails [fail]',
  '    ◌ recovers',
  '      ↻ Retry 1/2',
  '      ✘ second attempt [fail]',
  ...assertionDetails,
  '      ↻ Retry 2/2',
  '      ✔ second attempt [success]',
  '      ✔ Retry succeeded [success]',
  '    ● recovers [success]',
  '    ◯ skipped',
  '    ● pending',
  '    ✔ untitled passes [success]',
  '  ● async suite [fail]',
  '  ✔ hooks ran around every test [success]',
];

await describe('Reference output of an ordinary suite', async () => {
  for (const isolation of ['process', 'none']) {
    await it(`keeps the order, icons, indentation, and status colors with ${isolation} isolation`, async () => {
      const result = await inspectPoku(`${fixture} --isolation=${isolation}`);

      nodeAssert.strictEqual(result.exitCode, 1, result.stdout + result.stderr);
      nodeAssert.deepStrictEqual(reportLines(result.stdout), expectedLines);
    });
  }
});
