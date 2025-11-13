# Benchmark

> [!IMPORTANT]
>
> **Poku** doesn't intend to be "the best", but to offer a balance between high performance, isolation, compatibility, lightness and ease of use.
>
> - All results are based on the **Ubuntu** (`ubuntu-latest`) matrix from **GitHub Actions**.
> - Please take into consideration that benchmarks do not indicate the competitiveness of one over the other; rather, they serve as a metric to monitor and objectively assess the current performance state of the project.
> - To see the latest benchmarks, just check the `github-bot` comment in recent Pull Requests.

---

The testers to be compared are chosen based on the three most downloaded test runners according to the **npm** weekly statistics _(2024/06/09)_:

- [**Jest**](https://www.npmjs.com/package/jest): 23,549,369
- [**Mocha**](https://www.npmjs.com/package/mocha): 8,053,244
- [**Vitest**](https://www.npmjs.com/package/vitest): 4,840,171

---

**Poku** is continuously tested ([**CI**](https://github.com/wellwelwel/poku/blob/main/.github/workflows/ci_benchmark.yml)) to ensure the following expectations for basic usage:

## 🏃🏻‍♀️ Execution Tests

> [!NOTE]
>
> Focuses solely in execution, using a simple `assert(true)` or `assert(false)` from **Node.js** and searches for files in four levels of depth.
>
> - **success:** a suite of 5 tests that will pass.
> - **failure:** a suite of 5 tests that will fail.
> - **balanced:** a suite of 10 tests where 5 tests will fail and 5 tests will pass.

- ~**3.7x** faster than [**Jest**](https://github.com/jestjs/jest) (v30.2.0)
- ~**3.2x** faster than [**Vitest**](https://github.com/vitest-dev/vitest) (v4.0.8)
- ~**1.1x** _faster_ than [**Mocha**](https://github.com/mochajs/mocha) (v11.7.5) — _even with test file isolation_ 🚀

---

More benchmarks are coming.  
Follow the progress in [**Improve benchmarks**](https://github.com/wellwelwel/poku/issues/926) issue.

---

## Running Locally

To run the benchmark tests, follow these steps in the `./poku` directory:

```sh
# Build Poku
npm ci
npm run build

# Install benchmark dependencies
cd benchmark
npm ci

# Run and compare benchmarks
npm start
npm run compare

# Return to Poku root
cd ..
```
