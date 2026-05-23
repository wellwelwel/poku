---
name: pre-commit
description: Run the mandatory pre-commit checks for the poku repository before staging a commit. Use this whenever the user asks to commit, prepare a commit, push, open a PR, or verify a change is ready. Runs typecheck, lint:fix, build, and the local test suite in order, plus runtime-sensitive suites when the change touches runtime detection, isolation, child-process spawning, environment-variable plumbing, or any Bun or Deno specific code path.
user-invocable: true
---

# Pre-commit

Guarantee that every commit lands with passing type checks, formatted code, a successful build, and a green local test suite, so no regression in correctness, style, or distributable output reaches the upstream history.

## Preconditions

- On a fork, read [CONTRIBUTING.md](../../../CONTRIBUTING.md) first.
- Working tree reflects the change under review (no unrelated edits staged).

## Recommended steps

Run in this exact order. Any non-zero exit blocks the commit.

1. `npm run typecheck`: TypeScript type check across the project.
2. `npm run lint:fix`: auto-fixes Biome and Prettier. May modify files, which must be restaged.
3. `npm run build`: produces `lib/` from `src/`.
4. `npm test`: full local Node.js suite.

## Runtime-sensitive checks (conditional)

Run additionally when the change touches runtime detection, isolation, child-process spawning, environment-variable plumbing, or any Bun or Deno specific code path.

- `bun run test:bun`: full local Bun suite.
- `deno task test:deno`: full local Deno suite.

## Running a subset

Direct execution of a single test file:

- `npx tsx <path>` or `npx tsx src/bin/index.ts <path>`
- `bun --bun <path>` or `bun --bun src/bin/index.ts <path>`
- `deno run -A <path>` or `deno run -A src/bin/index.ts --denoAllow=all <path>`

Filter the suite by path:

- `npm test -- --filter=<path>`
- `bun run test:bun -- --filter=<path>`
- `deno task test:deno -- --filter=<path>`

## Acceptance criteria

- All four mandatory steps exit with code 0.
- Runtime-sensitive suites exit 0 when applicable.
- Any files rewritten by `lint:fix` are restaged before commit, so no unstaged formatting deltas remain.

## Failure modes

- `typecheck` fails: fix the type error at its source. Do not relax `tsconfig` or add `any` to silence it.
- `lint:fix` rewrites files: restage them and re-run from step 1. If a rule needs to be disabled, justify it in code review, not by skipping the step.
- `build` fails: fix the underlying TypeScript or bundler error. The build catches issues `npm test` does not.
- `npm test` fails: fix the test or the code under test. Never bypass with `--no-verify` or by skipping the test. Treat a modified existing test as a possible regression and prefer adding new tests.
- Runtime-sensitive suite fails: reproduce locally with the failing runtime before pushing. A Node-only green run does not clear a runtime-sensitive change.
