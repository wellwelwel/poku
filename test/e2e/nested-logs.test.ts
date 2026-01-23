import { inspectPoku, stripAnsi } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';

describe('Nested Logs', async () => {
  const results = await inspectPoku('', {
    cwd: 'test/__fixtures__/e2e/logs',
  });

  if (results.exitCode !== 0) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 0);

  const actual = stripAnsi(results.stdout).split('\n');
  const offset = actual.findIndex((line) => line.includes('◌ A'));

  const expected = [
    // Nested describe
    '  ◌ A',
    '    ◌ B',
    '      ◌ C',
    '        ◌ D',
    '          ✔ Nested `describe`',
    '        ● D',
    '      ● C',
    '    ● B',
    '  ● A',

    // Nested it
    '  ◌ A',
    '    ◌ B',
    '      ◌ C',
    '        ◌ D',
    '          ✔ Nested `it`',
    '        ● D',
    '      ● C',
    '    ● B',
    '  ● A',

    // Nested describe + it
    '  ◌ A',
    '    ◌ B',
    '      ◌ C',
    '        ◌ D',
    '          ◌ E',
    '            ◌ F',
    '              ◌ G',
    '                ◌ H',
    '                  ✔ Nested `describe` + `it`',
    '                ● H',
    '              ● G',
    '            ● F',
    '          ● E',
    '        ● D',
    '      ● C',
    '    ● B',
    '  ● A',

    // Nested it + describe
    '  ◌ A',
    '    ◌ B',
    '      ◌ C',
    '        ◌ D',
    '          ◌ E',
    '            ◌ F',
    '              ◌ G',
    '                ◌ H',
    '                  ✔ Nested `it` + `describe`',
    '                ● H',
    '              ● G',
    '            ● F',
    '          ● E',
    '        ● D',
    '      ● C',
    '    ● B',
    '  ● A',

    // Nested it + describe with intercalated titles
    '  ◌ A',
    '    ◌ B',
    '      ◌ C',
    '        ◌ D',
    '          ✔ Nested `it` + `describe` with intercalated titles',
    '        ● D',
    '      ● C',
    '    ● B',
    '  ● A',
  ];

  for (const [i, line] of expected.entries())
    assert(actual[offset + i].startsWith(line));
});
