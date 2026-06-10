---
name: benchmarking
description: Empirical performance comparison playbook for poku covering hypothesis lenses, a standalone harness with a byte-identical correctness gate, variant generation, sequential hyperfine measurement, composition re-testing, and anomaly forensics. Use when measuring, comparing, or proving the performance of any project logic, when the user asks for benchmarks or optimization validation, or when a micro-optimization claim needs evidence before touching src/.
user-invocable: true
---

# Benchmarking

Target-agnostic methodology to measure and prove micro-optimizations in any hot path of this project. Theory does not count: every claim must survive a byte-identical correctness gate and a statistically clean benchmark before touching `src/`.

## Ground rules

1. **Behavior-identical or explicitly flagged.** A variant must produce byte-identical output (side effects included) versus the baseline. Intentional behavior changes are flagged experiments, and the final decision belongs to the user.
2. **Realistic workloads only.** Fixtures replicate what the real call sites feed the target, in production-like ratios.
3. **Sequential measurement, never parallel.** One hyperfine comparison at a time, on an otherwise idle machine.
4. **Noise floor discipline.** Differences under ~2%, or within one stddev overlap, are neutral. Neutral results do not justify code changes.
5. **Composition is not additive.** Re-measure winners combined (see the JIT cliff in Findings).

## Pipeline

### Phase 0: Scope

- Map the target functions, every consumer (`grep -rn "fnName" src/`), and the **call frequency** of each. Frequency decides the verdict: a 5x win on a function called once per run has zero real impact, and a lookup table built at module load never amortizes for it. The final report must weigh gains against real call counts.
- Extract the exact runtime constants the target depends on (formatted prefixes, environment values, shared state) so the harness replicates them byte by byte.

### Phase 1: Hypotheses (parallel)

Three independent lenses, each producing structured hypotheses:

- **V8/JIT**: inline caches and megamorphic property loads, `instanceof` vs `Array.isArray` vs `getPrototypeOf`, typeof chain ordering, inlining budgets (function size), builtin fast paths, deopt triggers.
- **Allocation/GC**: per-call allocations, intermediate strings, methods called only as a boolean test, lookup tables for closed domains, pre-allocation when sizes are known.
- **Strings/algorithms**: rope (ConsString) vs array+join, repeated scans over the same data, scan order by selectivity, hoisting invariant checks out of loops.

Each hypothesis states: claim, concrete replacement code, the workload where the effect appears, and a `behaviorChange` boolean. With subagents, run the lenses in parallel (independent and read-only).

### Phase 2: Harness

One directory per investigation under the gitignored `temp/`:

```sh
mkdir -p ./temp/bench/<target>/impl ./temp/bench/<target>/results
cp .claude/skills/benchmarking/templates/* ./temp/bench/<target>/
```

```
./temp/bench/<target>/
  run.ts                static: generic driver, runs unmodified
  gen_variants.py       static skeleton: fill only the `variants` dict
  fixtures.ts           per target: fill every TODO(target) marker
  impl/baseline.ts      per target: faithful port of the current code, zero project imports
  impl/<variant>.ts     per target: generated, one file per hypothesis, minimal diff over baseline
  results/*.json        per comparison: hyperfine exports
```

Runner: `bun --bun run.ts ...` (~11ms startup). Fallback only when Bun is not available: `node --import=tsx run.ts ...` (~125ms). Never mix runners between the two sides of a comparison. The runner picks the engine: Bun measures JavaScriptCore, Node + tsx measures V8.

`run.ts` is generic because `fixtures.ts` exports a fixed contract: `TargetModule` (surface of the module under test), `verifyCases` (string per case), `benchModes` (`iterations` plus a checksum-returning `run`), and `resetSideEffects`/`sideEffectsSnapshot` for shared counters.

Requirements:

- **Faithful baseline port**: copy the target nearly verbatim (types stay, the runner executes TS), inlining constants and stubbing shared state so the module is self-contained.
- **Hot/cold fixture split**: common cases weighted ~5x over exotic ones, matching what production sees.
- **Checksum output**: every bench mode accumulates and prints a checksum. Prevents dead-code elimination and doubles as a cross-variant sanity check.
- **Calibration**: tune iterations until each process does 500-800ms of real work, so startup does not dominate. Check with `time bun --bun run.ts bench-x impl/baseline.ts`.
- **Verify is the gate**: compares baseline vs variant over all fixtures (outputs and side-effect counters), exits non-zero on mismatch. No variant is benchmarked before passing it, except flagged behavior-change experiments whose mismatch is inspected and confirmed as only the intended difference.
- **Domain sweep for enumerable inputs**: fixtures sample the input space, which is not enough for numeric kernels with enumerable domains (a byte, a bounded integer, a nanoseconds field). Brute-force compare baseline vs variant over the domain (costs seconds). A variant here passed an 8-sample gate while diverging by 1 ULP on 29% of the domain.

### Phase 3: Variants

`gen_variants.py` generates each variant from the baseline via exact-match replacements with occurrence-count assertions. Fill only the `variants` dict, copying `old` blocks verbatim from `impl/baseline.ts` (indentation included). A not-found or miscounted block aborts generation: that is the protection against silently benchmarking a baseline-identical variant. Never hand-edit near-identical variant files.

### Phase 4: Measurement

One comparison at a time. hyperfine already runs its warmups and runs sequentially, so isolation only breaks at the orchestration level: never start a comparison while another is running.

```sh
hyperfine --warmup 3 --runs 10 \
  -n baseline 'bun --bun run.ts bench-x impl/baseline.ts' \
  -n variant  'bun --bun run.ts bench-x impl/variant.ts' \
  --export-json results/variant.json
```

