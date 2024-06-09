# Benchmark

The benchmark is performed by comparing a simple success and a failure test, each in a respective file and using parallel/concurrent runs.

> [!important]
>
> **Poku** doesn't intend to be "the best", but to offer a balance between high performance, isolation, compatibility, lightness and ease of use.

---

The testers to be compared are chosen based on the three most downloaded test runners according to the **npm** weekly statistics _(2024/06/09)_:

- [**Jest**](https://www.npmjs.com/package/jest): 23,549,369
- [**Mocha**](https://www.npmjs.com/package/mocha) + [**Chai**](https://www.npmjs.com/package/chai): 8,053,244 + 11,294,912
- [**Vitest**](https://www.npmjs.com/package/vitest): 4,840,171

---

**Poku** is continuously tested ([**CI**](https://github.com/wellwelwel/poku/blob/main/.github/workflows/ci_benchmark.yml)) to ensure the following expectations:

- [x] **~4x** faster than [**Jest**](https://github.com/jestjs/jest) (v29.7.0)
- [x] **~3x** faster than [**Vitest**](https://github.com/vitest-dev/vitest) (v1.6.0)
- [x] **~1x** faster than [**Mocha**](https://github.com/mochajs/mocha) (v10.4.0) + [**Chai**](https://github.com/chaijs/chai) (v5.1.1)

---

## Running

To run the benchmark tests, follow these steps:

```sh
npm ci
npm run build
npm run benchmark
```
