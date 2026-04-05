/**
 * No benchmarking is performed in this script, only the comparison of benchmark results.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { arch, cpus, platform, totalmem } from 'node:os';
import { env, exit } from 'node:process';

const isCI = !!env.GITHUB_ACTIONS;
const mode = process.argv[2] ?? 'all';

const scenarios = ['success', 'failure', 'balanced'];

const latex = (color, value) => '$' + '{' + `\\color{${color}}${value}` + '}$';

const formatDelta = (mean, pokuMean) => {
  const deltaMs = Math.round((mean - pokuMean) * 1000);
  if (deltaMs > 0) return `+${deltaMs}ms`;
  if (deltaMs < 0) return `${deltaMs}ms`;
  return '0ms';
};

const formatTime = (mean, pokuMean) => {
  const time = `${mean.toFixed(3)}s`;
  if (pokuMean === undefined)
    return `${latex('gray', time)} ${latex('gray', '(baseline)')}`;
  if (mean > pokuMean)
    return `${latex('red', time)} ${latex('red', `(${formatDelta(mean, pokuMean)})`)}`;
  if (mean < pokuMean)
    return `${latex('green', time)} ${latex('green', `(${formatDelta(mean, pokuMean)})`)}`;
  return latex('gray', time);
};

const getCategoryData = async (resultsDir, runners) => {
  let pokuMeanSum = 0;
  let pokuSha = '';
  const runnerResults = [];
  let pokuCollected = false;

  for (const runner of runners) {
    let otherMeanSum = 0;
    let ratioSum = 0;

    for (const scenario of scenarios) {
      const raw = await readFile(
        `./results/${resultsDir}/${scenario}/${runner.name}.json`,
        'utf-8'
      );
      const { results } = JSON.parse(raw);
      const poku = results.find(({ command }) => command.includes('Poku'));
      const other = results.find(({ command }) => !command.includes('Poku'));

      if (!pokuCollected) {
        pokuMeanSum += poku.mean;
        if (!pokuSha) {
          const match = poku.command.match(/\((\w+)\)/);
          if (match) pokuSha = match[1];
        }
      }

      otherMeanSum += other.mean;
      ratioSum += other.mean / poku.mean;
    }

    pokuCollected = true;
    runnerResults.push({
      runner,
      avgMean: otherMeanSum / scenarios.length,
      avgRatio: ratioSum / scenarios.length,
    });
  }

  return {
    pokuMean: pokuMeanSum / scenarios.length,
    pokuSha,
    runnerResults,
  };
};

const runners = [
  { name: 'jest', label: '🃏 Jest', expectedRatio: 3 },
  { name: 'vitest', label: '⚡️ Vitest', expectedRatio: 3 },
  { name: 'deno', label: '🦕 Deno' },
  { name: 'node', label: '🐢 Node.js' },
  { name: 'bun', label: '🍞 Bun' },
];

const runnersWithoutThresholds = [
  { name: 'jest', label: '🃏 Jest' },
  { name: 'vitest', label: '⚡️ Vitest' },
  { name: 'deno', label: '🦕 Deno' },
  { name: 'node', label: '🐢 Node.js' },
  { name: 'bun', label: '🍞 Bun' },
];

const categories = [];

if (mode === 'all' || mode === 'execution') {
  categories.push({
    label: '🏃🏻‍♀️ Test Runner',
    resultsDir: 'execution',
    runners,
  });
}

if (mode === 'all' || mode === 'assertions') {
  categories.push({
    label: '🧪 Assertion',
    resultsDir: 'assertions',
    runners: runnersWithoutThresholds,
  });
}

if (mode === 'all' || mode === 'nesting') {
  categories.push({
    label: '🔗 Nesting',
    resultsDir: 'nesting',
    runners: runnersWithoutThresholds,
  });
}

const details = await readFile('./output.md', 'utf-8');
const failures = [];
let pokuSha = '';

const rows = [];

for (const cat of categories) {
  const data = await getCategoryData(cat.resultsDir, cat.runners);
  if (!pokuSha) pokuSha = data.pokuSha;

  const pokuCell = formatTime(data.pokuMean);
  const runnerCells = data.runnerResults.map(
    ({ runner, avgMean, avgRatio }) => {
      if (runner.expectedRatio && avgRatio < runner.expectedRatio) {
        failures.push(
          `${runner.label} failed benchmark: ${avgRatio.toFixed(2)}x < ${runner.expectedRatio}x.`
        );
      }
      return formatTime(avgMean, data.pokuMean);
    }
  );

  rows.push(`| **${cat.label}** | ${pokuCell} | ${runnerCells.join(' | ')} |`);
}

const header =
  '| Category | 🐷 Poku | 🃏 Jest | ⚡️ Vitest | 🦕 Deno | 🐢 Node.js | 🍞 Bun |';
const separator = '| :--- | :---: | :---: | :---: | :---: | :---: | :---: |';
const table = [header, separator, ...rows].join('\n');

const output = [
  '## 🎖️ Benchmarks',
  '',
  `- ${pokuSha}`,
  '',
  table,
  '',
  `> 🖥️ **OS:** ${platform()} ${arch()}  `,
  `> 🔲 **CPU:** ${cpus()[0].model.trim()} (${cpus().length} cores)  `,
  `> ⚡ **RAM:** ${(totalmem() / 1024 ** 3).toFixed(2)} GB`,
  '',
  '---',
  '',
  '<details>',
  '<summary>',
  '<strong>ℹ Extensive Details</strong>',
  '</summary>',
  '',
  details.trim(),
  '',
  '</details>',
  '',
].join('\n');

await writeFile('./output.md', output);

if (failures.length > 0) {
  if (isCI) {
    failures.forEach((msg) => console.warn(msg));
  }

  exit(isCI ? 1 : 0);
}
