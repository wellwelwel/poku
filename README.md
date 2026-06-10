<div align="center">
<img height="180" alt="Poku's Logo" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/poku.svg">

# Poku

Enjoying **Poku**? Give him a star to show your support 🌟

[![Version](https://img.shields.io/npm/v/poku?label=&color=70a1ff&logo=npm&logoColor=white)]()
[![Downloads](https://img.shields.io/npm/dm/poku?label=&logo=npm&logoColor=white&color=45aaf2)]()
[![CI](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-linux.yml?event=push&label=&branch=main&logo=testcafe&logoColor=white&color=9c88ff)]()
[![Coverage](https://img.shields.io/codecov/c/github/wellwelwel/poku?label=&logo=codecov&logoColor=white&color=98cc00)]()

---

🐷 [**Website**](https://poku.io/)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>📘 [**Documentation**](https://poku.io/docs)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧪 [**Examples**](https://poku.io/docs/category/examples)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧑🏻‍🎓 [**Tutorials**](https://poku.io/docs/category/quick-tutorials)

</div>

---

## Why does Poku exist?

💡 **Poku** is a cross-platform test runner that brings the [**JavaScript** essence back to testing](https://poku.io/docs/philosophy#javascript-essence-for-tests-).

![v][] High **isolation** level per file<br />
![v][] **Performant** and **lightweight**<br />
![v][] Support for **ESM**, **CJS**, and **TypeScript**<br />
![v][] Plugin ecosystem for **custom** and **official** plugins<br />
![v][] Run the **same test suite** for **Node.js**, **Bun**, and **Deno**<br />
![v][] Easily handle **servers**, **processes**, **ports**, and **containers** ✨

---

## Quickstart

### ![v][] Install

#### 🐢 Node.js

```sh
npm i -D poku
```

#### 📘 TypeScript (Node.js)

```sh
npm i -D poku tsx
```

#### 🍞 Bun

```sh
bun add -d poku
```

#### 🦕 Deno (optional)

```sh
deno add npm:poku
```

---

### ![v][] Test

```ts
import { assert } from 'poku';

assert(true, 'Poku will describe it 🐷');
```

---

### ![v][] Run

#### Node.js (and TypeScript)

```sh
npx poku
```

#### Bun

```sh
bun --bun poku
```

#### Deno

```sh
deno run npm:poku
```

---

## Features

### ![v][] Essentials

<table>
  <tr>
    <td width="280"><a href="https://poku.io/docs/category/-poku">poku</a></td>
    <td width="770">🧪 Test runner</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/assert">assert • strict</a></td>
    <td>🔬 Test assertion <i>(<strong>Node.js</strong> familiar <strong>API</strong>)</i></td>
  </tr>
</table>

### ![v][] Common Helpers and Options

<table>
  <tr>
    <td width="250"><a href="https://poku.io/docs/documentation/helpers/test">test</a> • <a href="https://poku.io/docs/documentation/helpers/describe">describe</a> • <a href="https://poku.io/docs/documentation/helpers/it">it</a></td>
    <td width="800">🤹🏻‍♀️ Organize, group, and isolate tests</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/env">envFile</a></td>
    <td>⚙️ Process an environment file</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/category/-before-and-after-each">beforeEach • afterEach</a></td>
    <td>🃏 Hooks for test setup and teardown</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/startScript">startScript</a> • <a href="https://poku.io/docs/documentation/helpers/startService">startService</a></td>
    <td>🌐 Run scripts and files in background</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/plugins/official/containers">docker</a></td>
    <td>🐳 Build, start, compose, stop, and remove containers</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/processes/kill">kill</a></td>
    <td>🔌 Terminate ports, port ranges, and PIDs</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/processes/wait-for-port">waitForPort</a></td>
    <td>😴 Wait for specified ports to become active</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/processes/wait-for-expected-result">waitForExpectedResult</a></td>
    <td>🥱 Retry until an expected result or times out</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/skip">skip</a></td>
    <td>⏭️ Skip tests when necessary</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/helpers/only">only</a></td>
    <td>🌌 Debug tests by enabling selective runs</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/plugins/official/coverage">coverage</a></td>
    <td>☔️ Enable coverage collection</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/poku/config-files">config</a></td>
    <td>⚙️ Customize your <b>Poku</b></td>
  </tr>
  <tr>
    <td width="280"><a href="https://poku.io/docs/documentation/poku/options/watch">watch</a></td>
    <td width="770">🍿 Watch for changes and re-run related test files</td>
  </tr>
  <tr>
    <td><a href="https://poku.io/docs/documentation/poku/options/debug">debug</a></td>
    <td>🕵🏻 Shows all logs</td>
  </tr>
</table>

- _and much more_ 🔥

---

### FAQ

- [Properly running asynchronous tests on the same file](https://poku.io/docs/examples/promises)
- Migrating:
  - [**3.x.x** → **4.x.x**](https://github.com/wellwelwel/poku/issues/1006)

---

## Quick Comparisons

### Performance

- ~**5.3x** faster than [**Jest**](https://github.com/jestjs/jest) (v30.4.2)
- ~**4.5x** faster than [**Vitest**](https://github.com/vitest-dev/vitest) (v4.1.6)

> - You can see how the tests are run and compared in the [**benchmark**](https://github.com/wellwelwel/poku/tree/main/benchmark) directory.

---

### Installation Size

[![Install Size](https://packagephobia.com/badge?p=poku)](https://pkg-size.dev/poku)

- [~**145x** lighter than **Jest**](https://pkg-size.dev/jest@30.4.2)
- [~**124x** lighter than **Vitest**](https://pkg-size.dev/vitest@4.1.6)
- [~**2.8x** lighter than **uvu**](https://pkg-size.dev/uvu@0.5.6)

> **Poku** size ensures _cost-saving_ **CI** for services that charge for storage and usage.

---

## Security Policy

Please check the [**SECURITY.md**](https://github.com/wellwelwel/poku/blob/main/SECURITY.md).

---

## Contributing

See the [**Contributing Guide**](https://github.com/wellwelwel/poku/blob/main/CONTRIBUTING.md) and please follow our [**Code of Conduct**](https://github.com/wellwelwel/poku/blob/main/CODE_OF_CONDUCT.md) 🚀

---

## Acknowledgements

### Contributors

My thanks to everyone who has dedicated their time and effort to improving **Poku**.

[![Contributors](https://opencollective.com/poku/contributors.svg?width=890&button=false)]()

### Sponsors

Really thanks to everyone who has supported and keeps supporting my work.

[![Sponsors](https://wellwelwel.github.io/wellwelwel/sponsors.svg?v=1)](https://github.com/sponsors/wellwelwel)

---

## License

**Poku** is under the [**MIT License**](https://github.com/wellwelwel/poku/blob/main/LICENSE).<br />
Copyright © 2024-present [**Weslley Araújo**](https://github.com/wellwelwel) and [**contributors**](https://github.com/wellwelwel/poku/graphs/contributors).

[v]: https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg
