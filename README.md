[node-version-url]: https://github.com/nodejs/node
[node-version-image]: https://img.shields.io/badge/Node.js->=6.0.0-badc58
[bun-version-url]: https://github.com/oven-sh/bun
[bun-version-image]: https://img.shields.io/badge/Bun->=0.5.3-f471b5
[deno-version-url]: https://github.com/denoland/deno
[deno-version-image]: https://img.shields.io/badge/Deno->=1.30.0-70ffaf
[npm-image]: https://img.shields.io/npm/v/poku.svg?color=3dc1d3
[npm-url]: https://npmjs.org/package/poku
[typescript-url]: https://github.com/microsoft/TypeScript
[ci-url]: https://github.com/wellwelwel/poku/actions/workflows/ci.yml?query=branch%3Amain
[ci-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci.yml?event=push&style=flat&label=CI&branch=main
[ql-url]: https://github.com/wellwelwel/poku/actions/workflows/codeql.yml?query=branch%3Amain
[ql-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/codeql.yml?event=push&style=flat&label=Code%20QL&branch=main
[license-url]: https://github.com/wellwelwel/poku/blob/main/LICENSE
[license-image]: https://img.shields.io/npm/l/poku.svg?maxAge=2592000&color=9c88ff

# Poku

<img align="right" width="128" height="128" alt="Logo" src=".github/assets/readme/poku.svg">

**Poku** is your test runner pet for [**Node.js**][node-version-url], [**Bun**][bun-version-url] and [**Deno**][deno-version-url] combining **flexibility**, **parallel** and **sequential** runs, **human-friendly assertion errors** and **high isolation level**.

[![Node.js Version][node-version-image]][node-version-url]
[![Bun Version][bun-version-image]][bun-version-url]
[![Deno Version][deno-version-image]][deno-version-url]
[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![GitHub Workflow Status (with event)][ci-image]][ci-url]
[![GitHub Workflow Status (with event)][ql-image]][ql-url]

Enjoying Poku? Consider giving him a star ⭐️

---

🐷 [**Documentation Website**](https://wellwelwel.github.io/poku)

---

## Why Poku?

> **Poku** starts from the premise where tests come to help, not overcomplicate: runs test files in an individual process per file, shows progress and exits 🧙🏻

- Supports **ESM** and **CJS**
- Designed to be highly intuitive
- No need to compile [**TypeScript**][typescript-url] \*
- Compatible with **Coverage** tools
- Allows both **in-code** and **CLI** usage
- [**Node.js**][node-version-url], [**Bun**][bun-version-url] and [**Deno**][deno-version-url] compatibility
- Zero configurations, except you want
- No constraints or rules, code in your own signature style
- [**And much more!**](https://wellwelwel.github.io/poku)

---

- <img src="https://img.shields.io/bundlephobia/min/poku?label=Final%20Size">
- **Zero** external dependencies

---

## Documentation

- See detailed specifications and usage in [**Documentation**](https://wellwelwel.github.io/poku/docs/category/documentation) section for queries, advanced concepts and much more.

---

## Overview

| Sequential                                                   | Parallel                                                   |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| `npx poku test/unit,test/integration`                        | `npx poku --parallel test/unit,test/integration`           |
| <img src=".github/assets/readme/sequential.png" width="360"> | <img src=".github/assets/readme/parallel.png" width="360"> |

- By default, **Poku** searches for all _`.test.`_ files, but you can customize it using the option [`filter`](https://github.com/wellwelwel/poku#filter-rexexp).
- The same idea for [**Bun**][bun-version-url] and [**Deno**][deno-version-url] (see bellow).

---

**Poku** also includes the `assert` method, keeping everything as it is, but providing human readability:

```ts
import { assert } from 'poku'; // Node and Bun
import { assert } from 'npm:poku'; // Deno

assert(true);
assert.deepStrictEqual(1, '1', 'My optional custom message');
```

> <img src=".github/assets/readme/assert.png" width="468" />

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

## Quick Start

### In-code

> <img src=".github/assets/readme/node-js.svg" width="24" />
> <img src=".github/assets/readme/plus.svg" width="24" />
> <img src=".github/assets/readme/bun.svg" width="24" />

```ts
import { poku } from 'poku';

await poku(['targetDirA', 'targetDirB']);
```

> <img src=".github/assets/readme/deno.svg" width="24" />

```ts
import { poku } from 'npm:poku';

await poku(['targetDirA', 'targetDirB']);
```

### CLI

> <img src=".github/assets/readme/node-js.svg" width="24" />

```bash
npx poku targetDirA,targetDirB
```

> <img src=".github/assets/readme/bun.svg" width="24" />

```bash
bun poku targetDirA,targetDirB
```

> <img src=".github/assets/readme/deno.svg" width="24" />

```bash
deno run npm:poku targetDirA,targetDirB
```

---

To see the detailed documentation, please visit the [**Documentation**](https://wellwelwel.github.io/poku/docs/category/documentation) section in the [**Poku**'s website](https://wellwelwel.github.io/poku).

---

## Community

I'm continuously working to improve **Poku**. If you've got something interesting to share, feel free to submit a [**Pull Request**](https://github.com/wellwelwel/poku/compare). If you notice something wrong, I'd appreciate if you'd open an [**Issue**](https://github.com/wellwelwel/poku/issues/new).

---

## Acknowledgements

- [**Contributors**](https://github.com/wellwelwel/poku/graphs/contributors)
