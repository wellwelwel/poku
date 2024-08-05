# ☔️ Coverage

<a href="https://app.codecov.io/gh/wellwelwel/poku">
  <img alt="Codecov" src="https://img.shields.io/codecov/c/github/wellwelwel/poku?logo=codecov">
</a>

## Specific cases and approaches don't generate coverage reports properly

### Different behaviors due to platform versions

- Compatibility with `c8` starts with [**Node.js** `v18`](https://github.com/bcoe/c8/blob/ff146b4dde004c62651b57c33cedd8353c94c423/package.json#L67).
- Compatibility with `monocart-coverage-reports` starts with [**Node.js** `v18`](https://github.com/cenfun/monocart-coverage-reports/issues/60).

### Different behaviors due to **Deno** and **Bun** platforms

- At the moment, there is no way to generate the coverage report for them using `c8` or `monocart-coverage-reports`.

### process-based

> E.g., `process.on`, `process.once`, `pid`, etc.

- I intend to do more research.

---

### Conclusion

The choice not to consider these topics in the coverage comes from the fact that it isn't possible, not that they are ignored. For example, even if exhaustive tests are created for **Node.js** `v8`, there is no way to generate the coverage report for these tests.

> Similarly, there are specific tests for **Bun** and **Deno** that don't generate coverage reports.

- In order to keep the minimum possible number of coverage instructions within the code, I have concentrated the cases of unfeasible coverage in individual files.

> [!NOTE]
>
> If you don't agree with any of these not covered topics, please feel free to comment. I'm totally open to discussions and opinions.
>
> - In disagreements, please see and discuss through [discussion#613](https://github.com/wellwelwel/poku/discussions/613).
