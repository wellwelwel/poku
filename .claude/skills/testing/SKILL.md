---
name: testing
description: Testing deep-dive for poku covering test structure, commands, patterns, fixtures, utils, Docker compatibility, and coverage. Use when writing, organizing, or running tests, adding fixtures, or working on coverage.
---

How tests are organized and where to look. Read the actual `test/` tree to confirm details, since test files change over time.

### 1. Test Structure

Tests live under `test/`, organized by purpose:

- `test/unit/`: core services and utilities
- `test/integration/`: API surface by feature, with a subdirectory per feature (assertions, `describe`, `it`, `test`, strict assertions, before/after each, wait-for, etc.)
- `test/e2e/`: CLI workflows, service management, and watch mode
- `test/compatibility/`: Docker-based multi-version checks
- `test/__fixtures__/`: scenario fixtures, mirroring the test structure
- `test/__utils__/`: shared test helpers
- `test/__docker__/`: Docker infrastructure (compose plus Dockerfiles)

Read the relevant directory to discover the current files. Poku tests itself, so these files also show how `describe()`, `it()`, `test()`, and `assert` are used in practice.

### 2. Test Commands

The `package.json` scripts are the source of truth. The main ones:

- `npm test`: runs the unit, integration, and e2e suites on Node via tsx
- `npm run test:bun`: same suites on the Bun runtime
- `npm run test:deno`: same suites on Deno (with `--denoAllow=all`)
- `npm run test:coverage`: runs `npm test` with the `--coverage` flag (c8 plus monocart-coverage-reports via @pokujs/c8)
- `npm run test:docker:node`: runs the Docker compatibility matrix

### 3. Test Patterns

Open a representative file in the relevant directory to learn the pattern:

- **Unit**: parallel assertions via `Promise.all([it(...)])`
- **Integration**: comprehensive coverage of a single API surface per feature
- **E2E**: service lifecycle with `startService()`, `waitForPort()`, and `server.end()`
- **Compatibility**: `@pokujs/docker` lifecycle to run a suite inside a container

Comments are completely prohibited in tests. `describe`, `it`, `test`, `assert`, and `strict` all accept a message, so express intent through those instead.

Prefer value-preserving asserts over a derived boolean. `assert(regex.test(x))` collapses failures to `Actual: false / Expected: true`. `assert.match` / `assert.doesNotMatch` print `Value` + `RegExp`, and `assert.strictEqual` / `assert.deepStrictEqual` print `Actual` + `Expected`. Split combined checks like `a && b` into independent assertions. A boolean assertion is acceptable only when no value-preserving form fits.

A bug-reproduction test asserts the correct expected behavior, so without a fix it MUST fail and pass only once the bug is fixed. Never write it to pass against the buggy behavior.

### 4. Test Utils (`test/__utils__/`)

Shared helpers for writing tests:

- `inspectPoku(args, configs)`: run the CLI, capture stdout/stderr/exitCode
- `inspectCLI(command, args)`: generic CLI inspection
- `watchCLI(args, configs)`: monitor watch mode via a `getOutput()` callback
- `legacyFetch(host, port)`: HTTP fetch for Node 16 compatibility

### 5. Fixtures (`test/__fixtures__/`)

Fixtures provide controlled scenarios and mirror the test structure (`unit/`, `integration/`, `e2e/`). They cover cases such as config files, HTTP servers, pass/fail outcomes, fail-fast, file discovery, module types (CJS/ESM/TypeScript), reporters, and watch mode. Read `test/__fixtures__/` to find an existing scenario or to add a new one next to its peers.

### 6. Docker Testing

- Compose file: `test/__docker__/docker-compose.yml`
- Per-version Alpine Dockerfiles live under `test/__docker__/node/` (read that directory for the currently supported versions)

### 7. Coverage

- Minimum threshold lives in `.nycrc` (`checkCoverage`, the source of truth). The goal is 100%
- **Preference**: E2E or integration tests for coverage. Use unit tests only for extremely complex or hard-to-reproduce scenarios, such as `watch` usage
