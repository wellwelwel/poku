import { strict as nodeAssert } from 'node:assert';
import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { formatBenchmarkDetails } from '../../benchmark/results.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

await describe('Benchmark report details', async () => {
  await it('reports both timings and identifies the faster command', () => {
    const output = formatBenchmarkDetails(
      {
        results: [
          { command: 'jest', mean: 0.1 },
          { command: 'Poku', mean: 0.5 },
        ],
      },
      'timings.json'
    );
    nodeAssert.match(output, /jest: 100\.000 ms/);
    nodeAssert.match(output, /Poku: 500\.000 ms/);
    nodeAssert.match(output, /jest ran 5\.00 times faster than Poku/);
    nodeAssert.match(
      formatBenchmarkDetails(
        {
          results: [
            { command: 'jest', mean: 0.1 },
            { command: 'Poku', mean: 0.1 },
          ],
        },
        'equal.json'
      ),
      /same mean wall-clock time/
    );
  });

  if (process.platform === 'win32') return;

  for (const schema of [1, 2]) {
    await it(`renders every scenario from Hyperfine ${schema} without parsing terminal text`, () => {
      const directory = mkdtempSync(join(tmpdir(), 'poku-benchmark-report-'));
      const bin = join(directory, 'bin');
      mkdirSync(bin);
      writeFileSync(join(directory, 'package.json'), '{"type":"module"}');
      writeFileSync(join(bin, 'package.json'), '{"type":"commonjs"}');
      writeFileSync(join(bin, 'git'), '#!/bin/sh\nprintf abc123\\n\n', {
        mode: 0o755,
      });

      for (const name of ['benchmark.sh', 'details.js', 'results.js']) {
        copyFileSync(
          new URL(`../../benchmark/${name}`, import.meta.url),
          join(directory, name)
        );
      }

      writeFileSync(
        join(bin, 'hyperfine'),
        `#!/usr/bin/env node
const { writeFileSync } = require('node:fs');
const args = process.argv.slice(2);
if (!args.includes('--shell=default')) process.exit(2);
const results = [];
for (let index = 0; index < args.length; index++) {
  if (args[index] !== '--command-name') continue;
  const name = args[index + 1];
  const mean = name.includes('Poku') ? 0.1 : 0.5;
  results.push(${schema} === 1 ? { command: name, mean } : {
    name, command: args[index + 2], summary: { time_wall_clock: { mean } }
  });
}
writeFileSync(args[args.indexOf('--export-json') + 1], JSON.stringify({ results }));
console.log('Terminal output without the legacy summary marker');
`,
        { mode: 0o755 }
      );

      try {
        const result = spawnSync('sh', ['benchmark.sh', 'all'], {
          cwd: directory,
          env: { ...process.env, PATH: `${bin}:${process.env.PATH}` },
          encoding: 'utf8',
        });
        nodeAssert.strictEqual(result.status, 0, result.stderr);
        const sections = [...result.stdout.matchAll(/^```\n([\s\S]*?)^```/gm)];
        nodeAssert.strictEqual(sections.length, 60);
        for (const section of sections) {
          nodeAssert.match(section[1], /Poku/);
          nodeAssert.match(section[1], /100\.000 ms/);
          nodeAssert.match(section[1], /500\.000 ms/);
          nodeAssert.match(section[1], /ran 5\.00 times faster/);
        }
      } finally {
        rmSync(directory, { recursive: true, force: true });
      }
    });
  }
});
