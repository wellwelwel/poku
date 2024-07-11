<div align="center">
<img height="180" alt="Poku's Logo" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/poku.svg">

# Poku

Enjoying **Poku**? Give him a star to show your support 🌟

[![NPM Downloads](https://img.shields.io/npm/dt/poku.svg?logo=npm&logoColor=white&color=1e90ff)](https://www.npmjs.com/package/poku)
[![Coverage](https://img.shields.io/codecov/c/github/wellwelwel/poku)](https://app.codecov.io/github/wellwelwel/poku)
[![License](https://img.shields.io/npm/l/poku?maxAge=2592000&color=9c88ff)](https://github.com/wellwelwel/poku/blob/main/LICENSE)<br />
[![GitHub Workflow Status (Linux)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-linux.yml?event=push&label=&branch=main&logo=ubuntu&logoColor=white)](https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-linux.yml?query=branch%3Amain)
[![GitHub Workflow Status (OSX)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-osx.yml?event=push&label=&branch=main&logo=apple&logoColor=white)](https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-osx.yml?query=branch%3Amain)
[![GitHub Workflow Status (Windows)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-windows.yml?event=push&label=&branch=main&logo=iterm2&logoColor=white)](https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-windows.yml?query=branch%3Amain)

---

🐷 [Website](https://poku.io/)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>📘 [Documentation](https://poku.io/docs/category/documentation)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧪 [Examples](https://poku.io/docs/category/examples)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧑🏻‍🎓 [Quick Tutorials](https://poku.io/docs/category/quick-tutorials)

</div>

---

## Why does Poku exist?

💡 **Poku** makes testing easy and brings the [native **JavaScript** syntax back to tests](https://poku.io/docs/philosophy#javascript-essence-for-tests-), letting you to write tests intuitively.

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> _No configurations_<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Auto detect **ESM**, **CJS**, and **TypeScript** files<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Run the same test suite for [**Node.js**][node-version-url], [**Bun**][bun-version-url], and [**Deno**][deno-version-url]<br />

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> _Easier and Less Verbose_<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Run **CJS** (**CommonJS**) files directly with [**Deno**][deno-version-url]<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Easily handle **containers**, **servers**, **processes**, and **ports**<br />

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> _Safety and Reliability_<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> High **isolation** level per file<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> **Performant** and **lightweight**<br />

---

## Quickstart

### <img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Install

<table>
<tr>
<td><blockquote><i>Node.js</i></blockquote></td>
<td><blockquote><i>TypeScript (Node.js)</i></blockquote></td>
<td><blockquote><i>Bun</i></blockquote></td>
<td><blockquote><i>Deno</i></blockquote></td>
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

### Essentials

<table>
  <tr>
    <th width="250">Name</th>
    <th width="800">Description</th>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/category/-poku">poku</a></td>
    <td>🧪 Test runner.</td>
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

### Helpers

<table>
  <tr>
    <th width="250">Name</th>
    <th width="800">Description</th>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/test">test</a> • <a href="https://poku.io/docs/documentation/helpers/describe">describe</a> • <a href="https://poku.io/docs/documentation/helpers/it">it</a></td>
    <td>🤹🏻‍♀️ Organize, group, and isolate tests.</td>
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

### Common Options

<table>
  <tr>
    <th width="250">Name</th>
    <th width="800">Description</th>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/poku/options/watch">watch</a></td>
    <td>🍿 Watch for changes and re-run related test files.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/poku/options/parallel">parallel</a></td>
    <td>🏃🏻‍♀️ Run tests in parallel.</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/poku/options/debug">debug</a></td>
    <td>🕵🏻 Shows all logs.</td>
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
- [Migrating to version **2.x**](https://github.com/wellwelwel/poku/issues/533).

---

## Contributing

See the [**Contributing Guide**](https://github.com/wellwelwel/poku/blob/main/CONTRIBUTING.md) and please follow our [**Code of Conduct**](https://github.com/wellwelwel/poku/blob/main/CODE_OF_CONDUCT.md) 🚀

---

## Security Policy

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_codeql.yml?event=push&label=&branch=main&logo=github&logoColor=white)](https://github.com/wellwelwel/poku/actions/workflows/ci_codeql.yml?query=branch%3Amain)

Please check the [**SECURITY.md**](https://github.com/wellwelwel/poku/blob/main/SECURITY.md).

---

## Quick Comparisons

### Performance

**Poku** is [continuously tested](https://github.com/wellwelwel/poku/blob/main/.github/workflows/ci_benchmark.yml) to ensure the following expectations for basic usage:

- **~4x** faster than [**Jest**](https://github.com/jestjs/jest) (v29.7.0)
- **~3x** faster than [**Vitest**](https://github.com/vitest-dev/vitest) (v1.6.0)
- **~1x** faster than [**Mocha**](https://github.com/mochajs/mocha) (v10.4.0) + [**Chai**](https://github.com/chaijs/chai) (v5.1.1)

> You can see how the tests are run and compared in the [benchmark](https://github.com/wellwelwel/poku/tree/main/benchmark) directory.

---

### Installation Size

[![Install Size](https://packagephobia.com/badge?p=poku)](https://pkg-size.dev/poku)

- [~**300x** lighter than **Vitest**](https://pkg-size.dev/vitest)
- [~**170x** lighter than **Jest**](https://pkg-size.dev/jest)
- [~**40x** lighter than **Mocha** + **Chai**](https://pkg-size.dev/mocha%20chai)

> **Poku** size is highly significant in development to ensure cost-saving **CI** that require servers that charge for storage and usage.

---

### Limitations

- Although it has no external dependencies, **Poku** is not _all-in-one_, so it doesn't have integrated features such as _mocks_, _spies_, _coverage reports_, etc., where you can use your favorite packages or native solutions.
  - See a [mock example](https://poku.io/docs/category/mock).
- **Poku** doesn't render components (such as **Angular**, **React**, etc.).
  - See an [_end-to-end_ test example](https://poku.io/docs/examples/browser/react).
- Our community is gradually building up.

---

## Acknowledgements

[![Contributors](https://img.shields.io/github/contributors/wellwelwel/poku)](https://github.com/wellwelwel/poku/graphs/contributors)

[![Contributors](https://opencollective.com/poku/contributors.svg?width=890&button=false)](https://github.com/wellwelwel/poku/graphs/contributors)

---

## License

**Poku** is under the [**MIT License**](https://github.com/wellwelwel/poku/blob/main/LICENSE).

[node-version-url]: https://github.com/nodejs/node
[bun-version-url]: https://github.com/oven-sh/bun
[deno-version-url]: https://github.com/denoland/deno
