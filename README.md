[npm-image]: https://img.shields.io/npm/v/poku.svg?color=f78fb3
[npm-url]: https://npmjs.org/package/poku
[ci-url]: https://github.com/wellwelwel/poku/actions/workflows/ci.yml?query=branch%3Amain
[ci-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci.yml?event=push&style=flat&label=ci&branch=main&color=badc58
[license-url]: https://github.com/wellwelwel/poku/blob/main/License
[license-image]: https://img.shields.io/npm/l/poku.svg?maxAge=2592000&color=3dc1d3

# Poku

<img align="right" width="128" height="128" alt="Logo" src=".github/assets/readme/poku.svg">

🖇️ A flexible and easy-to-use **Test Runner** for parallel or concurrent runs and high isolation level.

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![GitHub Workflow Status (with event)][ci-image]][ci-url]

---

## Why Poku?

> 🪄 Runs test files in an individual process, shows progress and exits.<br/>

- **Poku** is designed to be highly intuitive.<br />
- Works with **Node.js 6** to **Latest** (_ESM_ and _CJS_), **TypeScript** (_no need to build_) and **Coverage** tools.<br />
- Poku dive to the deepest depths to find tests in the specified directories.
- **Unleash creativity:** No constraints or predefined paths. Code in your own signature style.
- **No environment restrictions:** **Poku** is strongly tested on all Node versions from **6** onwards.
- As an example, **Poku** uses itself to test its own tests in different depths using several `process.exit` in the same node process.
- Zero configurations, except you want.
- Use both **in-code** and **CLI** usage.
- Totally **dependency-free**.

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
npx poku --include='./a,./b';
```

---

## TypeScript

To run your tests without compile, just install `tsx` and it's done:

```bash
npm install --save-dev tsx
```

---

## In progress

> 🧑🏻‍🔧 Soon releasing version `1.x`.<br />
> 🧑🏻‍🎓 Soon documenting all options and **Poku**'s usage variations.
