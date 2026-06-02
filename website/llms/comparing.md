# Comparing Poku, Jest, Vitest, Mocha, AVA, and Supertest

> A transparent comparison of Poku against Jest, Vitest, Mocha, AVA, and Supertest, including where each one is the better fit.

Poku is a zero-dependency, cross-platform test runner that runs the same suite on Node.js, Bun, and Deno and executes TypeScript without a separate compile step. It is feature-rich and modular at its core, so robust capabilities that do not need to live in the core stay out by default. It is not all-in-one by design, so mocks, spies, and stubs come from third-party tools and snapshots are coming. An official plugin system adds extras such as coverage and React testing, so you can assemble your own all-in-one or use only what you need.

Cross-runtime support is only one of Poku's benefits. Its zero-dependency footprint at about 198KB, zero-config setup, performance, and plain-JavaScript model apply even if Node.js is your only target, and running the same suite on Bun and Deno is an added benefit on top.

The sections below compare Poku with one runner at a time. For the broader paradigm that sets Poku apart from test runners as a whole, see [Poku's Testing Philosophy](./philosophy.md).

---

## Jest

While Jest is a mature, all-in-one runner with a large ecosystem, Poku is a lighter, modular runner that runs the same suite across Node.js, Bun, and Deno.

### Performance and size

While Jest pulls in 293 packages at about 28MB, Poku installs as a single package at about 198KB, making it approximately 145x lighter.

- Benchmark: Poku can be up to approximately 5.3x faster than Jest (v30.4.2).

### Isolation

While Jest isolates each test file in a Node vm sandbox that injects the parent process globals into every context, Poku isolates each file in its own child process by default, giving each file its own module cache, global state, and exit code. Like Jest, Poku can also disable isolation to run every file in a single process.

### Compatibility

While Jest supports CJS with experimental ESM and is focused on Node.js, Poku supports CJS and ESM natively and also runs on Bun and Deno. While Jest typically needs a transformer for TypeScript, Poku runs TypeScript without a separate compile step on every supported runtime.

### Features and setup

While Jest ships mocking, spies, snapshots, and coverage out of the box, Poku keeps these out of the core, with mocks and spies from third-party tools, coverage from an official plugin, and snapshots coming. While Jest expects a configuration file for most setups, Poku needs none for the common case.

### When to choose

Choose Jest for a mature, all-in-one toolkit with a deep ecosystem and built-in mocking and snapshots. Choose Poku for a lightweight, fast, zero-config suite, even on Node.js alone, when you are comfortable picking your own mocking tools.

---

## Vitest

While Vitest is a modern runner built on Vite, Poku is a bundler-free runner.

### Performance and size

While Vitest pulls in 42 packages at about 24MB, Poku installs as a single package, making it approximately 124x lighter.

- Benchmark: Poku can be up to approximately 4.5x faster than Vitest (v4.1.6).

### Isolation

While Vitest isolates test files with a worker pool and can toggle isolation off for speed, Poku isolates each file in its own child process by default.

### Compatibility

While Vitest is ESM-only and focused on Node.js, Poku supports both CJS and ESM and adds Bun and Deno. Both run TypeScript with no manual compile step.

### Features and setup

While Vitest offers a Jest-compatible API, Poku uses plain JavaScript syntax. While building on Vite gives Vitest an excellent developer experience, such as HMR and an instant watch mode, it also inherits Vite's downsides, including its security advisories and the cost of pulling the Vite bundle into projects that only want to test. Poku needs no config for the common case and brings its own watch mode.

### When to choose

Choose Vitest when your project already uses Vite, or for its Jest-compatible API and frontend integration. Choose Poku for a lightweight, bundler-free suite with native CJS and ESM and no configuration, even if you only target Node.js.

---

## Mocha

While Mocha is a flexible, long-established runner with a rich plugin ecosystem, Poku is a zero-dependency runner that adds native cross-runtime support and per-file process isolation.

### Performance and size

While Mocha (v11.7.5) pulls in 92 packages at about 9MB, Poku installs as a single package, making it approximately 47x lighter.

- Benchmark: not available.

### Isolation

While Mocha runs all test files in the same process by default, so state can leak between files, Poku isolates each file in its own child process by default.

### Compatibility

While Mocha supports both CJS and ESM on Node.js, it does not officially support Bun or Deno, whereas Poku runs natively across all three. While Mocha requires a separate TypeScript loader or compiler, Poku runs TypeScript with no separate compile step.

### Features and setup

While Mocha relies on separate packages for assertions, mocking, and coverage, Poku ships assertions in the core with zero-config operation, leaves mocks and spies to third-party tools, and provides coverage and framework integration through its official plugin system.

### When to choose

Choose Mocha for its long-standing stability, its familiar describe and it API on Node.js projects, and its broad plugin ecosystem. Choose Poku for a lightweight, zero-dependency suite with per-file process isolation and no configuration, even on a Node.js-only project.

---

## AVA

AVA and Poku share a similar isolation model, since both run each test file in its own separate process. The practical differences are footprint and reach, since Poku is zero-dependency, far smaller, and runs natively on Node.js, Bun, and Deno, while AVA targets Node.js.

### Performance and size

While AVA (v8.0.0) pulls in 140 packages at about 16MB, Poku installs as a single package, making it approximately 83x lighter.

- Benchmark: not available.

### Isolation

Both isolate each file in its own process by default. Poku can also run every file in a single process when isolation is not needed.

### Compatibility

While AVA supports both CJS and ESM on Node.js, it does not officially support Bun or Deno, whereas Poku runs natively across all three. While AVA needs extra setup to run TypeScript, Poku runs TypeScript with no separate compile step.

### Features and setup

While AVA includes built-in snapshots, Poku's are coming. Both ship built-in assertions and leave mocking and spies to third-party tools. While AVA requires configuration for most non-trivial setups, Poku needs none for the common case.

### When to choose

Choose AVA when you want built-in snapshots paired with per-file process isolation, a combination Poku does not offer yet since its snapshots are coming, on a Node.js project. Choose Poku for a lightweight, zero-dependency suite with native CJS and ESM and no configuration, even when Node.js is all you target.

---

## Supertest

While Supertest is an HTTP assertion library that tests a server in process, Poku covers server testing with two built-in helpers, `startService` and `startScript`, that run the real server as a background process. Supertest is not a test runner, so it runs inside one, while Poku's helpers ship in its core.

### Performance and size

Adding Supertest and its type definitions pulls in 50 packages at about 5.9MB, on top of whatever runner you use. Poku's `startService` and `startScript` ship in its zero-dependency core, so they add nothing.

- Benchmark: not applicable.

### Approach

While Supertest binds your app or server in process, starting it on an ephemeral port and asserting with a fluent chain of expectations on status, headers, and body, Poku starts the real server as a background process, with `startService` for a file and `startScript` for a package.json script or deno.json task. It resolves on the service's first output, or you can wait for a specific readiness signal through startAfter, then test the live server with any requester such as the native fetch or Axios plus plain assert, and call end to stop it. While Supertest manages its own lifecycle automatically, Poku keeps the lifecycle explicit in ordinary code.

### Compatibility

While Supertest is SuperAgent based and oriented to Node HTTP apps such as Express and Koa, which you pass to it as an app or a server URL, Poku runs the real process as it is, with no export or refactor, and works with any requester and any service or framework such as Next.js, Nuxt, or nodemon, across Node.js, Bun, and Deno. While Supertest brings purpose-built HTTP features such as header and cookie assertions, persistent session agents, and HTTP/2, Poku leaves the requests and assertions to the tools you already use.

### When to choose

Choose Supertest for fast in-process HTTP assertions that skip the real network, with a fluent, purpose-built API and an automatic ephemeral-port lifecycle, especially for Node apps like Express and Koa. Choose Poku's `startService` and `startScript` to test the real running server over the real network, with no changes to your app, any requester, and cross-runtime support, all built into the zero-dependency core.

---

## Summary

There is no universal best runner. While Jest is a strong all-in-one choice with a deep ecosystem, Vitest shines inside the Vite world, Mocha offers long-standing stability with a familiar API, and AVA pairs built-in snapshots with per-file process isolation, Poku is feature-rich and modular rather than all-in-one. Most of what sets it apart holds even if Node.js is your only target, from its zero-dependency footprint and zero-config setup to its performance, plain-JavaScript model, and per-file process isolation. Running natively on Bun and Deno is an added benefit, not the reason to choose it. Supertest is a different kind of tool, an HTTP assertion library that runs inside a runner, and Poku reaches the same server-testing goal through its built-in `startService` and `startScript` helpers.
