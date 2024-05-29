[node-version-url]: https://github.com/nodejs/node
[bun-version-url]: https://github.com/oven-sh/bun
[deno-version-url]: https://github.com/denoland/deno
[typescript-url]: https://github.com/microsoft/TypeScript
[ci-linux-url]: https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-linux.yml?query=branch%3Amain
[ci-linux-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-linux.yml?event=push&style=flat-square&label=&branch=main&logo=ubuntu&logoColor=white
[ci-osx-url]: https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-osx.yml?query=branch%3Amain
[ci-osx-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-osx.yml?event=push&style=flat-square&label=&branch=main&logo=apple&logoColor=white
[ci-windows-url]: https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-windows.yml?query=branch%3Amain
[ci-windows-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-windows.yml?event=push&style=flat-square&label=&branch=main&logo=windows&logoColor=white
[ql-url]: https://github.com/wellwelwel/poku/actions/workflows/ci_codeql.yml?query=branch%3Amain
[ql-image]: https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_codeql.yml?event=push&style=flat-square&label=&branch=main&logo=github&logoColor=white
[coverage-image]: https://img.shields.io/codecov/c/github/wellwelwel/poku?style=flat-square&label=Coverage
[coverage-url]: https://app.codecov.io/github/wellwelwel/poku
[downloads-image]: https://img.shields.io/npm/dt/poku.svg?style=flat-square&label=Downloads&logo=npm&logoColor=white&color=1e90ff
[downloads-url]: https://www.npmjs.com/package/poku
[license-url]: https://github.com/wellwelwel/poku/blob/main/LICENSE
[license-image]: https://img.shields.io/npm/l/poku.svg?maxAge=2592000&color=9c88ff&style=flat-square&label=License

<div align="center">
<img width="170" height="170" alt="Logo" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/poku.svg">

# Poku

**Poku** can show you _how simple testing can be_ 🌱

[![NPM Downloads][downloads-image]][downloads-url]
[![Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]<br />
[![GitHub Workflow Status (with event)][ci-linux-image]][ci-linux-url]
[![GitHub Workflow Status (with event)][ci-osx-image]][ci-osx-url]
[![GitHub Workflow Status (with event)][ci-windows-image]][ci-windows-url]

Enjoying **Poku**? Give him a star to show your support ⭐️

</div>

---

## Why does Poku exist?

> **Poku** takes on the testers' difficulties by itself and lets you focus on the tests.

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> No configurations<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Auto detect **ESM** and **CJS**<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Auto detect **Typescript** files<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Don't export your **server** (_just run it_) 🚀<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Run the same test suite for [**Node.js**][node-version-url], [**Bun**][bun-version-url] and [**Deno**][deno-version-url].<br />

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Safety and Reliability<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> High **isolation** level per file<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Compatible with **Coverage** tools<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Run **CJS** (**CommonJS**) files directly with [**Deno**][deno-version-url]<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Easily handle **services**, **servers**, **processes** and **ports**<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> **Poku** doesn't use `eval` nor global state 🔐<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> _In other words, you can run your tests directly, without relying on **Poku**_<br />

---

## Quickstart

### Install

[![Install Size](https://packagephobia.com/badge?p=poku)](https://packagephobia.com/result?p=poku)

<table>
<tr>
<td><blockquote><b>Node.js</b</blockquote></td>
<td><blockquote><b>TypeScript + Node.js</b</blockquote></td>
<td><blockquote><b>Bun</b</blockquote></td>
<td><blockquote><b>Deno</b</blockquote></td>
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

### Test

<table>
<tr>
<td>
<blockquote>test/file.test.mjs</blockquote>
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

### Run

<table>
<tr>
<td><blockquote><b>Node.js (and TypeScript)</b</blockquote></td>
<td><blockquote><b>Bun</b</blockquote></td>
<td><blockquote><b>Deno</b</blockquote></td>
</tr>
<tr>
<td width="400">

```bash
npx poku
```

</td>
<td width="400">

```bash
bunx poku
```

</td>
<td width="400">

```bash
deno run npm:poku
```

</td>
</tr>
</table>

That's it 🎉

---

🐷 [**Documentation**](https://poku.io)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧪 [**Examples**](https://poku.io/docs/category/examples)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🔬 [**Compare the Most Popular Test Runners**](https://poku.io/docs/comparing)

---

## Available Methods

### Essentials

- **Test**
  - [**poku**](https://poku.io/docs/category/poku) (_test runner_)
  - [**assert**](https://poku.io/docs/documentation/assert) (_test assertion_)
- **Background Services**
  - [**startScript**](https://poku.io/docs/documentation/startScript) (_run `package.json` scripts in a background process_)
  - [**startService**](https://poku.io/docs/documentation/startService) (_run files in a background process_)
- **Processes**
  - [**kill**](https://poku.io/docs/documentation/processes/kill) (_terminate Ports, Port Ranges and PIDs_)
  - [**getPIDs**](https://poku.io/docs/documentation/processes/get-pids) (_get all processes IDs using ports and port ranges_)

### Helpers

- [**beforeEach**](https://poku.io/docs/category/beforeeach-and-aftereach) and [**afterEach**](https://poku.io/docs/category/beforeeach-and-aftereach)
- [**test**](https://poku.io/docs/documentation/helpers/test)
- [**describe**](https://poku.io/docs/documentation/helpers/describe)
- _and much more_ ✨

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

[![GitHub Workflow Status (with event)][ql-image]][ql-url]

Please check the [**SECURITY.md**](./SECURITY.md) and the section [**Is Poku Safe?**](https://poku.io/docs/security) from Documentation.

---

## Limitations

- **Poku** community is gradually building up 🤝
- Although it has no external dependencies, **Poku** is not _all-in-one_, so it doesn't have features such as _mocks_ and _spies_, where you can use your favorite packages or native solutions.

---

## Overview

| Sequential                                                                                                | Concurrent                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/sequential.png" /> | <img src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/parallel.png" /> |

---

## Acknowledgements

[![Contributors](https://img.shields.io/github/contributors/wellwelwel/poku?style=flat-square)](https://github.com/wellwelwel/poku/graphs/contributors)

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
