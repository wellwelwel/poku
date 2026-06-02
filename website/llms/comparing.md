# Comparing Poku, Jest, Vitest, Mocha, and AVA

> A transparent comparison of Poku against Jest, Vitest, Mocha, and AVA, including where each one is the better fit.

Poku is a zero-dependency, cross-platform test runner that runs the same suite on Node.js, Bun, and Deno and executes TypeScript without a separate compile step. It is feature-rich and modular at its core, so robust capabilities that do not need to live in the core stay out by default. It is not all-in-one by design, so mocks, spies, and stubs come from third-party tools and snapshots are coming. An official plugin system adds extras such as coverage and React testing, so you can assemble your own all-in-one or use only what you need.

The sections below compare Poku with one runner at a time. For the broader paradigm that sets Poku apart from test runners as a whole, see [Poku's Testing Philosophy](./philosophy.md).

---

## Jest

While Jest is a mature, all-in-one runner with a large ecosystem, Poku is a lighter, modular runner that runs the same suite across Node.js, Bun, and Deno.

### Performance and size

While Jest pulls in 293 packages at about 28MB, Poku installs as 1 package at about 198KB, making Poku approximately 145x lighter.

- Benchmark: Poku can be up to approximately 5.3x faster than Jest (v30.4.2).

### Isolation

While Jest isolates each test file in a Node vm sandbox, which injects the parent process globals into every context, Poku isolates each file in its own child process by default, giving each file its own module cache, global state, and exit code. Like Jest, Poku can also disable isolation to run every file in a single process.

### Compatibility

While Jest supports CJS with experimental ESM and is focused on Node.js, Poku supports CJS and ESM natively and also runs on Bun and Deno. While Jest typically needs a transformer for TypeScript, Poku runs TypeScript without a separate compile step on every supported runtime.

### Features and setup

While Jest ships mocking, spies, snapshots, and coverage out of the box, Poku keeps these out of the core. Mocks, spies, and stubs come from third-party tools, coverage comes from an official plugin, and snapshots are coming. While Jest expects a configuration file for most setups, Poku needs none for the common case.

### When to choose

Choose Jest for a mature, all-in-one toolkit with a deep ecosystem and built-in mocking and snapshots. Choose Poku for a lightweight, fast, zero-config, cross-runtime suite, a single package at about 198KB, when you are comfortable picking your own mocking tools.

---

## Vitest

While Vitest is a modern runner built on Vite, Poku is a bundler-free runner that runs the same suite across Node.js, Bun, and Deno.

### Performance and size

While Vitest pulls in 42 packages at about 24MB, Poku installs as 1 package at about 198KB, making Poku approximately 124x lighter.

- Benchmark: Poku can be up to approximately 4.5x faster than Vitest (v4.1.6).

### Isolation

While Vitest isolates test files using a worker pool and allows toggling isolation off for speed, Poku isolates each file in its own child process by default, giving each file its own module cache, global state, and exit code. Poku can likewise disable isolation to run every file in a single process.

### Compatibility

While Vitest is ESM-only and focused on Node.js, Poku supports both CJS and ESM and also runs on Bun and Deno. Both run TypeScript without a manual compile step, with Poku doing so on every supported runtime.

### Features and setup

While Vitest offers a Jest-compatible API, Poku uses plain JavaScript syntax. While building on Vite gives Vitest an excellent developer experience, such as HMR and an instant watch mode, it also inherits Vite's downsides, including its security advisories and the cost of pulling the Vite bundle into projects that only want to test rather than adopt Vite. While Vitest expects a Vitest config and the Vite toolchain, Poku needs no config for the common case, brings its own watch mode, and depends on no bundler.

### When to choose

Choose Vitest when your project already uses Vite, or for its Jest-compatible API and frontend integration. Choose Poku for a lightweight, bundler-free, cross-runtime suite, a single package at about 198KB, with native CJS and ESM and no configuration.

---

## Mocha

While Mocha is a flexible, long-established runner with a rich plugin ecosystem, Poku is a zero-dependency runner that adds native cross-runtime support and per-file process isolation.

### Performance and size

While Mocha (v11.7.5) pulls in 92 packages at about 9MB, Poku installs as 1 package at about 198KB, making Poku approximately 47x lighter.

- Benchmark: not available.

### Isolation

While Mocha runs all test files in the same process by default so state can leak between files, Poku isolates each file in its own child process by default, giving each file its own module cache, global state, and exit code. When isolation is not needed, Poku can also run every file in a single process.

### Compatibility

While Mocha supports both CJS and ESM on Node.js, it does not have official support for Bun or Deno. Poku supports CJS and ESM natively across Node.js, Bun, and Deno. While Mocha requires a separate TypeScript loader or compiler, Poku runs TypeScript without a separate compile step on every supported runtime.

### Features and setup

While Mocha relies on separate packages for assertions, mocking, and coverage, Poku ships assertions in the core and adds zero-config operation. Mocks, spies, and stubs come from third-party tools, and Poku's official plugin system covers coverage and framework integration.

### When to choose

Choose Mocha for its long-standing stability, its familiar describe and it API on Node.js projects, and its broad plugin ecosystem. Choose Poku for a lightweight, zero-dependency, cross-runtime suite, a single package at about 198KB, with per-file process isolation and no configuration needed.

---

## AVA

AVA and Poku share a similar isolation model, since both run each test file in its own separate process. The practical differences are footprint and reach, as Poku is zero-dependency and far smaller and runs natively on Node.js, Bun, and Deno, while AVA targets Node.js.

### Performance and size

While AVA (v8.0.0) pulls in 140 packages at about 16MB, Poku installs as 1 package at about 198KB, making Poku approximately 83x lighter.

- Benchmark: not available.

### Isolation

While AVA runs each test file in its own separate Node.js process concurrently, Poku also isolates each file in its own child process by default, giving each file its own module cache, global state, and exit code. Poku can also disable isolation to run every file in a single process.

### Compatibility

While AVA supports both CJS and ESM on Node.js, it does not officially support Bun or Deno, whereas Poku supports CJS and ESM natively across Node.js, Bun, and Deno. While AVA needs extra setup to run TypeScript, Poku runs TypeScript without a separate compile step.

### Features and setup

While AVA includes built-in snapshots, Poku's snapshots are still coming. Both ship built-in assertions and leave mocking and spies to third-party tools. While AVA requires configuration for most non-trivial setups, Poku needs none for the common case.

### When to choose

Choose AVA when you want built-in snapshots paired with per-file process isolation, a combination Poku does not offer yet since its snapshots are still coming, on a Node.js project. Choose Poku for a lightweight, zero-dependency, cross-runtime suite, a single package at about 198KB, with native CJS and ESM and no configuration.

---

## Summary

There is no universal best runner. While Jest is a strong all-in-one choice with a deep ecosystem, Vitest shines inside the Vite world, Mocha offers long-standing stability with a familiar API, and AVA pairs built-in snapshots with per-file process isolation, Poku is feature-rich and modular rather than all-in-one. What sets Poku apart is its zero-dependency footprint at about 198KB, native support for Node.js, Bun, and Deno, native ESM and CJS, and TypeScript without a compile step, all with no configuration. Mocks, spies, and stubs rely on third-party libraries, and snapshots are coming.
