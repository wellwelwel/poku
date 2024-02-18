[node-version-url]: https://github.com/nodejs/node
[node-version-image]: https://img.shields.io/badge/Node.js->=6.0.0-badc58
[bun-version-url]: https://github.com/oven-sh/bun
[bun-version-image]: https://img.shields.io/badge/Bun->=0.5.3-f471b5
[deno-version-url]: https://github.com/denoland/deno
[deno-version-image]: https://img.shields.io/badge/Deno->=1.30.0-70ffaf
[npm-image]: https://img.shields.io/npm/v/poku.svg?color=3dc1d3
[npm-url]: https://npmjs.org/package/poku
[ci-url]: https://github.com/wellwelwel/poku/actions/workflows/ci.yml?query=branch%3Amain
[ci-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci.yml?event=push&style=flat&label=CI&branch=main
[ql-url]: https://github.com/wellwelwel/poku/actions/workflows/codeql.yml?query=branch%3Amain
[ql-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/codeql.yml?event=push&style=flat&label=Code%20QL&branch=main
[license-url]: https://github.com/wellwelwel/poku/blob/main/LICENSE
[license-image]: https://img.shields.io/npm/l/poku.svg?maxAge=2592000&color=9c88ff

# Poku

<img align="right" width="128" height="128" alt="Logo" src=".github/assets/readme/poku.svg">

A flexible and easy-to-use **Test Runner** for [Node][node-version-url], [Bun][bun-version-url] and [Deno][deno-version-url] that allows you to run **parallel** and **sequential** tests, plus **high isolation level per test file**.

[![Node.js Version][node-version-image]][node-version-url]
[![Bun Version][bun-version-image]][bun-version-url]
[![Deno Version][deno-version-image]][deno-version-url]
[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![GitHub Workflow Status (with event)][ci-image]][ci-url]
[![GitHub Workflow Status (with event)][ql-image]][ql-url]

---

## Why Poku?

> **Poku** starts from the premise where tests come to help, not overcomplicate: runs test files in an individual process per file, shows progress and exits 🧙🏻

- Supports **ESM** and **CJS**
- Designed to be highly intuitive
- No need to compile **TypeScript**
- Compatible with **Coverage** tools
- Allows both **in-code** and **CLI** usage
- Zero configurations, except you want
- No constraints or rules, code in your own signature style

---

- Totally **dependency-free**
- **Poku** dive to the deepest depths to find tests in the specified directories
- **Compatibility:** **Poku** is tested across all **Node 6+**, **Bun 0.5.3+** and **Deno 1.30+** versions
- **Poku** uses itself to test its own tests using `process.exit` at several depths on the same process node

---

```bash
  npx poku --include='test/unit,test/integration'
```

<img src="./.github/assets/readme/screen-recording-2024-02-17-at-23.38.06.gif" width="360">

---

## Install

### **Node.js**

> <img src=".github/assets/readme/node-js.svg" width="24" />

```bash
npm install --save-dev poku
```

### TypeScript (Node.js)

> <img src=".github/assets/readme/node-js.svg" width="24" />
> <img src=".github/assets/readme/plus.svg" width="24" />
> <img src=".github/assets/readme/typescript.svg" width="24" />

```bash
npm install --save-dev poku tsx
```

### Bun

> <img src=".github/assets/readme/bun.svg" width="24" />
> <img src=".github/assets/readme/plus.svg" width="24" />
> <img src=".github/assets/readme/typescript.svg" width="24" />

```bash
bun add --dev poku
```

### **Deno**

> <img src=".github/assets/readme/deno.svg" width="24" />
> <img src=".github/assets/readme/plus.svg" width="24" />
> <img src=".github/assets/readme/typescript.svg" width="24" />

```ts
import { poku } from 'npm:poku';
```

- **Poku** requires these permissions by default: `--allow-read`, `--allow-env` and `--allow-run`.

---

## Basic Usage

### In-code

> <img src=".github/assets/readme/node-js.svg" width="24" />
> <img src=".github/assets/readme/plus.svg" width="24" />
> <img src=".github/assets/readme/bun.svg" width="24" />

```ts
import { poku } from 'poku';

await poku(['./a', './b']);
```

> <img src=".github/assets/readme/deno.svg" width="24" />

```ts
import { poku } from 'npm:poku';

await poku(['./a', './b']);
```

### CLI

> <img src=".github/assets/readme/node-js.svg" width="24" />

```bash
npx poku --include='./a,./b'
```

> <img src=".github/assets/readme/bun.svg" width="24" />

```bash
bun poku --include='./a,./b'
```

> <img src=".github/assets/readme/deno.svg" width="24" />

```bash
deno run npm:poku --include='./a,./b'
```

---

## Documentation

> Website in Progress 🧑🏻‍🔧
>
> Initially, the documentation is based on **Node.js** usage, but you can use all the options normally for both **Bun** and **Deno**.

### `poku(targetDirs: string | string[])`

#### Include directories

```ts
poku('./targetDir');
```

```ts
poku(['./targetDirA', './targetDirB']);
```

```bash
npx poku --include='./targetDir'
```

```bash
npx poku --include='./targetDirA,./targetDirB'
```

---

### `poku(targetDirs: string | string[], configs?: Configs)`

#### `filter: RexExp`

By default, **Poku** searches for _`.test.`_ files, but you can customize it using the `filter` option.

> Filter by path using **Regex** to match only the files that should be performed.

- **in-code**

```ts
/**
 * @default
 *
 * Testing all `*.test.*` files.
 */

poku(['...'], {
  filter: /\.test\./,
});
```

```ts
/**
 * Testing all `ts`, `js`, `mts` and `mjs` files
 */

poku(['...'], {
  filter: /\.(m)?(j|t)?s$/,
  // filter: /\.(js|ts|mjs|mts)$/,
});
```

- **CLI**

```bash
# Testing only a specific file

npx poku --include='...' --filter='some-file'
```

```bash
# Testing only a specific file

npx poku --include='...' --filter='some-file|other-file'
```

```bash
# Testing only paths that contains "unit"

npx poku --include='...' --filter='unit'
```

- **Environment Variable**

> By using `FILTER` from **Environment Variable**, it will overwrite the `filter` option.

```bash
# Testing only a specific file

FILTER='some-file' npx poku --include='...'
```

```bash
# Testing only a specific file

FILTER='some-file|other-file' npx poku --include='...'
```

```bash
# Testing only paths that contains "unit"

FILTER='unit' npx poku --include='...'
```

---

#### `parallel: boolean`

Determines the mode of test execution across **sequential** or **parallel** modes.

- **in-code**

```ts
/**
 * @default
 *
 * Sequential mode
 */

poku(['...'], {
  parallel: false,
});
```

```ts
/**
 * Parallel mode
 */

poku(['...'], {
  parallel: true,
});
```

- **CLI**

> _Since **1.2.0**_

```bash
# Parallel mode

npx poku --include='...' --parallel
```

---

#### `exclude: RexExp | RexExp[]`

> Exclude by path using Regex to match only the files that should be performed.
>
> _Since **1.2.0**_

- **in-code**:

```ts
/**
 * Excluding  directories from tests
 */

poku(['...'], {
  exclude: /\/(helpers|tools)\//,
});
```

```ts
/**
 * Excluding  directories from tests
 */

poku(['...'], {
  exclude: [/\/helpers\//, /\/tools\//],
});
```

```ts
/**
 * Excluding specific files from tests
 */

poku(['...'], {
  exclude: /(index|common).test.ts/,
});
```

```ts
/**
 * Excluding specific files from tests
 */

poku(['...'], {
  exclude: [/index.test.ts/, /common.test.ts/],
});
```

```ts
/**
 * Excluding directories and files from tests
 */

poku(['...'], {
  exclude: /\/(helpers|tools)\/|(index|common).test.ts/,
});
```

```ts
/**
 * Excluding directories and files from tests
 */

poku(['...'], {
  exclude: [/\/helpers\//, /\/tools\//, /index.test.ts/, /common.test.ts/],
});
```

- **CLI**

```bash
# Excluding directories and files from tests

npx poku --include='...' --exclude='some-file-or-dir'
```

```bash
# Excluding directories and files from tests

npx poku --include='...' --exclude='some-file-or-dir|other-file-or-dir'
```

---

### `listFiles(targetDir: string, configs?: ListFilesConfigs)`

Returns all files in a directory, independent of their depth.

```ts
listFiles('some-dir');
```

- You can use the `filter` and `exclude` options, as well as they are for **`poku`** method.
