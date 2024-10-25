# Benchmark

The benchmark is performed by comparing a simple success and a failure test, each in a respective file and using parallel/concurrent runs.

> [!important]
>
> **Poku** doesn't intend to be "the best", but to offer a balance between high performance, isolation, compatibility, lightness and ease of use.

---

The testers to be compared are chosen based on the three most downloaded test runners according to the **npm** weekly statistics _(2024/06/09)_:

- [**Jest**](https://www.npmjs.com/package/jest): 23,549,369
- [**Mocha**](https://www.npmjs.com/package/mocha): 8,053,244
- [**Vitest**](https://www.npmjs.com/package/vitest): 4,840,171

---

**Poku** is continuously tested ([**CI**](https://github.com/wellwelwel/poku/blob/main/.github/workflows/ci_benchmark.yml)) to ensure the following expectations for basic usage:

- ~**4x** faster than [**Jest**](https://github.com/jestjs/jest) (v29.7.0)
- ~**4x** faster than [**Vitest**](https://github.com/vitest-dev/vitest) (v2.1.3)
- ~**2x** faster than [**Mocha**](https://github.com/mochajs/mocha) (v10.7.3) — even with test file isolation

---

## Running

To run the benchmark tests, follow these steps in the `./poku` directory:

```sh
npm ci && npm run build && npm run benchmark
```

---

- [Comparing **Poku** and native test runners _(discussion)_](https://github.com/wellwelwel/poku/discussions/740).
