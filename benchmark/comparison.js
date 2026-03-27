/**
 * No benchmarking is performed in this script, only the comparison of benchmark results.
 * Built-in test runners are not part of the comparison that should fail the CI.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { env, exit } from 'node:process';

const isCI = !!env.GITHUB_ACTIONS;
const mode = process.argv[2] ?? 'all';

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

let output = await readFile('./output.md', 'utf-8');
const failures = [];

if (mode === 'all' || mode === 'execution') {
  const headerCells = [];
  const separatorCells = [];
  const avgCells = [];

  for (const runner of runners) {
    const ratios = await Promise.all(
      scenarios.map((scenario) => getRatio(runner.name, scenario))
    );
    const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    const faster = avg <= 1 ? '~~faster~~ ⚠' : 'faster ✔';

    headerCells.push(` ${runner.label} `);
    separatorCells.push('---');
    avgCells.push(` **~${avg.toFixed(2)}x** ${faster} `);

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

  output = output.replace('<!-- SUMMARY_TABLE -->', table);
}

if (mode === 'all' || mode === 'assertions') {
  const assertionRunners = [
    { name: 'jest', label: '🃏 Jest' },
    { name: 'vitest', label: '⚡️ Vitest' },
    { name: 'mocha', label: '☕️ Mocha' },
    { name: 'node', label: '🐢 Node.js' },
  ];

  const assertionScenarios = ['success', 'failure', 'balanced'];

  const getAssertionRatio = async (runner, scenario) => {
    const raw = await readFile(
      `./results/assertions/${scenario}/${runner}.json`,
      'utf-8'
    );
    const { results } = JSON.parse(raw);
    const poku = results.find(({ command }) => command.includes('Poku'));
    const other = results.find(({ command }) => !command.includes('Poku'));
    return other.mean / poku.mean;
  };

  const assertionHeaderCells = [];
  const assertionSeparatorCells = [];
  const assertionRatioCells = [];

  for (const runner of assertionRunners) {
    const ratios = await Promise.all(
      assertionScenarios.map((scenario) =>
        getAssertionRatio(runner.name, scenario)
      )
    );
    const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    const faster = avg <= 1 ? '~~faster~~ ⚠' : 'faster ✔';

    assertionHeaderCells.push(` ${runner.label} `);
    assertionSeparatorCells.push('---');
    assertionRatioCells.push(` **~${avg.toFixed(2)}x** ${faster} `);
  }

  const assertionTable = [
    `| |${assertionHeaderCells.join('|')}|`,
    `|---|${assertionSeparatorCells.join('|')}|`,
    `| 🐷 |${assertionRatioCells.join('|')}|`,
  ].join('\n');

  output = output.replace('<!-- ASSERTION_SUMMARY_TABLE -->', assertionTable);
}

await writeFile('./output.md', output);

if (failures.length > 0) {
  if (isCI) {
    failures.forEach((msg) => console.warn(msg));
  }

  exit(isCI ? 1 : 0);
}
