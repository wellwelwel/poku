# Contributing

If you're thinking of contributing, thank you 🎉

---

## Environment

You will need these tools installed on your system:

- [**Docker**](https://www.docker.com/products/docker-desktop/)
- [**Node.js**](https://nodejs.org/pt-br/download/current)

> **Bun**, **Deno** and **Node.js** are tested using **Docker** official images.

---

## Developing

Fork this project, download your forked repository locally and create a new branch from `main`.  
Then running `npm ci` to install the dependecies from _package-lock.json_.

> Please, do not change the _package-lock.json_.

---

## Testing

The tests can be easily run:

### All

```sh
npm run test:ci
```

### Per Platform

```sh
FILTER='node-' npm run test:ci
FILTER='bun-'  npm run test:ci
FILTER='deno-' npm run test:ci
```

### Lint

```sh
npm run lint:checker
```

---

## Issues and Pull Requests

By opening an **Issue** or submit a **Pull Request**, describe your problem or solution. If you can share a basic repro, it will be great.

Please, let's discuss before to submitting a feature.

> Including tests would be great!

---

Naturally, please **be respectful** 🙋🏻‍♂️
