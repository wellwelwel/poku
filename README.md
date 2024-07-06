<div align="center">
<img height="180" alt="Poku's Logo" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/poku.svg">

# Poku

Enjoying **Poku**? Give him a star to show your support 🌟

[![NPM Downloads](https://img.shields.io/npm/dt/poku.svg?logo=npm&logoColor=white&color=1e90ff)](https://www.npmjs.com/package/poku)
[![Coverage](https://img.shields.io/codecov/c/github/wellwelwel/poku)](https://app.codecov.io/github/wellwelwel/poku)
[![License](https://img.shields.io/npm/l/poku?maxAge=2592000&color=9c88ff)](https://github.com/wellwelwel/poku/blob/main/LICENSE)<br />
[![GitHub Workflow Status (Linux)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-linux.yml?event=push&label=&branch=main&logo=ubuntu&logoColor=white)](https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-linux.yml?query=branch%3Amain)
[![GitHub Workflow Status (OSX)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-osx.yml?event=push&label=&branch=main&logo=apple&logoColor=white)](https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-osx.yml?query=branch%3Amain)
[![GitHub Workflow Status (Windows)](https://img.shields.io/github/actions/workflow/status/wellwelwel/poku/ci_coverage-windows.yml?event=push&label=&branch=main&logo=windows&logoColor=white)](https://github.com/wellwelwel/poku/actions/workflows/ci_coverage-windows.yml?query=branch%3Amain)

---

🐷 [Website](https://poku.io/)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>📒 [Documentation](https://poku.io/docs/category/documentation)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧪 [Examples](https://poku.io/docs/category/examples)<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>🧑🏻‍🎓 [Quick Tutorials](https://poku.io/docs/tutorials)

</div>

---

## Why does Poku exist?

💡 **Poku** makes testing easy and brings the [native **JavaScript** syntax back to tests](https://poku.io/docs/philosophy), letting you to write tests intuitively — _just like in real **JavaScript** code_.

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> No configurations<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Auto detect **ESM**, **CJS**, and **TypeScript** files<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Run the same test suite for [**Node.js**][node-version-url], [**Bun**][bun-version-url], and [**Deno**][deno-version-url]<br />

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Easier and Less Verbose<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> [**Node.js**][node-version-url] familiar **API**<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Instantly re-run related tests in `watch` mode<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Run **CJS** (**CommonJS**) files directly with [**Deno**][deno-version-url]<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Easily handle **containers**, **servers**, **services**, **processes**, and **ports**<br />

<img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Safety and Reliability<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> High **isolation** level per file<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> **Performant** and **lightweight**<br />
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img width="16" height="16" alt="check" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/check.svg"> Compatible with **coverage** tools

---

## Quickstart

### Install

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

> Try the flag `--parallel` to run tests in parallel.

- That's it 🎉

---

## Available Methods

### Essentials

- [**poku**](https://poku.io/docs/category/-poku) _(test runner)_
- [**assert**](https://poku.io/docs/documentation/assert) _(test assertion)_

### Helpers

- [**test**](https://poku.io/docs/documentation/helpers/test), [**describe**](https://poku.io/docs/documentation/helpers/describe) and [**it**](https://poku.io/docs/documentation/helpers/it) _(organize, group, and isolate tests)_
- [**beforeEach**](https://poku.io/docs/category/-before-and-after-each) and [**afterEach**](https://poku.io/docs/category/-before-and-after-each) _(hooks for test setup and teardown)_
- [**docker**](https://poku.io/docs/documentation/helpers/containers) _(build, start, compose, stop, remove, and test containers)_
- [**startScript**](https://poku.io/docs/documentation/helpers/startScript) _(run **package.json** scripts in background)_
- [**startService**](https://poku.io/docs/documentation/helpers/startService) _(run files in background)_
- [**kill**](https://poku.io/docs/documentation/helpers/processes/kill) _(terminate ports, port ranges, and PIDs)_
- [**waitForPort**](https://poku.io/docs/documentation/helpers/processes/wait-for-port) _(wait for specified ports to become active)_
- [**waitForExpectedResult**](https://poku.io/docs/documentation/helpers/processes/wait-for-expected-result) _(retry until an expected result or times out)_
- [**getPIDs**](https://poku.io/docs/documentation/helpers/processes/get-pids) _(debug processes IDs using ports and port ranges)_

### Common Options

- [**watch**](https://poku.io/docs/documentation/poku/options/watch) _(watch for changes and re-run related test files)_
- [**parallel**](https://poku.io/docs/documentation/poku/options/parallel) _(run tests in parallel)_
- [**debug**](https://poku.io/docs/documentation/poku/options/debug) _(shows all logs)_

> _and much more_ 👇🏻

---

## Documentation and Examples

To see the detailed documentation, please visit the [**Documentation**](https://poku.io/docs/category/documentation) and [**Examples**](https://poku.io/docs/category/examples) sections in the [**Poku**'s website](https://poku.io).

---

### Tutorials

**Poku** offers _mini-lessons_ for different users needs in the [**Quick Tutorials**](https://poku.io/docs/tutorials) section.

---

### Common Issues

- [Avoiding conflicts in environments with multiple platforms installed](https://poku.io/docs/roadmaps/cross-platform#recommendations).
- [Properly running asynchronous tests on the same file](https://poku.io/docs/examples/promises).

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
[typescript-url]: https://github.com/microsoft/TypeScript
