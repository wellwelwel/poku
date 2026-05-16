---
name: architecture
description: Architecture deep-dive for poku covering project structure, execution flow, config discovery, runtime detection, and competitive context. Use when navigating the codebase or understanding how components fit together.
---

How the project is organized and where to look. Read the actual directories and source to confirm details, since file lists change over time.

### 1. Directory Structure

Read the `src/` tree to understand module organization. Each directory has a clear responsibility:

- `src/modules/`: public surface. The barrel files exposed to consumers are the ones listed under `exports` in `package.json` (read it for the current entrypoints). Subfolders hold the essentials (core `poku`/`assert`/`strict`) and the helper APIs (`describe`, `it`, `test`, `skip`, `kill`, `env`, etc.)
- `src/services/`: runtime services. The runner, per-file execution, watch mode, and reporters live here
- `src/parsers/`: CLI and config parsing. Argument reading, config discovery, runtime detection, and runner resolution
- `src/configs/`: global state, including the `GLOBAL` singleton
- `src/builders/`: chainable builders (assert, reporter)
- `src/polyfills/`: cross-runtime compatibility shims
- `src/bin/`: CLI entry. `src/bin/index.ts` is the published binary
- `src/@types/`: TypeScript type definitions

To find a specific file, read the relevant directory rather than relying on a fixed list here.

### 2. Execution Flow

Trace the path from CLI invocation to test results:

1. The CLI entry (`src/bin/index.ts`) parses args, loads config, and calls `poku()`
2. The `poku()` orchestrator in the essentials module starts the run
3. The runner service builds a concurrency-bounded queue and iterates the matched files
4. Each test file is spawned in its own process with `shell: false`
5. Child processes inherit `POKU_*` environment variables set by the parent
6. The selected reporter renders results

### 3. Config System

- Auto-discovered files (in order): `poku.config.js`, `.pokurc.json`, `.pokurc.jsonc`. The discovery logic lives in the options parser under `src/parsers/`. `poku.config.cjs` and `poku.config.ts` are supported only via an explicit `--config=` flag, not auto-discovery
- For the available options, read the config types in `src/@types/` and the CLI help in `src/bin/`. They are the source of truth and stay current as options evolve

### 4. Runtime Detection

Read the runtime detection and runner resolution in `src/parsers/`:

- Detection order: `POKU_RUNTIME` env var, then `typeof Deno`, then `typeof Bun`, otherwise default `'node'`
- Runner: Bun (`['bun']`), Deno (`['deno', 'run', ...perms]`), Node (`['node']`, or `['node', '--import=tsx']` for TypeScript files)

### 5. Competitive Context

Poku differentiates from Jest/Vitest/Mocha/etc. by:

- **No internal test mapping**: tests are not registered or mapped internally, only their execution is reported. This is the core architectural decision that makes tests behave as plain JavaScript (see the Philosophy in `CLAUDE.md`)
- Zero runtime dependencies
- Faster than Jest and Vitest in the project's own benchmarks (see `benchmark/` for current numbers and the caveats stated there)
- Process-per-file isolation by default (`--isolation=none` runs all files in the same process, useful for debugging)
- Cross-platform (Node/Bun/Deno) zero-config
- Built-in service management (`startService`, `waitForPort`, `kill`, and related helpers)
