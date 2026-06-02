# Poku's Testing Philosophy

> How Poku differs from test runners as a whole, by treating tests as plain JavaScript and TypeScript instead of entries in an internal test tree.

Most test runners read your files, register every `describe`, `it`, and `test` into an internal structure, and then decide when and how each one runs. Poku breaks from that. It treats a test file as ordinary JavaScript or TypeScript and lets the file run itself, so the act of testing stays with you. The familiar toolkit is all there, and all of it is optional.

---

## Tests are just JavaScript and TypeScript

When you call `describe`, `it`, or `test`, Poku runs your callback in place and reports what happened. There is no global registry that collects test cases to schedule later, and `test` is simply an alias of `it`. A test is whatever your file does when it executes, which is why a single assertion in a file is already a complete test.

While traditional runners own the lifecycle of every test case, Poku hands that ownership back to you and stays out of the way.

---

## Plain control flow instead of hooks

Because nothing is registered up front, ordering follows ordinary JavaScript. Statements run top to bottom, and a test runs sequentially when you `await` it or concurrently when you do not. There is no hidden hoisting to reason about and no lifecycle hook required to run setup in order.

Most runners express setup and teardown through lifecycle hooks:

```js
describe('My Test', () => {
  // Setup goes in a dedicated hook that runs before the tests
  beforeAll(() => {
    console.log('Started');
  });

  // Teardown is declared here, before the tests even begin, yet runs after them
  afterAll(() => {
    console.log('Done');
  });

  // The runner schedules these
  it(async () => {
    await stepOne();
  });

  // Although asynchronous they run sequentially even without await
  it(async () => {
    await stepTwo();
  });
});
```

Poku expresses the same intent as plain statements:

```js
import { describe, it } from 'poku';

await describe('My Test', async () => {
  console.log('Started');

  await it(async () => {
    await stepOne();
  });

  await it(async () => {
    await stepTwo();
  });

  console.log('Done');
});
```

- It's just JavaScript 🐷

`beforeEach` and `afterEach` still exist for per-case work for `it` and `test`, and they run only when you define them. The trade-off is intentional. You mind `async` and `await` yourself, exactly as in any JavaScript file, instead of relying on the runner to smooth it over.

In a real scenario, the `console.log` example calls could be database connections, APIs, processes, and services.

---

## Run with or without Poku

A Poku test file imports plain functions and values, so it can execute on its own. You can run it straight through the runtime, such as `node test.js`, `bun --bun test.ts`, or `deno run test.ts`, and the assertions still run and report.

What the `poku` command adds is the orchestration around your files. By default it runs each file in its own child process for isolation, runs files in parallel up to the number of available cores, and prints a consolidated summary. Disabling isolation runs every file in a single process instead. The behavior inside a file never changes, only how Poku discovers, isolates, and reports across files.

---

## Performance through doing less

Skipping the internal test tree is one reason Poku is fast, since there is no structure to populate, no per-case scheduler, and assertions are a thin layer over Node's native `assert`. Most of the speed comes from running files in parallel across processes. The model and the performance reinforce each other, and the model is the point.

Poku also does no project-wide bookkeeping before it runs. It looks only at the paths you pass it, never crawling the rest of the project, and builds no global module map or tree hash up front. With no map to build, hold, or serialize, Poku stays light and predictable even in large monorepos and symlink-heavy installs such as pnpm.

---

## Trade-offs and who it fits

By keeping tests in plain JavaScript, Poku lowers the barrier to writing them. There is no test-only sub-syntax to learn first, so your tests can stay at your current level and grow as you do. That same plainness can feel unfamiliar if you have spent years with hook-driven runners that control ordering for you.

Poku is feature-rich and modular rather than all-in-one. Assertions ship in the core, coverage and framework integration come from official plugins, mocks, spies, and stubs come from third-party tools, and snapshots are on the way.
