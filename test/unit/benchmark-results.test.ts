import { strict as nodeAssert } from 'node:assert';
import { parseBenchmarkResults } from '../../benchmark/results.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

describe('Hyperfine benchmark exports', async () => {
  const expected = {
    poku: { command: '🐷 Poku (abc123)', mean: 0.1 },
    other: { command: 'jest', mean: 0.5 },
  };

  await it('reads Hyperfine 1 command labels and top-level means', () => {
    nodeAssert.deepStrictEqual(
      parseBenchmarkResults(
        { results: [expected.other, expected.poku] },
        'legacy.json'
      ),
      expected
    );
  });

  await it('reads Hyperfine 2 names and wall-clock summary means', () => {
    nodeAssert.deepStrictEqual(
      parseBenchmarkResults(
        {
          schema_version: 2,
          primary_metric: 'memory_peak_resident',
          results: [
            {
              command: 'node ./node_modules/poku/lib/bin/index.js test',
              name: expected.poku.command,
              summary: {
                time_wall_clock: { mean: expected.poku.mean },
                memory_peak_resident: { mean: 1000000 },
              },
            },
            {
              command: 'jest test',
              name: expected.other.command,
              summary: { time_wall_clock: { mean: expected.other.mean } },
            },
          ],
        },
        'modern.json'
      ),
      expected
    );
  });

  await it('identifies incomplete exports by their source path', () => {
    nodeAssert.throws(
      () => parseBenchmarkResults({}, 'missing.json'),
      /missing\.json: missing benchmark results/
    );
    nodeAssert.throws(
      () =>
        parseBenchmarkResults({ results: [expected.other] }, 'incomplete.json'),
      /incomplete\.json: expected Poku and comparison results/
    );
  });

  await it('rejects invalid timing data instead of producing NaN ratios', () => {
    nodeAssert.throws(
      () =>
        parseBenchmarkResults(
          { results: [expected.other, { command: expected.poku.command }] },
          'invalid.json'
        ),
      /invalid\.json: invalid wall-clock mean/
    );
  });
});
