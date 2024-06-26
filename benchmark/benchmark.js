import { execSync } from 'node:child_process';
import Benchmark from 'benchmark';

const suite = new Benchmark.Suite();
const results = new Map();

const exec = (command) => {
  try {
    execSync(command, { stdio: 'ignore' });
  } catch {}
};

const test = () => {
  const pokuResult = results.get('Poku (Local)');

  const tolerancesPerTester = {
    Jest: 4,
    'Mocha + Chai': 1,
    Vitest: 3,
    Poku: 0.8,
  };

  for (const [name, result] of results) {
    if (name === 'Poku (Local)') {
      continue;
    }

    const expectedRatio = tolerancesPerTester[name];
    const actualRatio = pokuResult.opsPerSec / result.opsPerSec;
    const isAtLeastExpected = actualRatio >= expectedRatio;

    if (!isAtLeastExpected) {
      console.error(
        `Poku (Local) isn't approximately ${expectedRatio.toFixed(2)}x faster than ${name}.`
      );
      process.exit(1);
    }
  }
};

suite
  .add('Jest          ', () => {
    exec(
      'node --experimental-vm-modules ./node_modules/jest/bin/jest.js ./test/jest'
    );
  })
  .add('Mocha + Chai  ', () => {
    exec('./node_modules/mocha/bin/mocha.js --parallel ./test/mocha');
  })
  .add('Vitest        ', () => {
    exec('./node_modules/vitest/vitest.mjs run ./test/vitest');
  })
  .add('Poku          ', () => {
    exec('./node_modules/poku/lib/bin/index.js --parallel ./test/poku');
  })
  .add('Poku (Local)  ', () => {
    exec('../lib/bin/index.js --parallel ./test/poku');
  })
  .on('cycle', (event) => {
    const name = event.target.name.trim();
    const result = {
      opsPerSec: event.target.hz,
      percentage: event.target.stats.rme,
    };

    results.set(name, result);
    console.log(
      `${event.target.name} x ${result.opsPerSec.toFixed(2)} ops/sec — ±${result.percentage.toFixed(2)}% (${event.target.stats.sample.length} runs sampled)`
    );
  })
  .on('complete', function () {
    const fatest = String(this.filter('fastest').map('name')).trim();

    console.log(`\n🚀 Fastest is \x1b[1m${fatest}\x1b[0m\n`);

    if (!/^Poku/.test(fatest)) {
      process.exit(1);
    }

    test();
  })
  .run({ async: true });
