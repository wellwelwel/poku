<div align="center">
<img height="180" alt="Poku's Logo" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/poku.svg">

# Poku

Enjoying **Poku**? Give him a star to show your support 🌟

[![NPM Downloads](https://img.shields.io/npm/v/poku.svg?label=&color=70a1ff&logo=npm&logoColor=white)](https://www.npmjs.com/package/poku)
[![NPM Downloads](https://img.shields.io/npm/dt/poku.svg?label=&logo=npm&logoColor=white&color=45aaf2)](https://www.npmjs.com/package/poku)
[![Coverage](https://img.shields.io/codecov/c/github/wellwelwel/poku?label=&logo=codecov&logoColor=white&color=98cc00)](https://app.codecov.io/github/wellwelwel/poku)<br />
[![GitHub Workflow Status (Linux)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-linux.yml?event=push&label=&branch=main&logo=ubuntu&logoColor=8897a9&color=dfe4ea)](https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-linux.yml?query=branch%3Amain)
[![GitHub Workflow Status (OSX)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-osx.yml?event=push&label=&branch=main&logo=apple&logoColor=8897a9&color=dfe4ea)](https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-osx.yml?query=branch%3Amain)
[![GitHub Workflow Status (Windows)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-windows.yml?event=push&label=&branch=main&logo=data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5XaW5kb3dzIDExPC90aXRsZT48cGF0aCBmaWxsPSIjODg5N2E5IiBkPSJNMTI2IDEuNjM3bC02NyA5LjgzNHY0OS44MzFsNjctLjUzNHpNMS42NDcgNjYuNzA5bC4wMDMgNDIuNDA0IDUwLjc5MSA2Ljk4My0uMDQtNDkuMDU3em01Ni44Mi42OGwuMDk0IDQ5LjQ2NSA2Ny4zNzYgOS41MDkuMDE2LTU4Ljg2M3pNMS42MSAxOS4yOTdsLjA0NyA0Mi4zODMgNTAuNzkxLS4yODktLjAyMy00OS4wMTZ6Ij48L3BhdGg+PC9zdmc+&color=dfe4ea)](https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-windows.yml?query=branch%3Amain)

---

🐷 [Website](https://poku.io/)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>📘 [Documentation](https://poku.io/docs/category/documentation)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧪 [Examples](https://poku.io/docs/category/examples)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧑🏻‍🎓 [Tutorials](https://poku.io/docs/category/quick-tutorials)

</div>

---

## Why does Poku exist?

💡 **Poku** is a cross-platform test runner that brings the [**JavaScript** essence back to testing](https://poku.io/docs/philosophy#javascript-essence-for-tests-).

</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> High **isolation** level per file<br />
</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> **Performant** and **lightweight**<br />
<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Run **CommonJS** files directly with [**Deno**][deno-version-url]<br />
<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Auto detect **ESM**, **CJS**, and **TypeScript** files<br />
<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Run the same test suite for [**Node.js**][node-version-url], [**Bun**][bun-version-url], and [**Deno**][deno-version-url]<br />
<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Easily handle **servers**, **processes**, **ports**, and **containers**<br />

---

## Quickstart

### <img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Install

```bash
# Node.js
npm i -D poku

# TypeScript (Node.js)
npm i -D poku tsx

# Bun
bun add -d poku

# Deno
deno add npm:poku
```

---

### <img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Test

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

---

### <img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Run

<table>
<tr>
<td><blockquote><i>Node.js (and TypeScript)</i></blockquote></td>
<td><blockquote><i>Bun</i></blockquote></td>
<td><blockquote><i>Deno</i></blockquote></td>
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

---

## Features

### <img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Essentials

<table>
  <tr>
    <td width="280"><a href="https://poku.io/docs/category/-poku">poku</a></td>
    <td width="770">🧪 Test runner.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/assert">assert</a></td>
    <td>🔍 Test assertion <i>(<strong>Node.js</strong> familiar <strong>API</strong>)</i>.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/assert">strict</a></td>
    <td>🔬 Strict test assertion <i>(<strong>Node.js</strong> familiar <strong>API</strong>)</i>.</td>
  </tr>
</table>

### <img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Helpers

<table>
  <tr>
    <td width="250"><a href="https://poku.io/docs/documentation/helpers/test">test</a> • <a href="https://poku.io/docs/documentation/helpers/describe">describe</a> • <a href="https://poku.io/docs/documentation/helpers/it">it</a></td>
    <td width="800">🤹🏻‍♀️ Organize, group, and isolate tests.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/env">envFile</a></td>
    <td>⚙️ Process an environment file <i>(out-of-box)</i>.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/category/-before-and-after-each">beforeEach</a> • <a href="https://poku.io/docs/category/-before-and-after-each">afterEach</a></td>
    <td>🃏 Hooks for test setup and teardown.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/startScript">startScript</a></td>
    <td>🌐 Run package.json scripts in background.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/startService">startService</a></td>
    <td>🌐 Run files in background.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/containers">docker</a></td>
    <td>🐳 Build, start, compose, stop, remove, and test containers.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/processes/kill">kill</a></td>
    <td>🔌 Terminate ports, port ranges, and PIDs.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/processes/wait-for-port">waitForPort</a></td>
    <td>😴 Wait for specified ports to become active.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/processes/wait-for-expected-result">waitForExpectedResult</a></td>
    <td>🥱 Retry until an expected result or times out.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/skip">skip</a></td>
    <td>⏭️ Skip tests when necessary.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/processes/get-pids">getPIDs</a></td>
    <td>🕵🏻 Debug processes IDs using ports and port ranges.</td>
  </tr>
</table>

### <img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Common Options

<table>
  <tr>
    <td width="280"><a href="https://poku.io/docs/documentation/poku/options/watch">watch</a></td>
    <td width="770">🍿 Watch for changes and re-run related test files.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/poku/options/parallel">parallel</a></td>
    <td>🏃🏻‍♀️ Run tests in parallel.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/poku/options/debug">debug</a></td>
    <td>🕵🏻 Shows all logs.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/poku/config-files">config</a></td>
    <td>⚙️ Customize your Poku options in a config file.</td>
  </tr>
</table>

> _and much more_ 👇🏻

---

## Documentation and Examples

To see the detailed documentation, please visit the [**Documentation**](https://poku.io/docs/category/documentation) and [**Examples**](https://poku.io/docs/category/examples) sections in the [**Poku**'s website](https://poku.io).

---

### Tutorials

**Poku** offers _mini-lessons_ for different users needs in the [**Quick Tutorials**](https://poku.io/docs/category/quick-tutorials) section.

---

### Common Issues

- [Avoiding conflicts in environments with multiple platforms installed](https://poku.io/docs/tutorials/cross-platform#recommendations).
- [Properly running asynchronous tests on the same file](https://poku.io/docs/examples/promises).
- [Migrating from version **1.x** to version **2.x**](https://github.com/wellwelwel/poku/issues/533).

---

## Quick Comparisons

### Performance

**Poku** is [continuously tested](https://github.com/wellwelwel/poku/blob/main/.github/workflows/ci_benchmark.yml) to ensure the following expectations for basic usage:

- \>=**4x** faster than [**Jest**](https://github.com/jestjs/jest) (v29.7.0)
- \>=**3x** faster than [**Vitest**](https://github.com/vitest-dev/vitest) (v1.6.0)
- \>=**1x** faster than [**Mocha**](https://github.com/mochajs/mocha) (v10.4.0) + [**Chai**](https://github.com/chaijs/chai) (v5.1.1)

> You can see how the tests are run and compared in the [benchmark](https://github.com/wellwelwel/poku/tree/main/benchmark) directory.

---

### Installation Size

[![Install Size](https://packagephobia.com/badge?p=poku)](https://pkg-size.dev/poku)

- [~**300x** lighter than **Vitest**](https://pkg-size.dev/vitest)
- [~**170x** lighter than **Jest**](https://pkg-size.dev/jest)
- [~**40x** lighter than **Mocha** + **Chai**](https://pkg-size.dev/mocha%20chai)

> **Poku** size is highly significant in development to ensure cost-saving **CI** that require servers that charge for storage and usage.

---

## Security Policy

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_codeql.yml?event=push&label=&branch=main&logo=github&logoColor=white&color=f368e0)](https://github.com/wellwelwel/poku/actions/workflows/ci_codeql.yml?query=branch%3Amain)

Please check the [**SECURITY.md**](https://github.com/wellwelwel/poku/blob/main/SECURITY.md).

---

## Contributing

See the [**Contributing Guide**](https://github.com/wellwelwel/poku/blob/main/CONTRIBUTING.md) and please follow our [**Code of Conduct**](https://github.com/wellwelwel/poku/blob/main/CODE_OF_CONDUCT.md) 🚀

---

## Acknowledgements

[![Contributors](https://img.shields.io/github/contributors/wellwelwel/poku?color=9c88ff)](https://github.com/wellwelwel/poku/graphs/contributors)

[![Contributors](https://opencollective.com/poku/contributors.svg?width=890&button=false)](https://opencollective.com/poku/contributors.svg?button=false)

---

## License

**Poku** is under the [**MIT License**](https://github.com/wellwelwel/poku/blob/main/LICENSE).<br />
Copyright © 2024-present [Weslley Araújo](https://github.com/wellwelwel) and **Poku** [contributors](https://github.com/wellwelwel/poku/graphs/contributors).

[node-version-url]: https://github.com/nodejs/node
[bun-version-url]: https://github.com/oven-sh/bun
[deno-version-url]: https://github.com/denoland/deno
