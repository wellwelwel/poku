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
[ql-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci-codeql.yml?event=push&style=flat&label=Code%20QL&branch=main
[license-url]: https://github.com/wellwelwel/poku/blob/main/LICENSE
[license-image]: https://img.shields.io/npm/l/poku.svg?maxAge=2592000&color=9c88ff&label=License
[downloads-image]: https://img.shields.io/npm/dt/poku.svg?&color=FFC312&label=Downloads
[downloads-url]: https://npmjs.org/package/poku

# Poku

<img align="right" width="128" height="128" alt="Logo" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/poku.svg">

[**English**](https://poku.io/docs) | [**Português (BR)**](https://poku.io/pt-BR/docs)

**Poku** is your Test Runner Pet for [**Node.js**][node-version-url], [**Bun**][bun-version-url] and [**Deno**][deno-version-url].

[![Node.js Version][node-version-image]][node-version-url]
[![Bun Version][bun-version-image]][bun-version-url]
[![Deno Version][deno-version-image]][deno-version-url]
[![TypeScript Version][typescript-version-image]][typescript-url]
[![GitHub Workflow Status (with event)][ci-image]][ci-url]
[![GitHub Workflow Status (with event)][ql-image]][ql-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]

<!-- ![Codecov](https://img.shields.io/codecov/c/github/wellwelwel/poku?label=Coverage) -->

Enjoying **Poku**? Consider giving him a star ⭐️

---

🐷 [**Documentation**](https://poku.io) • 🧪 [**Examples**](https://poku.io/docs/category/examples) • 🔬 [**Compare the Most Popular Test Runners**](https://poku.io/docs/comparing)

---

## Why Poku?

By creating **Poku**, my aim is to show that testing can be simpler 🌱

- No configurations
- Supports **ESM** and **CJS**
- High **isolation** level per file
- **Poku** is [**100%** documented](https://poku.io/docs)
- Zero external dependencies
- **Parallel** and **Sequential** runs
- Designed to be highly intuitive
- Compatible with **Coverage** tools
- [**Node.js**][node-version-url], [**Bun**][bun-version-url] and [**Deno**][deno-version-url] compatibility
- You don't need to learn it all at once to get started 🧑🏻‍🎓

> _Poku adapts to your test, not the other way around._

---

## Quickstart

### Install 📦

[![Install Size](https://packagephobia.com/badge?p=poku)](https://packagephobia.com/result?p=poku)

<table>
<tr>
<td><img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/node-js.svg" width="24" /></td>
<td><img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/node-js.svg" width="24" /> <img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/plus.svg" width="24" /> <img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/typescript.svg" width="24" /></td>
<td><img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/bun.svg" width="24" /></td>
<td><img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/deno.svg" width="24" /></td>
</tr>
<tr>
<td width="400">

```bash
npm i -D poku
```

</td>
<td width="400">

```bash
npm i -D poku tsx
```

</td>
<td width="400">

```bash
bun add -d poku
```

</td>
<td width="400">

```ts
import { poku } from 'npm:poku';
```

</td>
</tr>
</table>

### Test it 🔬

<table>
<tr>
<td>
<em><code>test/file.test.js</code></em>
</td>
</tr>
<tr>
<td width="1200">

```ts
import { assert } from 'poku';

assert(true, 'Poku will describe it 🐷');
```

</td>
</tr>
</table>

### Run it 🚀

<table>
<tr>
<td><img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/node-js.svg" width="24" /></td>
<td><img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/bun.svg" width="24" /></td>
<td><img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/deno.svg" width="24" /></td>
</tr>
<tr>
<td width="400">

```bash
npx poku
```

</td>
<td width="400">

```bash
bun poku
```

</td>
<td width="400">

```bash
deno run npm:poku
```

</td>
</tr>
</table>

### That's it 🎉

- [**See the complete `assert`'s documentation**](https://poku.io/docs/documentation/assert).
- [**See the complete `poku`'s documentation**](https://poku.io/docs/category/poku).

---

## Overview

### `poku`

| Sequential                                                                                                | Concurrent                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/sequential.png" /> | <img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/parallel.png" /> |

> [**See the complete `poku`'s documentation**](https://poku.io/docs/category/poku).

---

### `assert`

- 💚 Use it exactly as it's for **Node.js**
- 🐷 **Node.js**, **Bun** and **Deno** compatibility

| Using `poku`                                                                                               | Using `node`                                                                                               |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/assert-poku.png" /> | <img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/assert-node.png" /> |

> [**See the complete `assert`'s documentation**](https://poku.io/docs/documentation/assert).

---

## Documentation and Examples

To see the detailed documentation, please visit the [**Documentation**](https://poku.io/docs/category/documentation) and [**Examples**](https://poku.io/docs/category/examples) sections in the [**Poku**'s website](https://poku.io).

---

## Community

I'm continuously working to improve **Poku**. If you've got something interesting to share, feel free to submit a [**Pull Request**](https://github.com/wellwelwel/poku/compare). If you notice something wrong, I'd appreciate if you'd open an [**Issue**](https://github.com/wellwelwel/poku/issues/new).

---

## Contributing

Please check the [**CONTRIBUTING.md**](./CONTRIBUTING.md) for instructions 🚀

---

## Philosophy

Please check the [**Philosophy**](https://poku.io/docs/philosophy) section from Documentation.

---

## License

Poku is under the [**MIT License**](./LICENSE).

---

## Security Policy

Please check the [**SECURITY.md**](./SECURITY.md) and the section [**Is Poku Safe?**](https://poku.io/docs/security) from Documentation.

---

## Acknowledgements

[![Contributors](https://img.shields.io/github/contributors/wellwelwel/poku)](https://github.com/wellwelwel/poku/graphs/contributors)

[![Contributors](https://contrib.rocks/image?repo=wellwelwel/poku)](https://github.com/wellwelwel/poku/graphs/contributors)

---

## Author

| [![wellwelwel](https://avatars.githubusercontent.com/u/46850407?v=4?v=3&s=115)<br><sub>@wellwelwel</sub>](https://github.com/wellwelwel) |
| :--------------------------------------------------------------------------------------------------------------------------------------: |
