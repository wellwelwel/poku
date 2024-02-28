# Security Policy

## Is Poku Safe?

**Poku** is an open-source project, so you can see both the [Source Code on **GitHub** Repository](https://github.com/wellwelwel/poku) and the [Distribution Code on **NPM**](https://www.npmjs.com/package/poku?activeTab=code).

### Why does Poku use `child_process`?

Some test runners use **`eval`**, **Poku** prefers to use **`spawn`** to create a isolated process securely for each test file.

---

## Protective Measures

See the [**Protective Measures**](https://poku.dev/docs/security#protective-measures) in the documentation.

---

## Supported Versions

Currently, security updates will be applied to the following versions of **Poku**:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| 0.x.x   | :x:                |

---

## Reporting a Vulnerability

- Please, give detailed reports
- Include steps to reproduce the vulnerability, and if possible, a patch or workaround.
- Include the specific version of **Poku** you are using.

Please report it privately: https://github.com/wellwelwel/poku/security/advisories.

- Once the issue has been resolved, you will be attributed a part of the report.

---

Let's keeping **Poku** safe 🐷
