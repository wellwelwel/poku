// Target-specific file: fill every TODO(target) marker.
// Contract consumed by run.ts (keep these five exports):
//   TargetModule:        surface of the module under test
//   verifyCases:         cases compared byte by byte between baseline and variant
//   benchModes:          named modes with calibratable iterations and a checksum-returning run
//   resetSideEffects:    zero shared counters before runs
//   sideEffectsSnapshot: serialize counters ('' when the target has none)
// Determinism is mandatory: no Date.now, no Math.random, fixed seeds only.

// TODO(target): describe the real exports of the module under test.
export type TargetModule = {
  targetFunction: (input: unknown) => string;
};

type BenchMode = {
  iterations: () => number;
  run: (impl: TargetModule) => number;
};

// TODO(target): build deterministic inputs modeled from the real call sites.
// Split by frequency so the mixed workload matches production ratios.
const hotInputs: unknown[] = [];
const coldInputs: unknown[] = [];

const HOT_WEIGHT = 5;

export const resetSideEffects = (_impl: TargetModule): void => {
  // TODO(target): zero any shared state the target mutates, e.g.:
  // impl.results.skipped = 0;
};

export const sideEffectsSnapshot = (_impl: TargetModule): string => {
  // TODO(target): return counters as a string, e.g.:
  // return `${impl.results.skipped}:${impl.results.todo}`;
  return '';
};

export const verifyCases: ((impl: TargetModule) => string)[] = [
  ...hotInputs,
  ...coldInputs,
].map((input) => (impl) => {
  // TODO(target): call the function under investigation, return a string
  return String(impl.targetFunction(input));
});

export const benchModes: Record<string, BenchMode> = {
  'bench-mixed': {
    // TODO(target): calibrate so one process does 500-800ms of real work
    iterations: () => Number(process.env.MIXED_ITERATIONS ?? 1000),
    run: (impl) => {
      let checksum = 0;

      for (let repeat = 0; repeat < HOT_WEIGHT; repeat++)
        for (const input of hotInputs)
          checksum += impl.targetFunction(input).length;

      for (const input of coldInputs)
        checksum += impl.targetFunction(input).length;

      return checksum;
    },
  },
  // TODO(target): add focused modes for paths diluted in the mixed workload,
  // e.g. 'bench-<path>': { iterations, run } exercising a single branch.
};
