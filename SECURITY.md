# Security Policy

## Is Poku Safe?

**Poku** is an open-source project, so you can see both the [Source Code on **GitHub** Repository](https://github.com/wellwelwel/poku) and the [Distribution Code on **NPM**](https://www.npmjs.com/package/poku?activeTab=code).

---

### Why does Poku use `child_process`?

Some test runners use **`eval`**, **Poku** prefers to use **`spawn`** to create an isolated process securely for each test file without transforming your files.

---

### Protective Measures

- Blocks access above target directory by filtering `../` and `/` paths, for example:
  - `/root` will be sanitized to `./root`
  - `../../etc/secret` will be sanitized to `./etc/secret`
- Normalizes paths according to the OS, allowing all collaborators to use the same path, each using their own OS:
  - `\` for **Windows**
  - `/` for **Linux** and **macOS**
- Normalizes paths by filtering unusual path characters, for example:
  - `<>|^?*`
- Prevents shell scripts by setting `shell` to `false` in **`spawn`** options, ensuring that only secure arguments will be used.
- Every **RegExp** is prev-tested using the [**ReDoS Checker**](https://devina.io/redos-checker).

---

## Supported Versions

Currently, security updates will be applied to the following versions of **Poku**:

| Version | Supported          |
| ------- | ------------------ |
| 3.x.x   | :white_check_mark: |
| 2.x.x   | :x:                |
| 1.x.x   | :x:                |
| 0.x.x   | :x:                |

---

## Reporting a Vulnerability

- Please, give detailed reports
- Include steps to reproduce the vulnerability, and if possible, a patch or workaround.
- Include the specific version of **Poku** you are using.

**Reporting:**

- https://github.com/wellwelwel/poku/security/advisories

> Once the issue has been resolved, you will be attributed a part of the report.
