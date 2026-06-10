import type { TargetModule } from './fixtures.ts';
import {
  benchModes,
  resetSideEffects,
  sideEffectsSnapshot,
  verifyCases,
} from './fixtures.ts';

const [, , mode, implPath] = process.argv;

if (!mode || !implPath) {
  console.error('usage: <runner> run.ts <verify|bench-mode> <implPath>');
  process.exit(2);
}

const impl = (await import(
  new URL(implPath, import.meta.url).href
)) as TargetModule;

if (mode === 'verify') {
  const baseline = (await import(
    new URL('./impl/baseline.ts', import.meta.url).href
  )) as TargetModule;

  let failures = 0;

  verifyCases.forEach((runCase, index) => {
    resetSideEffects(baseline);
    const expected = runCase(baseline);
    const expectedEffects = sideEffectsSnapshot(baseline);

    resetSideEffects(impl);
    const actual = runCase(impl);
    const actualEffects = sideEffectsSnapshot(impl);

    if (expected !== actual) {
      failures++;
      console.error(
        `mismatch at case ${index}:\n--- baseline\n${expected}\n--- variant\n${actual}\n`
      );
    }

    if (expectedEffects !== actualEffects) {
      failures++;
      console.error(
        `side effects mismatch at case ${index}: baseline ${expectedEffects} vs variant ${actualEffects}`
      );
    }
  });

  if (failures > 0) {
    console.error(`VERIFY FAILED: ${failures} mismatches`);
    process.exit(1);
  }

  console.log('VERIFY OK');
} else if (Object.hasOwn(benchModes, mode)) {
  const { iterations, run } = benchModes[mode];
  const total = iterations();

  resetSideEffects(impl);

  let checksum = 0;

  for (let iteration = 0; iteration < total; iteration++) checksum += run(impl);

  console.log(`${checksum}:${sideEffectsSnapshot(impl)}`);
} else {
  console.error(`unknown mode: ${mode}`);
  process.exit(2);
}
