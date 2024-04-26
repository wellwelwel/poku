[node-version-url]: https://github.com/nodejs/node
[node-version-image]: https://img.shields.io/badge/Node.js->=%206.0.0-badc58
[bun-version-url]: https://github.com/oven-sh/bun
[bun-version-image]: https://img.shields.io/badge/Bun->=%200.5.3-f471b5
[deno-version-url]: https://github.com/denoland/deno
[deno-version-image]: https://img.shields.io/badge/Deno->=%201.30.0-70ffaf
[typescript-url]: https://github.com/microsoft/TypeScript
[typescript-version-image]: https://img.shields.io/badge/TypeScript->=%204.7.2-3077c6
[ci-url]: https://github.com/wellwelwel/poku/actions/workflows/ci.yml?query=branch%3Amain
[ci-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci.yml?event=push&style=flat&label=CI&branch=main
[ql-url]: https://github.com/wellwelwel/poku/actions/workflows/codeql.yml?query=branch%3Amain
[ql-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci-codeql.yml?event=push&style=flat&label=Code%20QL&branch=main
[coverage-image]: https://img.shields.io/codecov/c/github/wellwelwel/poku?label=Coverage
[coverage-url]: https://app.codecov.io/github/wellwelwel/poku
[downloads-image]: https://img.shields.io/npm/dt/poku.svg?&color=FFC312&label=Downloads
[downloads-url]: https://npmjs.org/package/poku
[license-url]: https://github.com/wellwelwel/poku/blob/main/LICENSE
[license-image]: https://img.shields.io/npm/l/poku.svg?maxAge=2592000&color=9c88ff&label=License

<div align="center">
<img width="170" height="170" alt="Logo" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/poku.svg">

# Poku

**Poku** can show you _how simple testing can be_ 🌱

[![Node.js Version][node-version-image]][node-version-url]
[![Bun Version][bun-version-image]][bun-version-url]
[![Deno Version][deno-version-image]][deno-version-url]
[![TypeScript Version][typescript-version-image]][typescript-url]<br />
[![GitHub Workflow Status (with event)][ci-image]][ci-url]
[![GitHub Workflow Status (with event)][ql-image]][ql-url]
[![Coverage][coverage-image]][coverage-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]

Enjoying **Poku**? Consider giving him a star ⭐️

</div>

---

<div align="center">

🐷 [**Documentation**](https://poku.io)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧪 [**Examples**](https://poku.io/docs/category/examples)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🔬 [**Compare the Most Popular Test Runners**](https://poku.io/docs/comparing)

</div>

---

## Reasons to Adopt a Poku →

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> No configurations<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Auto detect **ESM** and **CJS**<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Auto detect **Typescript** files<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Don't export your **server** (_just run it_) 🚀<br />

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Less verbose<br />
<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> High **isolation** level per file<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> No eval needed 🔐<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> No global state<br />
<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> **Parallel** and **Sequential** runs 🏃🏽🏃🏻<br />

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> **Poku** is [**100%** documented](https://poku.io/docs)<br />
<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Designed to be human-friendly<br />
<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Compatible with **Coverage** tools<br />
<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> [**Node.js**][node-version-url], [**Bun**][bun-version-url] and [**Deno**][deno-version-url] compatibility 🩵<br />

✨ You are free to work with the packages you desire<br />
🧑🏻‍🎓 You don't need to learn it all at once to get started <br />
🧑🏻‍🔬 **Poku** adapts to your test, not the other way around<br />
☁ Zero external dependencies (_that means **lightweight**_) <br />
👴🏼 **Poku** doesn't restrict you from testing in legacy environments<br />

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

```bash
deno add npm:poku
```

</td>
</tr>
</table>

### Test it 🔬

<table>
<tr>
<td>
<em><code>test/file.test.mjs</code></em>
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

- Change from `.mjs` to `.js` by defining `"type": "module"` in your _package.json_.
- Note that these examples use [**ESM**](https://poku.io/docs/examples/cjs-esm), but you can use [**CJS**](https://poku.io/docs/examples/cjs-esm) as well.

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

## Available Methods

### Essentials

- [**poku**](https://poku.io/docs/category/poku) (_test runner_)
- [**assert**](https://poku.io/docs/documentation/assert) (_test assertion_)
- [**startScript**](https://poku.io/docs/documentation/startScript) (_run `package.json` scripts in a background process_)
- [**startService**](https://poku.io/docs/documentation/startService) (_run files in a background process_)

### Helpers

- [**beforeEach**](https://poku.io/docs/category/beforeeach-and-aftereach) and [**afterEach**](https://poku.io/docs/category/beforeeach-and-aftereach)
- [**test**](https://poku.io/docs/documentation/helpers/test)
- [**describe**](https://poku.io/docs/documentation/helpers/describe)
- _and much more_ ✨

[**See the complete documentation**](https://poku.io/docs).

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

## Limitations

- **Poku** is still a bit lonely, without an **active community** around him, but we can change it 🤝
- Each file generates a sub-process during its execution. This can be reflected in projects with an extremely high volume of test files when run in parallel.

---

## Acknowledgements

[![Contributors](https://img.shields.io/github/contributors/wellwelwel/poku)](https://github.com/wellwelwel/poku/graphs/contributors)

[![Contributors](https://opencollective.com/poku/contributors.svg?width=890&button=false)](https://github.com/wellwelwel/poku/graphs/contributors)

---

## Author

<a href="https://github.com/wellwelwel">
<table>
  <tr>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/46850407" alt="wellwelwel" width=96><br>
        <em>@wellwelwel</em>
    </td>
  </tr>
</table>
</a>
