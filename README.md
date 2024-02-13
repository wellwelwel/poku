[npm-image]: https://img.shields.io/npm/v/poku.svg
[npm-url]: https://npmjs.org/package/poku
[downloads-image]: https://img.shields.io/npm/dt/poku.svg
[downloads-url]: https://npmjs.org/package/poku
[ci-url]: https://github.com/wellwelwel/poku/actions/workflows/ci.yml?query=branch%3Amain
[ci-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci.yml?event=push&style=flat&label=ci&branch=main
[license-url]: https://github.com/wellwelwel/poku/blob/main/License
[license-image]: https://img.shields.io/npm/l/poku.svg?maxAge=2592000

# Poku

<img align="right" width="128" height="128" alt="Logo" src=".github/assets/readme/poku.svg">

🖇️ A flexible and easy-to-use **Test Runner** for parallel or concurrent runs and high isolation level.

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]

<!-- [![NPM Downloads][downloads-image]][downloads-url] -->
<!-- [![GitHub Workflow Status (with event)][ci-image]][ci-url] -->

---

## Why

> Runs test files in an individual process, shows progress and exits.

- **Poku** is designed to be highly intuitive.<br />
- Works with **ESM**, **CJS**, **Node.js**, **TypeScript** (_no-build_) and **Coverage** tools.<br />
- Compatibility from **Node.js 6** to the **Latest** release.<br />
- Totally dependency-free.

---

## In progress

🧑🏻‍🔧 Soon releasing version `1.x`.

---

## Install

```bash
npm install --save-dev poku
```

---

## Usage

```ts
import { poku } from 'poku';

await poku(['./test/unit/']);

// 🧑🏻‍🔧 Soon documenting all options and Poku's usage variations.
```

---

## TypeScript

To run your tests without compile, just install `tsx` and it's done:

```bash
npm install --save-dev tsx
```
