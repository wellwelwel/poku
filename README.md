[npm-image]: https://img.shields.io/npm/v/poku.svg?color=f78fb3
[npm-url]: https://npmjs.org/package/poku
[ci-url]: https://github.com/wellwelwel/poku/actions/workflows/ci.yml?query=branch%3Amain
[ci-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/svps/ci.yml?event=push&style=flat&label=ci&branch=main&color=badc58
[license-url]: https://github.com/wellwelwel/poku/blob/main/LICENSE
[license-image]: https://img.shields.io/npm/l/poku.svg?maxAge=2592000&color=3dc1d3
[node-version-image]: https://img.shields.io/node/v/poku.svg?color=ffb142
[node-version-url]: https://nodejs.org/en/download

# Poku

<img align="right" width="128" height="128" alt="Logo" src=".github/assets/readme/poku.svg">

🖇️ A flexible and easy-to-use **Test Runner** for parallel or sequential runs and high isolation level.

[![NPM Version][npm-image]][npm-url]
[![Node.js Version][node-version-image]][node-version-url]
[![GitHub Workflow Status (with event)][ci-image]][ci-url]
[![License][license-image]][license-url]

---

## Why Poku?

🪄 Runs test files in an individual process, shows progress and exits.<br/>

- **Poku** is designed to be highly intuitive.<br />
- Supports **Node.js 6+** (_ESM_ and _CJS_), **TypeScript** (_no need to build_) and **Coverage** tools.<br />
- **Poku** dive to the deepest depths to find tests in the specified directories.
- No constraints or rules, code in your own signature style.
- Zero configurations, except you want.
- Allows both **in-code** and **CLI** usage.

---

- Totally **dependency-free**.
- **Compatibility:** **Poku** is tested across all **Node 6+** versions.
- **Poku** uses itself to test its own tests using `process.exit` at several depths on the same process node.

---

## Install

```bash
npm install --save-dev poku
```

---

## Basic Usage

## In-code

```ts
import { poku } from 'poku';

await poku(['./a', './b']);
```

### CLI

```bash
npx poku --include='./a,./b'
```

---

### TypeScript

To run your tests without compile, just install `tsx` and it's done:

```bash
npm install --save-dev tsx
```

---

## Documentation

### `poku`

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

#### `filter`

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
# Testing only paths that contains "unit"

FILTER='unit' npx poku --include='...'
```

---

#### `parallel`

Determines the mode of test execution across **parallelism** or **sequential** modes.

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

---

## In progress

> 🧑🏻‍🔧 Soon releasing version `1.x`.<br />
> 🧑🏻‍🎓 Soon documenting all options and **Poku**'s usage variations.
