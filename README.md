[node-version-url]: https://github.com/nodejs/node
[node-version-image]: https://img.shields.io/badge/Node.js->=6.0.0-badc58
[bun-version-url]: https://github.com/oven-sh/bun
[bun-version-image]: https://img.shields.io/badge/Bun->=0.5.3-f471b5
[deno-version-url]: https://github.com/denoland/deno
[deno-version-image]: https://img.shields.io/badge/Deno->=1.30.0-70ffaf
[typescript-url]: https://github.com/microsoft/TypeScript
[typescript-version-image]: https://img.shields.io/badge/TypeScript->=5.0.2-3077c6
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
[![TypeScript Version][typescript-version-image]][typescript-url]
[![GitHub Workflow Status (with event)][ci-image]][ci-url]
[![GitHub Workflow Status (with event)][ql-image]][ql-url]
[![License][license-image]][license-url]

Enjoying **Poku**? Consider giving him a star ⭐️

---

🐷 [**Documentation Website**](https://poku.dev) • 🔬 [**Compare Poku with the Most Popular Test Runners**](https://poku.dev/docs/comparing)

---

## Why Poku?

Don't worry about `describe`, `it`, `beforeEach` and everything else 🚀

> You don't need to learn what you already know ✨

- Supports **ESM** and **CJS**
- Designed to be highly intuitive
- No need to compile [**TypeScript**][typescript-url] \*
- Compatible with **Coverage** tools
- Allows both **in-code** and **CLI** usage
- [**Node.js**][node-version-url], [**Bun**][bun-version-url] and [**Deno**][deno-version-url] compatibility
- Zero configurations, except you want
- Poku adapts to your test, not the other way around
- [**And much more!**](https://poku.dev)

---

- [![Install Size](https://packagephobia.com/badge?p=poku)](https://packagephobia.com/result?p=poku)
- **Zero** external dependencies 🌱

---

## Documentation

- See detailed usage in [**Documentation**](https://poku.dev/docs/category/documentation) section for **Poku**'s **CLI**, **API (_in-code_)** and **assert**, advanced concepts and much more.

---

## Overview

| Sequential                                         | Concurrent                                       |
| -------------------------------------------------- | ------------------------------------------------ |
| <img src=".github/assets/readme/sequential.png" /> | <img src=".github/assets/readme/parallel.png" /> |

- By default, **Poku**:
  - Searches for all _`.test.`_ and `.spec.` files, but you can customize it using the option [**`filter`**](https://poku.dev/docs/documentation/poku/configs/filter).
  - Uses `sequential` mode.
- You can use concurrecy by using the flag `--parallel` for **CLI** or setting the option `parallel` to `true` in **API** (_in-code_) usage.

> Follow the same idea for [**Bun**][bun-version-url] and [**Deno**][deno-version-url].

---

**Poku** also includes the `assert` method, keeping everything as it is, but providing human readability and automatic `describe` and `it`:

> Compatible with **Node.js**, **Bun** and **Deno**.

```ts
import { assert } from 'poku'; // Node and Bun
import { assert } from 'npm:poku'; // Deno

const actual = '1';

assert(actual, 'My first assert');
assert.deepStrictEqual(actual, 1, 'My first assert error');
```

| Using `poku`                                        | Using `node`                                        |
| --------------------------------------------------- | --------------------------------------------------- |
| <img src=".github/assets/readme/assert-poku.png" /> | <img src=".github/assets/readme/assert-node.png" /> |

- ❌ Both cases finish with `code 1`, as expected
- 🧑🏻‍🎓 The `message` param is optional, as it's in **Node.js**
- 🐷 Unlike most, **Poku** adapts to your test, not the other way around

> [**See the complete assert's documentation**](https://poku.dev/docs/documentation/assert).

---

## Install

### **Node.js**

```bash
npm i -D poku
```

### TypeScript (Node.js)

```bash
npm i -D poku tsx
```

### Bun

```bash
bun add -d poku
```

### **Deno**

```ts
import { poku } from 'npm:poku';
```

---

## Quick Start

### In-code

#### Node.js and Bun

```ts
import { poku } from 'poku';

await poku(['targetDir']);
```

#### Deno

```ts
import { poku } from 'npm:poku';

await poku(['targetDir']);
```

### CLI

> <img src=".github/assets/readme/node-js.svg" width="24" />

```bash
npx poku targetDir
```

> <img src=".github/assets/readme/bun.svg" width="24" />

```bash
bun poku targetDir
```

> <img src=".github/assets/readme/deno.svg" width="24" />

```bash
deno run npm:poku targetDir
```

---

To see the detailed documentation, please visit the [**Documentation**](https://poku.dev/docs/category/documentation) section in the [**Poku**'s website](https://poku.dev).

---

## Community

I'm continuously working to improve **Poku**. If you've got something interesting to share, feel free to submit a [**Pull Request**](https://github.com/wellwelwel/poku/compare). If you notice something wrong, I'd appreciate if you'd open an [**Issue**](https://github.com/wellwelwel/poku/issues/new).

---

## Acknowledgements

- [**Contributors**](https://github.com/wellwelwel/poku/graphs/contributors).

---

## Contributing

Please check the [**CONTRIBUTING.md**](./CONTRIBUTING.md) for instructions 🚀

---

## License

Poku is under the [**MIT** License](./LICENSE).

---

## Security Policy

Please check the [**SECURITY.md**](./SECURITY.md) and the section [**Is Poku Safe?**](https://poku.dev/docs/security) from Documentation.
