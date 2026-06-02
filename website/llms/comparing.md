# Comparing Poku, Jest, and Vitest

> An honest comparison of Poku, Jest, and Vitest, including where each one is the better fit.

Poku is a zero-dependency, cross-platform test runner that runs the same suite on Node.js, Bun, and Deno and executes TypeScript without a separate compile step. It is feature-rich and modular at its core, so robust capabilities that do not need to live in the core stay out by default. It is not all-in-one by design, so mocks, spies, and stubs come from third-party tools and snapshots are coming. An official plugin system adds extras such as coverage and React testing, for example, so you can assemble your own "all-in-one" or use only what you need.

---

## Jest

While Jest is a mature, all-in-one runner with a large ecosystem, Poku is a lighter, modular runner that runs the same suite across Node.js, Bun, and Deno.

### Performance and size

While Jest pulls in 293 packages at about 28MB, Poku installs as 1 package at about 198KB. In continuous benchmarks, Poku is approximately 5.3x faster than Jest (v30.4.2).

### Compatibility

While Jest supports CJS with experimental ESM and is focused on Node.js, Poku supports CJS and ESM natively and also runs on Bun and Deno. While Jest typically needs a transformer for TypeScript, Poku runs TypeScript without a separate compile step.

### Features and setup

While Jest ships mocking, spies, snapshots, and coverage out of the box, Poku keeps these out of the core. Mocks, spies, and stubs come from third-party tools, coverage comes from official plugins, and snapshots are coming. While Jest expects a configuration file for most setups, Poku needs none for the common case.

### When to choose

Choose Jest for a mature, all-in-one toolkit with a deep ecosystem and built-in mocking and snapshots. Choose Poku for a lightweight, fast, zero-config, cross-runtime suite, a single package at about 198KB, when you are comfortable picking your own mocking tools.

---

## Vitest

While Vitest is a modern runner built on Vite, Poku is a bundler-free runner that runs the same suite across Node.js, Bun, and Deno.

### Performance and size

While Vitest pulls in 42 packages at about 24MB, Poku installs as 1 package at about 198KB. In continuous benchmarks, Poku is approximately 4.5x faster than Vitest (v4.1.6).

### Compatibility

While Vitest is ESM-only and focused on Node.js, Poku supports both CJS and ESM and also runs on Bun and Deno. Both run TypeScript without a manual compile step, with Poku doing so on every supported runtime.

### Features and setup

While Vitest offers a Jest-compatible API and an instant watch mode, Poku uses plain JavaScript syntax and its own watch mode. While Vitest expects a vitest.config and the Vite toolchain, Poku needs no config for the common case and does not depend on a bundler.

### When to choose

Choose Vitest when your project already uses Vite, or for its Jest-compatible API and frontend integration. Choose Poku for a lightweight, bundler-free, cross-runtime suite, a single package at about 198KB, with native CJS and ESM and no configuration.

---

## Summary

There is no universal best runner. While Jest is a strong all-in-one choice and Vitest shines inside the Vite world, Poku is feature-rich and modular rather than all-in-one. It fits projects that value a small footprint, zero configuration, native ESM and CJS, TypeScript without a compile step, and a single suite across Node.js, Bun, and Deno. Mocks, spies, and stubs rely on third-party libraries, and snapshots are coming.
