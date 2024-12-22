# Contributing

If you're thinking of contributing, thank you, and _naturally_, please **be respectful** 🙋🏻‍♂️

## Issues

By opening an **Issue**, please describe the problem.<br />
If you can share a basic repro, it will be great.

---

## Pull Requests

By opening a **Pull Request**, please describe the proposed solution and what it solves.<br />
The final commit message will be generated from the _PR_ title by using "**Squash and Merge**".

---

## Developing

### ⚙️ Environment

You will need these tools installed on your system:

- [**Node.js**](https://nodejs.org/en/download/package-manager)
- [**Bun**](https://bun.sh/docs/installation) (optional)
- [**Deno**](https://docs.deno.com/runtime/manual/getting_started/installation) (optional)
- [**Docker**](https://www.docker.com/products/docker-desktop) (optional)

> **Bun**, **Deno** and **Node.js** versions are tested using **Docker** official images.

---

Fork this project, download your forked repository locally and create a new branch from `main`.<br />
Then run `npm ci` to clean install the _node_modules_:

```sh
npm ci
```

> Please, do not change the _package-lock.json_ manually.

### 🔧 Fixes

Where possible, provide an error test case that the fix covers.

### ❇️ Features

It's better to discuss an **API** before actually start implementing it. You can open an [**Issue on Github**](https://github.com/wellwelwel/poku/issues/new), so we can discuss the **API** design implementation ideas.

> Please ensure test cases to cover new features.

### 📘 Documentation

Check if there is an existing section or feel free to create a new one. You can find the wesite source code at [./website](https://github.com/wellwelwel/poku/tree/main/website).

- Please, do not change legacy documentations.
- Feel free to open _PRs_ fixing typos or adding support for more languages 🤝

<blockquote>

Before commiting, consider to run:

```sh
cd website

# Installing dependencies
npm ci

# Fixing lint rules
npm run lint:fix

# Testing
npm run test
```

</blockquote>

---

## Testing

### 👩🏻‍🏭 General (recommended)

#### Sequential and Parallel

```sh
npm run test                  # Test with the locally installed Node.js version
npm run test:bun              # Test with the locally installed Bun version
npm run test:deno             # Test with the locally installed Deno version
```

> Pass custom flags using `--`, for example:
>
> ```sh
> npm run test -- --debug --watch # etc.
> ```
>
> - Same for **Bun** and **Deno**.

### ☔️ Coverage

The coverage target is **95%**.

```sh
npm run test:c8
```

> [!tip]
>
> Don't be intimidated by high coverage, methods that vary according to platform, platform versions, _OS_ and processes _(`process.exit`, `process.once`, etc.)_ aren't tested against the coverage rate 🙋🏻‍♂️
>
> See more details in [**./.nycrc**](https://github.com/wellwelwel/poku/tree/main/.nycrc).

---

### 👔 Lint

```sh
npm run lint
```

> Also
>
> ```sh
> npm run lint:fix
> ```
