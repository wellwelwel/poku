# Poku

> Feature-rich, modular, zero-dependency, cross-platform test runner that brings the JavaScript essence back to testing. It runs the same suite on Node.js, Bun, and Deno with ESM, CJS, and TypeScript support.

Poku v4. Install Poku, write a test file, and run it. No config is required for the common case.

## Install

```bash
# Node.js
npm i -D poku

# Node.js with TypeScript
npm i -D poku tsx

# Bun (TypeScript supported natively)
bun add -d poku

# Deno (TypeScript supported natively, installation is optional)
deno add npm:poku
```

## Test examples

A plain assertion, which is already a complete test on its own:

```js
import { assert } from 'poku';

assert.strictEqual(1 + 2, 3, 'Math should add up');
```

A unit test that groups its logic and assertions with `test`:

```js
import { test, strict } from 'poku';

test('sum', () => {
  const actual = 2 + 3;

  strict.strictEqual(actual, 5, 'It sums two numbers');
});
```

An asynchronous test that opens and closes a resource in the outer `describe` scope, so the assertion stays isolated in its own `it` and the connection is always closed even if the assertion fails:

```js
import { createConnection } from 'mysql2/promise';
import { describe, it, assert } from 'poku';

await describe('Users table', async () => {
  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    database: 'app',
  });

  await it('returns the seeded user', async () => {
    const [rows] = await connection.query(
      'SELECT name FROM users WHERE id = ?',
      [1]
    );

    assert.deepStrictEqual(
      { ...rows[0] },
      { name: 'Poku' },
      'The seeded user is present'
    );
  });

  await connection.end();
});
```

`assert` and `strict` keep the familiar Node.js assert API. Every method accepts an optional message as its last argument, and Poku prints that message on both success and failure, so write it as a human-readable description of the assertion. Group assertions with `describe` and label each case with `it` or `test`, where titles are optional. Synchronous tests need no `await`. For asynchronous tests, `await` the `it` or `test` call to run sequentially, or omit `await` to run in parallel. In CommonJS files, where top-level `await` is not available, wrap the groups in an asynchronous `describe` that you do not await. You can nest `describe` inside `describe`, but avoid nesting `it` or `test`. Never open or close a service, process, or resource in the same scope as an assertion that may fail, because if it throws the cleanup never runs and the process hangs. Open and close it in an outer `describe` scope instead.

## Run

```bash
# Node.js
npx poku

# Bun
bun --bun poku

# Deno
deno run npm:poku
```

Prefer a `package.json` script or a `deno.json` task for repeatable runs. Config is auto-detected from `poku.config.js`, `.pokurc.json`, or `.pokurc.jsonc`, and you can pass `--config` (`-c`) for a custom path.

Run `poku -h` for the full list of CLI options.

## Documentation

- [Getting Started](https://poku.io/docs): Installation, quickstart, and the recommended learning path.
- [assert](https://poku.io/docs/documentation/assert): The assert API that mirrors Node.js assert and prints messages on success and failure.
- [describe](https://poku.io/docs/documentation/helpers/describe): Group and title test suites, with support for nesting.
- [it](https://poku.io/docs/documentation/helpers/it): Label individual test cases inside a describe block.
- [test](https://poku.io/docs/documentation/helpers/test): Standalone test helper, an alternative to it for flat structures.
- [Coverage](https://poku.io/docs/documentation/helpers/coverage): Enable coverage with `--coverage` and a plugin such as `@pokujs/c8`.
- [startService](https://poku.io/docs/documentation/helpers/startService): Start a service or long-running process before your tests and stop it afterward.

## Configuration and CLI

- [Config Files](https://poku.io/docs/documentation/poku/config-files): Auto-discovered config files and the `--config` flag.
- [Include directories and files](https://poku.io/docs/documentation/poku/include-files): Pass directories or file paths as arguments and customize discovery with `--filter`.
- [Reporters](https://poku.io/docs/documentation/poku/options/reporter): Choose an output style, `poku` (default), `compact`, `dot`, `focus`, or `classic`.
- [testNamePattern](https://poku.io/docs/documentation/poku/options/testNamePattern): Run only tests whose title matches a pattern (`-t`).
- [debug](https://poku.io/docs/documentation/poku/options/debug): Show all output from test files, including suppressed logs (`-d`).

## Examples

- [Promises](https://poku.io/docs/examples/promises): Sequential and parallel asynchronous tests in the same file, plus post-test steps.
- [Parameterized tests](https://poku.io/docs/examples/parameterized-tests): Drive the same assertion with multiple input and output pairs.
- [Database with Drizzle](https://poku.io/docs/examples/database/drizzle): End-to-end testing with Drizzle ORM and Docker Compose.
- [Database with Knex](https://poku.io/docs/examples/database/knex): End-to-end testing with Knex and Docker Compose.
- [Database with MongoDB](https://poku.io/docs/examples/database/mongodb): End-to-end testing with the mongodb driver and Docker Compose.
- [Database with mysql2](https://poku.io/docs/examples/database/mysql2): End-to-end testing with the mysql2 driver and Docker Compose.
- [Database with pg](https://poku.io/docs/examples/database/pg): End-to-end testing with the pg driver and Docker Compose.
- [Database with Prisma](https://poku.io/docs/examples/database/prisma): End-to-end testing with Prisma and Docker Compose.
- [Database with Sequelize](https://poku.io/docs/examples/database/sequelize): End-to-end testing with Sequelize and Docker Compose.
- [Database with TypeORM](https://poku.io/docs/examples/database/typeorm): End-to-end testing with TypeORM and Docker Compose.

## Tutorials

- [Beginner](https://poku.io/docs/tutorials/beginner): From a first assertion to running a full test file.
- [Cross-platform](https://poku.io/docs/tutorials/cross-platform): Running the same suite on Node.js, Bun, and Deno, with recommendations to avoid conflicts.
- [Good practices](https://poku.io/docs/tutorials/good-practices): Organizing tests by responsibility and avoiding common pitfalls.

## Optional

- [Philosophy](https://poku.io/docs/philosophy): Why Poku exists and the reasoning behind the JavaScript essence and zero dependencies.
