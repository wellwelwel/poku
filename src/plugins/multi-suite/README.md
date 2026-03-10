<div align="center">
<img height="180" alt="Poku's Logo" src="https://raw.githubusercontent.com/wellwelwel/poku/main/.github/assets/readme/poku.svg">

# Multi Suite

Enjoying **Poku**? [Give him a star to show your support](https://github.com/wellwelwel/poku) 🌟

</div>

---

🧬 **WIP** _(don't use it yet)_: **Multi Suite** is a built-in **Poku** plugin to run multiple independent test suites (each with its own configuration) as a single, unified execution.

> [!TIP]
>
> Run multiple suites as one: independent concurrency, reporters, plugins, and quiet mode per suite, with isolated executions and a single consolidated report at the end.

---

## Quickstart

```js
// poku.config.js
import { defineConfig } from 'poku';
import { multiSuite } from 'poku/plugins/multi-suite';

export default defineConfig({
  plugins: [
    multiSuite([
      { include: 'test/unit', concurrency: 8 },
      { include: 'test/integration', sequential: true },
    ]),
  ],
});
```

> No separate install needed: `multi-suite` ships with `poku`.

---

## Suite Options

Each suite accepts all [**poku config file options**](https://poku.io/docs/documentation/poku/config-files), applied independently.

---

## Examples

### Different concurrency per suite

```js
multiSuite([
  { include: 'test/unit', concurrency: 16 },
  { include: 'test/e2e', sequential: true },
]);
```

### Load env files per suite

```js
multiSuite([
  { include: 'test/unit', envFile: '.env.test' },
  { include: 'test/integration', envFile: '.env.integration' },
]);
```

### Scoped plugins per suite

```js
multiSuite([
  { include: 'test/unit' },
  { include: 'test/integration', plugins: [myPlugin()] },
]);
```

### Different reporter per suite

```js
multiSuite([
  { include: 'test/unit', reporter: 'dot' },
  { include: 'test/integration', reporter: 'compact' },
]);
```

### Kill ports before a suite

```js
multiSuite([
  { include: 'test/unit' },
  {
    include: 'test/integration',
    kill: { port: [3000, 5432] },
  },
]);
```

---

## How It Works

- Suites run **sequentially**, one after the other
- Each suite is a fully independent `poku` execution with its own configuration
- Live file results are shown as they happen, using each suite's configured reporter
- A single consolidated failure report and summary badge are shown at the end
- `Ctrl+C` stops everything immediately

---

## License

MIT © [wellwelwel](https://github.com/wellwelwel)
