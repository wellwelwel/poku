# Contributing

If you're thinking of contributing, thank you 🎉

---

## Environment

You will need these tools installed on your system:

- [**Node.js**](https://nodejs.org/pt-br/download/current)
- [**Docker**](https://www.docker.com/products/docker-desktop/) (optional)

> **Bun**, **Deno** and **Node.js** versions are tested using **Docker** official images.

---

## Developing

Fork this project, download your forked repository locally and create a new branch from `main`.  
Then run `npm ci` to clean install the node modules.

> Please, do not change the _package-lock.json_.

### Fixes

Where possible, provide an error test case that your fix covers.

### Features

It's better to discuss an API before actually start implementing it. You can open an issue on **Github**.
We can discuss design of API and implementation ideas.

- Please ensure test cases to cover your features.

---

## Testing

### General (recommended)

```sh
npm run test     # Test with the installed Node.js version
npm run test:bun # Test with the installed Bun version
```

### Coverage

Methods that vary according to **Node.js** version, platform or OS aren't tested against the coverage rate.

```sh
npm run test:c8
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
npm run lint:checker
```

> Also
>
> ```sh
> npm run lint:fix
> ```

---

## Issues and Pull Requests

By opening an **Issue** or submit a **Pull Request**, describe your problem or solution. If you can share a basic repro, it will be great.

- Prefer to talk in **English** for Issues.
- For **Pull Requests**, you're welcome to discuss in both **English** and **Portuguese**.

---

Naturally, please **be respectful** 🙋🏻‍♂️
