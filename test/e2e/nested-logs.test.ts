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
    /^ {2}◌ A/,
    /^ {4}◌ B/,
    /^ {6}◌ C/,
    /^ {8}◌ D/,
    /^ {10}✔ Nested `describe`/,
    /^ {8}● D/,
    /^ {6}● C/,
    /^ {4}● B/,
    /^ {2}● A/,

    // Nested it
    /^ {2}◌ A/,
    /^ {4}◌ B/,
    /^ {6}◌ C/,
    /^ {8}◌ D/,
    /^ {10}✔ Nested `it`/,
    /^ {8}● D/,
    /^ {6}● C/,
    /^ {4}● B/,
    /^ {2}● A/,

    // Nested describe + it
    /^ {2}◌ A/,
    /^ {4}◌ B/,
    /^ {6}◌ C/,
    /^ {8}◌ D/,
    /^ {10}◌ E/,
    /^ {12}◌ F/,
    /^ {14}◌ G/,
    /^ {16}◌ H/,
    /^ {18}✔ Nested `describe` \+ `it`/,
    /^ {16}● H/,
    /^ {14}● G/,
    /^ {12}● F/,
    /^ {10}● E/,
    /^ {8}● D/,
    /^ {6}● C/,
    /^ {4}● B/,
    /^ {2}● A/,

    // Nested it + describe
    /^ {2}◌ A/,
    /^ {4}◌ B/,
    /^ {6}◌ C/,
    /^ {8}◌ D/,
    /^ {10}◌ E/,
    /^ {12}◌ F/,
    /^ {14}◌ G/,
    /^ {16}◌ H/,
    /^ {18}✔ Nested `it` \+ `describe`/,
    /^ {16}● H/,
    /^ {14}● G/,
    /^ {12}● F/,
    /^ {10}● E/,
    /^ {8}● D/,
    /^ {6}● C/,
    /^ {4}● B/,
    /^ {2}● A/,

    // Nested it + describe with intercalated titles
    /^ {2}◌ A/,
    /^ {4}◌ B/,
    /^ {6}◌ C/,
    /^ {8}◌ D/,
    /^ {10}✔ Nested `it` \+ `describe` with intercalated titles/,
    /^ {8}● D/,
    /^ {6}● C/,
    /^ {4}● B/,
    /^ {2}● A/,
  ];

  for (const [i, pattern] of expected.entries())
    assert.match(actual[offset + i], pattern);
});