- `--warmup 3 --runs 10` is the project standard. Same runner on both sides, always.
- Export JSON, record mean, stddev, min, max per side, and hyperfine outlier warnings verbatim (they change interpretation).
- With subagents: one per comparison, in a sequential loop (`for ... await`), never `parallel()`.

### Phase 5: Interpretation

- Under ~2%, or within one stddev overlap: neutral, discard.
- Outlier warnings with inflated mean: compare medians, or re-run.
- A regression is as valuable as a win: it proves the current code right and blocks future "improvements". Document it.
- Behavior-change variants that measure neutral are dead (all cost, no gain).

### Phase 6: Composition and focused workloads

- Combine winners into a `combined` variant and re-measure against baseline: gains do not add up.
- Wins diluted in the mixed workload (a branch only some inputs reach) get a focused bench mode exercising only that path, measured baseline vs variant vs combined. A 0.998x "neutral" here measured 2.9x focused.

### Phase 7: Anomaly forensics

When a combination behaves unexpectedly, isolate before discarding:

1. **Micro-mutation bisection**: variants differing by exactly one ingredient until the toxic pair appears.
2. **Deopt check**: `node --trace-deopt ... | grep -c deoptimizing` against baseline.
3. **JIT on/off**: run both shapes with `--max-opt=0`. A tie interpreted plus divergence with JIT on means an optimization-quality cliff, not algorithmic cost. Document the toxic shape.

### Phase 8: Application and final proof

1. Port winners to the real source, preserving project style.
2. Re-verify the real source: an adapter module re-exports the actual `src/**/*.ts` symbols under the `TargetModule` contract, then:
   ```sh
   bun --bun run.ts verify impl/real-src.ts
   ```
   This catches transcription errors between the benchmarked port and the applied code.
3. Confirmation benchmark of the real source against `impl/baseline.ts`. The canonical numbers remain the Phase 4-6 ones.
4. `npm run typecheck && npm run lint:fix && npm run build && npm test`.
5. Internal contract changes update all callers in the same change. Tests pinning the old internal shape may be updated only when the change is intentional and the validated content stays the same.

## Findings already validated

Transferable heuristics, measured on Apple Silicon (engine noted when it matters). Re-validate before relying on them in another engine.

**Confirmed wins:**

- Functions beyond the JIT inlining budget benefit from a **small dispatch entry** that handles cheap common cases inline and delegates the heavy body to a second function (-8%, V8).
- `getPrototypeOf(x) === Object.prototype` check **before** `instanceof` chains lets a dominant plain-object path skip them (-3.7%, V8).
- **Needle selectivity for substring search**: when a multi-character needle starts with a prefix that is common in the haystack, prefilter with the needle's rarest single character first. Single-char `includes` uses a vectorized path and discards most lines in one pass (-19.5%, V8).
- **Rope accumulator over array+join** when the consumer wants one string: `acc += part` beats `parts.push(part)` + `join` (-15%, V8).
- **Lookup tables for closed domains** on the affected path (2.9x focused on V8, 5.8x on JSC, invisible in mixed workloads). Only worth applying when call counts amortize the table built at module load.
- Ordering scans by selectivity: the cheapest and most selective test first, the long needle only on survivors.

**Confirmed non-wins (do not "fix" these):**

- `localeCompare()` with no arguments has a V8 fast path. A cached `Intl.Collator().compare` is **2.8x slower**. Default `sort()` was neutral, so dropping locale order buys nothing.
- `split('\n')` loses to a manual `indexOf`/`substring` loop (+18%, V8).
- `/\S/.test(line)` loses to `line.trim().length > 0` as a blank-line test (+6%, V8).
- Pre-gating searches with a shared-prefix scan loses (+9%, V8): the extra scan does not pay for itself.
- A native API replacing a tiny hand-written formatter lost 2x (JSC): `Date.prototype.toTimeString().slice()` builds a far larger string than three padded getters.
- Replacing `/ 1eN` division with `* 1e-N` multiplication is a correctness bug, not an optimization: results diverge by 1 ULP on a large share of the domain (engine-independent IEEE behavior).
- Manual `toFixed` replacements change rounding on binary-float edges (`0.015` formats as `0.01`, round-half-up gives `0.02`).
- typeof chain order (primitives first vs object first) is a measured tie (1.00 ± 0.09). Pick by readability.
- Precomputed separator tables, first-iteration peeling, lazy `Set` allocation, manual key quoting: all within noise (V8).

**Documented JIT cliff (V8):** memoized `indexOf(needle, offset)` positions combined with a rope accumulator in the same loop measured **2.1x slower**, while each ingredient alone was faster. Identical when interpreted (`--max-opt=0`), so the combined function shape pessimizes under TurboFan. Re-measure every composition.

## Checklist

- [ ] Map call sites, data shapes, and call frequency of the target
- [ ] Generate hypotheses through the three lenses (parallel subagents work well)
- [ ] Copy templates to `./temp/bench/<target>/`, fill baseline, fixtures, and calibration
- [ ] Generate variants via the `variants` dict, never by hand
- [ ] Gate every variant with verify, plus a domain sweep when inputs are enumerable
- [ ] hyperfine `--warmup 3 --runs 10`, sequential, same runner both sides, export JSON
- [ ] Discard anything within ±2% or one stddev
- [ ] Re-measure winners combined, add focused modes for diluted wins
- [ ] Bisect anomalies (micro-mutations, `--trace-deopt`, `--max-opt=0`)
- [ ] Apply only when call frequency justifies it, re-verify the real source, run typecheck/lint/build/tests
