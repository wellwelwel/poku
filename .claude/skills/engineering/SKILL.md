---
name: engineering
description: Engineering deep-dive for poku covering performance, code, and security patterns, TypeScript config, build pipeline, developer experience, and CI/CD. Use when implementing or optimizing code, writing performance-sensitive logic, touching the build, or applying code-style and security rules.
---

Engineering patterns, performance, security, and build/CI. Read the actual source and config to confirm details, since implementations change over time.

### 1. Performance Patterns

Look in `src/services/` and `src/polyfills/`:

- Each test file runs in its own process via `spawn` with `shell: false`. stdout/stderr are piped. A plugin can request an extra IPC channel via `plugin.ipc`
- The runner uses a concurrency-bounded promise queue. The default limit is `availableParallelism()`. Sequential mode or `isolation: none` forces a limit of 1
- `availableParallelism` is polyfilled by feature-detecting the native function at runtime and falling back to the CPU count

Authoring rules to respect when writing performance-sensitive code:

- NEVER let extra or uncommon features compromise or pollute the default path. Keep them behind a user-triggered conditional so the code stays unreached ("dead code") until the flag activates it
- ALWAYS early-return to the extreme. The moment a path is decided, leave it with `return`, `break`, or `continue` before doing any further work, so the common path runs the least code
- Declare each variable ONLY after the guards that could exit, in the narrowest scope that uses it. NEVER allocate on a path that never reaches it
- ALWAYS cache repeated state checks in the `GLOBAL` singleton instead of recomputing them

Performance priority order when trade-offs arise:

1. Long-term maintainability and readable code
2. V8 and JIT optimizations, including minimal memory allocation
3. Algorithmic complexity (Big O)

Performance and maintainability must stay in balance with each other.

### 2. Code Patterns

- **Functional composition**: `Object.assign(coreFn, { todo, skip, only })` exposes modifiers on `it` and `describe`
- **Fluent formatter**: the `Formatter` class implements `[Symbol.toPrimitive]()` for implicit string coercion
- **Promise coordination**: a captured resolve callback, no external queue dependency
- **GLOBAL singleton**: a single object holds runtime config and shared state
- **Parent→Child**: `POKU_*` env vars carry context to child processes
- **Timing**: `hrtime()` (the `[seconds, nanoseconds]` tuple form) for high-precision durations
- **Naming**: NEVER use abbreviated variable names, including basic loop counters. Use `index` instead of `i`, `element` instead of `el`. Names MUST be fully spelled out and descriptive
- **Comments**: AVOID them. Clear code, organization, logic, and naming MUST make them unnecessary. The only exception is a public API exposed directly to the end user, which MAY carry objective inline docs

### 3. Security Patterns

- `shell: false` in `spawn()` prevents shell injection
- `escapeRegExp()` sanitizes user-supplied filter and pattern input before it becomes a RegExp
- Config auto-discovery only loads an allowlisted set of filenames (an explicit `--config=` path bypasses the list)
- Windows path safety: the config loader loads from a `file://` URL on Windows, and the in-process test loader uses `pathToFileURL()`
- Process kill uses `kill -9` on Unix and `taskkill /F /T /PID` on Windows

### 4. TypeScript Configuration

`tsconfig.json` is the source of truth. The constraint that drives it: output must run on the oldest supported Node, so prefer compatibility over newer language/output targets when changing it.

### 5. Build Pipeline

`scripts/build.sh` (wired to the `build` script in `package.json`) is the source of truth. It compiles source and tests, then runs post-build fixups. Read it before changing build behavior rather than relying on a description here.

### 6. Developer Experience (DX)

ALWAYS preserve or improve the developer experience. Read the assertion builder in `src/builders/`, the formatter and reporters in `src/services/`, and the runner/output/options parsers in `src/parsers/`. Key principles:

- **Assertion failures must be actionable**: file path, code line, operator, and full actual/expected diff (red/green). Non-comparison assertions (`throws`, `rejects`) pass `hideDiff: true` to keep the output focused
- **Visual hierarchy**: status icons, colors, and dynamic indentation that tracks `describe`/`it` nesting depth encode test state. Read the reporter and the formatter for the current icon and color mapping
- **Output filtering**: in non-debug mode only ANSI-colored lines pass through, hiding noisy library output. Debug mode (or a failed file) passes everything through
- **Zero friction**: TypeScript is auto-detected by file extension (the runner injects `--import=tsx` for `.ts`/`.mts`/`.cts`), config files are auto-discovered, and `defineConfig()` enables IDE autocomplete
- **Config auto-discovery order**: `poku.config.js`, then `.pokurc.json`, then `.pokurc.jsonc`, then built-in defaults
- **Formatter usage**: ALWAYS build output with the fluent `format('text').bold().success()` chain, NEVER raw ANSI codes

### 7. CI/CD

Read `.github/workflows/` for the current pipeline. What constrains the work:

- Lint must pass (Biome + Prettier, see `biome.jsonc`)
- Coverage has a minimum threshold (`checkCoverage` in `.nycrc`, the source of truth)
- Cross-runtime and multi-version compatibility is enforced. See the workflows and `test/__docker__/node/` for the current runtimes and versions
