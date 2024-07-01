# Contributing

If you're thinking of contributing, thank you, and _naturally_, please **be respectful** 🙋🏻‍♂️

## Issues

By opening an **Issue**, please describe the problem. If you can share a basic repro, it will be great.

---

## Pull Requests

By opening a **Pull Request**, please describe the proposed solution and what it solves.

---

## Developing

### Environment

You will need these tools installed on your system:

- [**Node.js**](https://nodejs.org/en/download/package-manager)
- [**Bun**](https://bun.sh/docs/installation) (optional)
- [**Deno**](https://docs.deno.com/runtime/manual/getting_started/installation) (optional)
- [**Docker**](https://www.docker.com/products/docker-desktop) (optional)

> **Bun**, **Deno** and **Node.js** versions are tested using **Docker** official images.

---

Fork this project, download your forked repository locally and create a new branch from `main`.
Then run `npm ci` to clean install the node modules.

> Please, do not change the _package-lock.json_.

### Fixes

Where possible, provide an error test case that the fix covers.

### Features

It's better to discuss an **API** before actually start implementing it. You can open an [**Issue on Github**](https://github.com/wellwelwel/poku/issues/new), so we can discuss the **API** design implementation ideas.

> Please ensure test cases to cover new features.

---

## Testing

### General (recommended)

#### Sequential and Parallel

```sh
npm run test                  # Test with the locally installed Node.js version
npm run test:bun              # Test with the locally installed Bun version
npm run test:deno             # Test with the locally installed Deno version
```

#### Sequential

```sh
npm run test:sequential       # Test with the locally installed Node.js version
npm run test:bun:sequential   # Test with the locally installed Bun version
npm run test:deno:sequential  # Test with the locally installed Deno version
```

> Pass custom flags using `--`, for example:
>
> ```sh
> npm run test:sequential -- --debug --watch # etc.
> ```
>
> - Same for **Bun** and **Deno**.

#### Parallel

```sh
npm run test:parallel         # Test with the locally installed Node.js version
npm run test:bun:parallel     # Test with the locally installed Bun version
npm run test:deno:parallel    # Test with the locally installed Deno version
```

> Pass custom flags using `--`, for example:
>
> ```sh
> npm run test:parallel -- --concurrency=5 --watch # etc.
> ```
>
> - Same for **Bun** and **Deno**.

### Coverage

Methods that vary according to **Node.js** version, platform or OS aren't tested against the coverage rate.

```sh
npm run test:c8:sequential
```

### Compatibility Per Platform (Docker)

> ⚠️ Testing using **Docker** can require a considerable local storage.

```sh
npm run build # Build the Project
```

```sh
npm run test:ci:node  # All Node.js versions from 6+
npm run test:ci:bun   # All Bun versions from 1+
npm run test:ci:deno  # All Deno versions from 1+
```

- You may prefer to use **GitHub Actions** for compatibility testing.

### Compatibility (All Platforms — Docker)

> ⚠️ Slow and heavy

```sh
npm run build # Build the Project
```

```sh
npm run test:ci
```

- You may prefer to use **GitHub Actions** for compatibility testing.

---

### Lint

```sh
npm run lint:check
```

> Also
>
> ```sh
> npm run lint:fix
> ```
