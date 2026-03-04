/**
 * No benchmarking is performed in this script, only the comparison of benchmark results.
 * Built-in test runners are not part of the comparison that should fail the CI.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { env, exit } from 'node:process';

const isCI = !!env.GITHUB_ACTIONS;

const runners = [
  { name: 'jest', label: '🃏 Jest', expectedRatio: 3 },
  { name: 'vitest', label: '⚡️ Vitest', expectedRatio: 3 },
  { name: 'mocha', label: '☕️ Mocha', expectedRatio: 1 },
  { name: 'node', label: '🐢 Node.js' },
];

const scenarios = ['success', 'failure', 'balanced'];

const getRatio = async (runner, scenario) => {
  const raw = await readFile(
    `./results/execution/${scenario}/${runner}.json`,
    'utf-8'
  );
  const { results } = JSON.parse(raw);
  const poku = results.find(({ command }) => command.includes('Poku'));
  const other = results.find(({ command }) => !command.includes('Poku'));

  return other.mean / poku.mean;
};

const headerCells = [];
const separatorCells = [];
const avgCells = [];
const failures = [];

for (const runner of runners) {
  const ratios = await Promise.all(
    scenarios.map((scenario) => getRatio(runner.name, scenario))
  );
  const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;
  const faster = avg <= 1 ? '~~faster~~' : 'faster';

  headerCells.push(` ${runner.label} `);
  separatorCells.push('---');
  avgCells.push(` ~${avg.toFixed(2)}x ${faster} `);

  if (runner.expectedRatio && avg < runner.expectedRatio) {
    failures.push(
      `${runner.label} failed benchmark: ${avg.toFixed(2)}x < ${runner.expectedRatio}x.`
    );
  }
}

const table = [
  `| |${headerCells.join('|')}|`,
  `|---|${separatorCells.join('|')}|`,
  `| 🐷 |${avgCells.join('|')}|`,
].join('\n');

const output = await readFile('./output.md', 'utf-8');

await writeFile('./output.md', output.replace('<!-- SUMMARY_TABLE -->', table));

if (failures.length > 0) {
  if (isCI) {
    failures.forEach((msg) => console.warn(msg));
  }

  exit(isCI ? 1 : 0);
}
