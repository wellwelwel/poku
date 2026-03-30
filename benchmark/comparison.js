/**
 * No benchmarking is performed in this script, only the comparison of benchmark results.
 * Built-in test runners are not part of the comparison that should fail the CI.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { env, exit } from 'node:process';

const isCI = !!env.GITHUB_ACTIONS;
const mode = process.argv[2] ?? 'all';

const scenarios = ['success', 'failure', 'balanced'];

const formatRatio = (avg) => {
  if (avg >= 0.95 && avg <= 1.05) return `**~1.00x** tie ➖`;
  if (avg > 1) return `**~${avg.toFixed(2)}x** faster ✔`;

  return `**~${(1 / avg).toFixed(2)}x** slower ⚠`;
};

const getRatio = async (resultsDir, runner, scenario) => {
  const raw = await readFile(
    `./results/${resultsDir}/${scenario}/${runner}.json`,
    'utf-8'
  );
  const { results } = JSON.parse(raw);
  const poku = results.find(({ command }) => command.includes('Poku'));
  const other = results.find(({ command }) => !command.includes('Poku'));

  return other.mean / poku.mean;
};

const buildTable = async (resultsDir, runners) => {
  const headerCells = [];
  const separatorCells = [];
  const avgCells = [];

  for (const runner of runners) {
    const ratios = await Promise.all(
      scenarios.map((scenario) => getRatio(resultsDir, runner.name, scenario))
    );
    const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;

    headerCells.push(` ${runner.label} `);
    separatorCells.push('---');
    avgCells.push(` ${formatRatio(avg)} `);

    if (runner.expectedRatio && avg < runner.expectedRatio) {
      failures.push(
        `${runner.label} failed benchmark: ${avg.toFixed(2)}x < ${runner.expectedRatio}x.`
      );
    }
  }

  return [
    `| |${headerCells.join('|')}|`,
    `|---|${separatorCells.join('|')}|`,
    `| 🐷 |${avgCells.join('|')}|`,
  ].join('\n');
};

const runners = [
  { name: 'jest', label: '🃏 Jest', expectedRatio: 3 },
  { name: 'vitest', label: '⚡️ Vitest', expectedRatio: 3 },
  { name: 'bun', label: '🍞 Bun' },
  { name: 'node', label: '🐢 Node.js' },
];

const runnersWithoutThresholds = [
  { name: 'jest', label: '🃏 Jest' },
  { name: 'vitest', label: '⚡️ Vitest' },
  { name: 'bun', label: '🍞 Bun' },
  { name: 'node', label: '🐢 Node.js' },
];

let output = await readFile('./output.md', 'utf-8');
const failures = [];

if (mode === 'all' || mode === 'execution') {
  const table = await buildTable('execution', runners);
  output = output.replace('<!-- SUMMARY_TABLE -->', table);
}

if (mode === 'all' || mode === 'assertions') {
  const table = await buildTable('assertions', runnersWithoutThresholds);
  output = output.replace('<!-- ASSERTION_SUMMARY_TABLE -->', table);
}

if (mode === 'all' || mode === 'nesting') {
  const table = await buildTable('nesting', runnersWithoutThresholds);
  output = output.replace('<!-- NESTING_SUMMARY_TABLE -->', table);
}

if (mode === 'general') {
  const table = await buildTable('general', runnersWithoutThresholds);
  output = output.replace('<!-- GENERAL_SUMMARY_TABLE -->', table);
}

await writeFile('./output.md', output);

if (failures.length > 0) {
  if (isCI) {
    failures.forEach((msg) => console.warn(msg));
  }

  exit(isCI ? 1 : 0);
}
