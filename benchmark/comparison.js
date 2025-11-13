/**
 * No benchmarking is performed in this script, only the comparison of benchmark results.
 * Built-in test runners are not part of the comparison that should fail the CI.
 */

import { readFile } from 'node:fs/promises';
import { exit } from 'node:process';

const compare = async (resultPath, expectedRatio) => {
  const raw = await readFile(resultPath, 'utf-8');
  const { results } = JSON.parse(raw);
  const pokuResult = results.find(({ command }) => command.includes('Poku'));

  const failedComparisons = results
    .filter(({ command }) => !command.includes('Poku'))
    .map(({ mean }) => ({
      expectedRatio,
      actualRatio: mean / pokuResult.mean,
    }))
    .filter(({ expectedRatio, actualRatio }) => actualRatio < expectedRatio);

  if (failedComparisons.length > 0) {
    failedComparisons.forEach(({ expectedRatio, actualRatio }) => {
      console.warn(
        `${pokuResult.command} failed in "${resultPath}" benchmark: ${actualRatio.toFixed(2)}x < ${expectedRatio}x.`
      );
    });

    return false;
  }

  return true;
};

const results = await Promise.all([
  // Execution — Jest
  compare('./results/execution/balanced/jest.json', 4),
  compare('./results/execution/failure/jest.json', 4),
  compare('./results/execution/success/jest.json', 3),

  // Execution — Vitest
  compare('./results/execution/balanced/vitest.json', 4),
  compare('./results/execution/failure/vitest.json', 4),
  compare('./results/execution/success/vitest.json', 4),

  // Execution — Mocha
  compare('./results/execution/balanced/mocha.json', 1),
  compare('./results/execution/failure/mocha.json', 1),
  compare('./results/execution/success/mocha.json', 1),
]);

const hasFailures = results.some((result) => !result);

exit(hasFailures ? 1 : 0);
