# Changelog

## [3.0.0-rc.1](https://github.com/wellwelwel/poku/compare/v3.0.0-rc.0...v3.0.0-rc.1) (2024-12-23)


### Features

* add stable `only` modifier to `describe`, `it` and `test` methods ([#901](https://github.com/wellwelwel/poku/issues/901)) ([d6b6241](https://github.com/wellwelwel/poku/commit/d6b624196e787235b702a280d04f4481cd395aab))
* stable enforce values validation ([#905](https://github.com/wellwelwel/poku/issues/905)) ([3823848](https://github.com/wellwelwel/poku/commit/3823848669c312f7814fd5b3d7ceb63ab0d032e0))


### Performance Improvements

* improve global cache ([#907](https://github.com/wellwelwel/poku/issues/907)) ([7c01898](https://github.com/wellwelwel/poku/commit/7c01898247a43fb84a2e24bfe078808fe2d780c7))


### Miscellaneous Chores

* release 3.0.0-rc.1 ([91305a7](https://github.com/wellwelwel/poku/commit/91305a7ca3fd3e66014c477e995a6dc3a4f33626))

## [3.0.0-rc.0](https://github.com/wellwelwel/poku/compare/v2.7.1...v3.0.0-rc.0) (2024-12-11)


### ⚠ BREAKING CHANGES

* drop support for Node.js v12 ([#896](https://github.com/wellwelwel/poku/issues/896))
* drop `platform` option ([#894](https://github.com/wellwelwel/poku/issues/894))
* remove `allow-hrtime` by default for Deno ([#892](https://github.com/wellwelwel/poku/issues/892))
* drop `parallel` in favor of `sequential` option ([#888](https://github.com/wellwelwel/poku/issues/888))
* drop support for `Node.js` v8 and v10 ([#885](https://github.com/wellwelwel/poku/issues/885))
* drop kebab case support ([#883](https://github.com/wellwelwel/poku/issues/883))
* drop `include` CLI flag ([#877](https://github.com/wellwelwel/poku/issues/877))

### Performance Improvements

* use queue instead of groups for parallel tests ([#886](https://github.com/wellwelwel/poku/issues/886)) ([96b8707](https://github.com/wellwelwel/poku/commit/96b87071f7ea61c0e37bf6c2d64e1bf594a8eb3a))


### Miscellaneous Chores

* drop `include` CLI flag ([#877](https://github.com/wellwelwel/poku/issues/877)) ([237de89](https://github.com/wellwelwel/poku/commit/237de89ab7345a20fb0f8f40237535922015e9a3))
* drop `parallel` in favor of `sequential` option ([#888](https://github.com/wellwelwel/poku/issues/888)) ([fc2c72d](https://github.com/wellwelwel/poku/commit/fc2c72de249dbb9bdd5c0bbe158ad1ef65f0635c))
* drop `platform` option ([#894](https://github.com/wellwelwel/poku/issues/894)) ([7e07f16](https://github.com/wellwelwel/poku/commit/7e07f16ec56a968a7996f7216cb40228f3fe3c92))
* drop kebab case support ([#883](https://github.com/wellwelwel/poku/issues/883)) ([9e36dc5](https://github.com/wellwelwel/poku/commit/9e36dc505b8fac60064fddcae756d8920e9323a7))
* drop support for `Node.js` v8 and v10 ([#885](https://github.com/wellwelwel/poku/issues/885)) ([94a277b](https://github.com/wellwelwel/poku/commit/94a277b017fedfaad8ab86d83537035c8e807e04))
* drop support for Node.js v12 ([#896](https://github.com/wellwelwel/poku/issues/896)) ([edb1600](https://github.com/wellwelwel/poku/commit/edb1600cdef58e34389885760238a01b82eb0e8e))
* release 3.0.0-rc.0 ([3e03b5b](https://github.com/wellwelwel/poku/commit/3e03b5b9e958003b1fb7ed8b2b60b18be9a7b726))
* remove `allow-hrtime` by default for Deno ([#892](https://github.com/wellwelwel/poku/issues/892)) ([7b748a4](https://github.com/wellwelwel/poku/commit/7b748a4941638b1af080d170b11c20510abeb191))

## [2.7.1](https://github.com/wellwelwel/poku/compare/v2.7.0...v2.7.1) (2024-10-27)


### Bug Fixes

* prevent invalid column size count ([#830](https://github.com/wellwelwel/poku/issues/830)) ([2d00338](https://github.com/wellwelwel/poku/commit/2d00338810f25cc5fd7fa1bdea3ff4983cb54ac1))

## [2.7.0](https://github.com/wellwelwel/poku/compare/v2.6.2...v2.7.0) (2024-09-17)


### Features

* add `--help` command line option ([#765](https://github.com/wellwelwel/poku/issues/765)) ([bcde009](https://github.com/wellwelwel/poku/commit/bcde009e6a65f60c0e6c62fb8ed581a1c2c1f30f))
* add `only` modifier to `describe`, `it` and `test` methods ([#767](https://github.com/wellwelwel/poku/issues/767)) ([7658609](https://github.com/wellwelwel/poku/commit/76586095293da726ec664e1120f5395dc0390087))
* **strict:** use standard `assert` for Node.js legacy versions ([#761](https://github.com/wellwelwel/poku/issues/761)) ([d4b7b64](https://github.com/wellwelwel/poku/commit/d4b7b642207328cc7ead917cde3c3b5534988564))


### Bug Fixes

* **deno:** ensure `--denoCjs` respect the current Poku version ([#771](https://github.com/wellwelwel/poku/issues/771)) ([9ead4bc](https://github.com/wellwelwel/poku/commit/9ead4bc9ffdf96e23d024b9e411761a6e6f10fd0))

## [2.6.2](https://github.com/wellwelwel/poku/compare/v2.6.1...v2.6.2) (2024-09-10)


### Bug Fixes

* fix typings of `skip` modifier ([#754](https://github.com/wellwelwel/poku/issues/754)) ([d9851de](https://github.com/wellwelwel/poku/commit/d9851deff60b0369cbeb592b6d3b1001cb2381f3))
* fix typings of `todo` modifier ([#756](https://github.com/wellwelwel/poku/issues/756)) ([3ed7e77](https://github.com/wellwelwel/poku/commit/3ed7e77b36a232a56f8111575cdb5395c756cbc6))

## [2.6.1](https://github.com/wellwelwel/poku/compare/v2.6.0...v2.6.1) (2024-09-09)


### Bug Fixes

* allow all combinations of `describe`, `it` and `test` to `skip` modifier ([#746](https://github.com/wellwelwel/poku/issues/746)) ([c53f3e3](https://github.com/wellwelwel/poku/commit/c53f3e3304bde40f1e85212b92d4e1209f47d10f))
* **canary:** show correct version ([#750](https://github.com/wellwelwel/poku/issues/750)) ([6e8a583](https://github.com/wellwelwel/poku/commit/6e8a583a58ea8e555f236e81b90a0e0926768244))

## [2.6.0](https://github.com/wellwelwel/poku/compare/v2.5.0...v2.6.0) (2024-09-05)


### Features

* add `skip` modifier to `describe`, `it` and `test` methods ([#735](https://github.com/wellwelwel/poku/issues/735)) ([b756605](https://github.com/wellwelwel/poku/commit/b756605142ec2a1a22d5fe46d2f62aade2812d51))


### Bug Fixes

* improve counter output when using `skip` and `todo` ([#739](https://github.com/wellwelwel/poku/issues/739)) ([f5ac8b7](https://github.com/wellwelwel/poku/commit/f5ac8b71a2099df229cb343678a4b56c0462132e))

## [2.5.0](https://github.com/wellwelwel/poku/compare/v2.4.4...v2.5.0) (2024-08-20)


### Features

* **cli:** enforce flags validation ([#699](https://github.com/wellwelwel/poku/issues/699)) ([4477de1](https://github.com/wellwelwel/poku/commit/4477de1d8f08695485ca9b3567124780a7d9bb15))
* **cli:** support camelCase flags (deprecate kebab-case flags) ([#688](https://github.com/wellwelwel/poku/issues/688)) ([203fb45](https://github.com/wellwelwel/poku/commit/203fb451905ddfa5210a916c460ee47802a55852))


### Bug Fixes

* **waitForPort:** ensure process exit after Bun `v1.1.23` ([#689](https://github.com/wellwelwel/poku/issues/689)) ([85b6b3b](https://github.com/wellwelwel/poku/commit/85b6b3bef2a09ae761feeea1846249fc996aa262))

## [2.4.4](https://github.com/wellwelwel/poku/compare/v2.4.3...v2.4.4) (2024-08-14)


### Bug Fixes

* make output less verbose ([#668](https://github.com/wellwelwel/poku/issues/668)) ([9623aee](https://github.com/wellwelwel/poku/commit/9623aee9bdb5e332322c7c3eb804b74abce93287))
* propagate exit code when a failure occurs with `--fail-fast` ([#682](https://github.com/wellwelwel/poku/issues/682)) ([418a6e5](https://github.com/wellwelwel/poku/commit/418a6e5a8bd5acfd3b51d03a7081b39efb806f17))

## [2.4.3](https://github.com/wellwelwel/poku/compare/v2.4.2...v2.4.3) (2024-08-08)


### Bug Fixes

* **Deno:** fix `process` interoperability after `v2.4.2` ([#664](https://github.com/wellwelwel/poku/issues/664)) ([0eb5b9f](https://github.com/wellwelwel/poku/commit/0eb5b9fcb89ccb95e4c3269fc83bd7caee4c6774))

## [2.4.2](https://github.com/wellwelwel/poku/compare/v2.4.1...v2.4.2) (2024-08-08)


### Bug Fixes

* prevent premature exit after an assertion failure ([#662](https://github.com/wellwelwel/poku/issues/662)) ([32161bb](https://github.com/wellwelwel/poku/commit/32161bb51da9b3e43394a54529b70cd1b45b9f58))
* prevent premature exit of test suite ([46d068a](https://github.com/wellwelwel/poku/commit/46d068a07358e98946573216af7b8f66dd38c305))
* prevent premature exit of test suites ([#660](https://github.com/wellwelwel/poku/issues/660)) ([46d068a](https://github.com/wellwelwel/poku/commit/46d068a07358e98946573216af7b8f66dd38c305))

## [2.4.1](https://github.com/wellwelwel/poku/compare/v2.4.0...v2.4.1) (2024-08-06)


### Bug Fixes

* sort list of the file paths emitted by `--list-files` ([#657](https://github.com/wellwelwel/poku/issues/657)) ([2b0528a](https://github.com/wellwelwel/poku/commit/2b0528a773bb252faf2884c942f599d97a015109))

## [2.4.0](https://github.com/wellwelwel/poku/compare/v2.3.0...v2.4.0) (2024-08-03)


### Features

* add `--list-files` command line option ([#645](https://github.com/wellwelwel/poku/issues/645)) ([49f6291](https://github.com/wellwelwel/poku/commit/49f62919efab319a8aaeca1f240d64cf85c2e1b6))
* add `--version` command line option ([#643](https://github.com/wellwelwel/poku/issues/643)) ([7051913](https://github.com/wellwelwel/poku/commit/7051913abb40c0fa4b53832d5395b32777784a8b))
* allow multiple args and types to `log` helper ([#646](https://github.com/wellwelwel/poku/issues/646)) ([8f2b6c4](https://github.com/wellwelwel/poku/commit/8f2b6c40325eb7274b902e92f64039d59d83fbf7))

## [2.3.0](https://github.com/wellwelwel/poku/compare/v2.2.4...v2.3.0) (2024-08-01)


### Features

* add `.todo` helper for `describe`, `it`, and `test` ([#633](https://github.com/wellwelwel/poku/issues/633)) ([526112c](https://github.com/wellwelwel/poku/commit/526112c26fa028895487004101dc66f0fd72837e))


### Performance Improvements

* improve concurrency defaults (inspired by Jest definitions) ([#637](https://github.com/wellwelwel/poku/issues/637)) ([ab01530](https://github.com/wellwelwel/poku/commit/ab01530df977afac0ca737a32db8edfa44568f7f))

## [2.2.4](https://github.com/wellwelwel/poku/compare/v2.2.3...v2.2.4) (2024-07-27)


### Bug Fixes

* always use half of available parallelism ([#611](https://github.com/wellwelwel/poku/issues/611)) ([4c3f289](https://github.com/wellwelwel/poku/commit/4c3f289c1977b05e6d8e784a804b9f5319c3ec2d))
* **cli:** ensure `filter` and `exclude` when expanding glob from shell ([de9d817](https://github.com/wellwelwel/poku/commit/de9d8171a181f9bd6dc0806321a7f1a029b1fd0b))
* **output:** always list files at the end of a test run ([#616](https://github.com/wellwelwel/poku/issues/616)) ([bd47ed4](https://github.com/wellwelwel/poku/commit/bd47ed432bf71c0004bd6445bbf547eeecd1e97a))

## [2.2.3](https://github.com/wellwelwel/poku/compare/v2.2.2...v2.2.3) (2024-07-26)


### Bug Fixes

* prevent 100% CPU usage in large-scale test suites ([#606](https://github.com/wellwelwel/poku/issues/606)) ([382631b](https://github.com/wellwelwel/poku/commit/382631b13b37bf467d202b502ec54dacd51e32db))

## [2.2.2](https://github.com/wellwelwel/poku/compare/v2.2.1...v2.2.2) (2024-07-25)


### Bug Fixes

* ensure `afterEach` execution after a test failure ([#598](https://github.com/wellwelwel/poku/issues/598)) ([e6654c4](https://github.com/wellwelwel/poku/commit/e6654c410eaf2e7a564c58dfe8766fe3f6859e20))
* **Windows:** ensure configuration file loading (`js` and `cjs`) ([#602](https://github.com/wellwelwel/poku/issues/602)) ([2d53660](https://github.com/wellwelwel/poku/commit/2d53660244582407e6e8cdb1329057ef91d9535c))

## [2.2.1](https://github.com/wellwelwel/poku/compare/v2.2.0...v2.2.1) (2024-07-24)


### Bug Fixes

* async execution order for `each` helper API ([#588](https://github.com/wellwelwel/poku/issues/588)) ([fb92892](https://github.com/wellwelwel/poku/commit/fb92892b6a9075568ecc3605fbcd50e36fee5653))

## [2.2.0](https://github.com/wellwelwel/poku/compare/v2.1.0...v2.2.0) (2024-07-22)


### Features

* support for short and alternative flags ([#568](https://github.com/wellwelwel/poku/issues/568)) ([ee1800f](https://github.com/wellwelwel/poku/commit/ee1800f8f177937cc2f3ddc12ad15c43eda1c26f))


### Bug Fixes

* typings of `it()` and `test()` helpers ([#582](https://github.com/wellwelwel/poku/issues/582)) ([babd214](https://github.com/wellwelwel/poku/commit/babd21475b663fb66bc512a21a1b38d79c278f69))

## [2.1.0](https://github.com/wellwelwel/poku/compare/v2.0.0...v2.1.0) (2024-07-20)


### Features

* **cli:** support for multiple paths in any position ([#562](https://github.com/wellwelwel/poku/issues/562)) ([5ff880b](https://github.com/wellwelwel/poku/commit/5ff880b0014e4ec62d5a1660079fc7f8a4172e2a))
* support for config files (`js` and `cjs`) ([#560](https://github.com/wellwelwel/poku/issues/560)) ([368f396](https://github.com/wellwelwel/poku/commit/368f3965bf5482d940b9ab2220c92e8b3b15e754))
* support for config files (`json` and `jsonc`) ([#557](https://github.com/wellwelwel/poku/issues/557)) ([e954336](https://github.com/wellwelwel/poku/commit/e954336b33dae7f8765e667f193020c3d8f2099c))

## [2.0.0](https://github.com/wellwelwel/poku/compare/v1.23.0...v2.0.0) (2024-07-11)


### ⚠ BREAKING CHANGES

* drop `beforeEach` and `afterEach` support for each `assert` ([#539](https://github.com/wellwelwel/poku/issues/539))
* drop `assertPromise` helper ([#538](https://github.com/wellwelwel/poku/issues/538))
* change `listFiles` helper from sync to async ([#537](https://github.com/wellwelwel/poku/issues/537))
* drop deprecated methods and options ([#536](https://github.com/wellwelwel/poku/issues/536))
* drop support for Node.js 6 and 7 ([#534](https://github.com/wellwelwel/poku/issues/534))

### Features

* support for `strict` assertions ([#541](https://github.com/wellwelwel/poku/issues/541)) ([68dae82](https://github.com/wellwelwel/poku/commit/68dae82e9783b367e2b59622386c3a878d4b8d37))


### Miscellaneous Chores

* change `listFiles` helper from sync to async ([#537](https://github.com/wellwelwel/poku/issues/537)) ([945c4fb](https://github.com/wellwelwel/poku/commit/945c4fb82ee2a05f8ec1234a82d79876c36ebe55))
* drop `assertPromise` helper ([#538](https://github.com/wellwelwel/poku/issues/538)) ([954ca1b](https://github.com/wellwelwel/poku/commit/954ca1bc7e661f6e45834030546abefd10d92857))
* drop `beforeEach` and `afterEach` support for each `assert` ([#539](https://github.com/wellwelwel/poku/issues/539)) ([a8455a7](https://github.com/wellwelwel/poku/commit/a8455a7a1ca708f285533001442a0ce11a233285))
* drop deprecated methods and options ([#536](https://github.com/wellwelwel/poku/issues/536)) ([ae6ff4b](https://github.com/wellwelwel/poku/commit/ae6ff4b702bc03685cefc8a6e2ae019437c79b0e))
* drop support for Node.js 6 and 7 ([#534](https://github.com/wellwelwel/poku/issues/534)) ([a11b1b4](https://github.com/wellwelwel/poku/commit/a11b1b4e47b60fc3cbffe5e8c18c75f78c9e871f))

## [1.23.0](https://github.com/wellwelwel/poku/compare/v1.22.0...v1.23.0) (2024-07-09)


### Features

* add out-of-box support for `.env` files ([#527](https://github.com/wellwelwel/poku/issues/527)) ([4ef3ecf](https://github.com/wellwelwel/poku/commit/4ef3ecfbd3810365abf8c36418155749356b787d))

## [1.22.0](https://github.com/wellwelwel/poku/compare/v1.21.0...v1.22.0) (2024-07-08)


### Features

* **skip:** allow to skip tests ([#523](https://github.com/wellwelwel/poku/issues/523)) ([fccfb0d](https://github.com/wellwelwel/poku/commit/fccfb0d59bfd8d25d1af46fbbb705f219c2cb821))

## [1.21.0](https://github.com/wellwelwel/poku/compare/v1.20.2...v1.21.0) (2024-07-02)


### Features

* **watch:** reset and rerun all tests by entering `rs` ([#493](https://github.com/wellwelwel/poku/issues/493)) ([8a27789](https://github.com/wellwelwel/poku/commit/8a27789459955250549d47a7d9deb3ffdcd557e9))

## [1.20.2](https://github.com/wellwelwel/poku/compare/v1.20.1...v1.20.2) (2024-07-01)


### Bug Fixes

* **beforeEach and afterEach:** show proper callback name ([#490](https://github.com/wellwelwel/poku/issues/490)) ([812744d](https://github.com/wellwelwel/poku/commit/812744d8fe2e7b74380d02a47966ea69df671e60))
* **logs:** respect `quiet` option ([#492](https://github.com/wellwelwel/poku/issues/492)) ([aabb1b3](https://github.com/wellwelwel/poku/commit/aabb1b36105415512e9aaf02ad1c418dad6d4dc0))

## [1.20.1](https://github.com/wellwelwel/poku/compare/v1.20.0...v1.20.1) (2024-06-26)


### Bug Fixes

* **beforeEach and afterEach:** end with the proper exit code ([#471](https://github.com/wellwelwel/poku/issues/471)) ([716cf5c](https://github.com/wellwelwel/poku/commit/716cf5c82c460b1f0411bdc72f2fda356ee7f621))
* recognize `.mts` and `.cts` extensions as TS files ([#474](https://github.com/wellwelwel/poku/issues/474)) ([c073ed3](https://github.com/wellwelwel/poku/commit/c073ed365d3998c2ca373976af946a3cf6dbfa89))

## [1.20.0](https://github.com/wellwelwel/poku/compare/v1.19.0...v1.20.0) (2024-06-25)


### Features

* **processes:** `waitForExpectedResult` helper ([#461](https://github.com/wellwelwel/poku/issues/461)) ([7e08d59](https://github.com/wellwelwel/poku/commit/7e08d5966b388824571022ffd158f77b1605f02e))


### Bug Fixes

* **watch:** map line-breaking imports ([#463](https://github.com/wellwelwel/poku/issues/463)) ([0d82461](https://github.com/wellwelwel/poku/commit/0d82461c7df314341f8b04ba74511653cf2230c7))

## [1.19.0](https://github.com/wellwelwel/poku/compare/v1.18.0...v1.19.0) (2024-06-24)


### Features

* **containers:** dockerfile and compose API helpers ([#442](https://github.com/wellwelwel/poku/issues/442)) ([ed3d8c6](https://github.com/wellwelwel/poku/commit/ed3d8c68cf1001239a17d501575def07871c1ff4))
* **processes:** `waitForPort` helper ([#452](https://github.com/wellwelwel/poku/issues/452)) ([01751f8](https://github.com/wellwelwel/poku/commit/01751f8aaf8716bad24e149efe1bbfdb9a936913))

## [1.18.0](https://github.com/wellwelwel/poku/compare/v1.17.1...v1.18.0) (2024-06-21)


### Features

* **watch:** recursive deep level support ([#422](https://github.com/wellwelwel/poku/issues/422)) ([e1ffae0](https://github.com/wellwelwel/poku/commit/e1ffae03a25c57c04ed25556c27d4f8d59f958a1))

## [1.17.1](https://github.com/wellwelwel/poku/compare/v1.17.0...v1.17.1) (2024-06-17)


### Bug Fixes

* **assert:** `Map`, `Set` and `Symbol` aren't parsed ([#405](https://github.com/wellwelwel/poku/issues/405)) ([9ab7202](https://github.com/wellwelwel/poku/commit/9ab72027c96928a310595ef5e335a7d79670950b))

## [1.17.0](https://github.com/wellwelwel/poku/compare/v1.16.0...v1.17.0) (2024-06-15)


### Features

* watch dynamic imports ([#397](https://github.com/wellwelwel/poku/issues/397)) ([fd4fe6a](https://github.com/wellwelwel/poku/commit/fd4fe6a2fca1b5882c07d888e80ceae202b03051))

## [1.16.0](https://github.com/wellwelwel/poku/compare/v1.15.1...v1.16.0) (2024-06-14)


### Features

* introduce `watch` mode ([#393](https://github.com/wellwelwel/poku/issues/393)) ([8b816f7](https://github.com/wellwelwel/poku/commit/8b816f78b8569f9fafba2eb177c3c43952dfc9ee))

## [1.15.1](https://github.com/wellwelwel/poku/compare/v1.15.0...v1.15.1) (2024-06-12)


### Bug Fixes

* **logs:** properly show failures in parallel runs ([#382](https://github.com/wellwelwel/poku/issues/382)) ([964b5a2](https://github.com/wellwelwel/poku/commit/964b5a22ddba424b38ab5fe43bd9406b578a7615))

## [1.15.0](https://github.com/wellwelwel/poku/compare/v1.14.1...v1.15.0) (2024-06-10)


### Features

* **cli:** show individual and total test execution times ([#359](https://github.com/wellwelwel/poku/issues/359)) ([56f08d0](https://github.com/wellwelwel/poku/commit/56f08d00a925807b957585b5964497f1973388ee))
* **cli:** show paths and options when using `--debug` ([#358](https://github.com/wellwelwel/poku/issues/358)) ([1c0da5c](https://github.com/wellwelwel/poku/commit/1c0da5cd7a874f64a9ed8b2888e3dd6c7007822e))
* **describe:** support for Node.js familiar API usage ([#353](https://github.com/wellwelwel/poku/issues/353)) ([b423a7e](https://github.com/wellwelwel/poku/commit/b423a7e175f1caecc9b2719a45ee784bd974d67c))
* **it:** support for Node.js familiar API usage ([#354](https://github.com/wellwelwel/poku/issues/354)) ([c7b2b48](https://github.com/wellwelwel/poku/commit/c7b2b488261d2c20708db9ed37f1a83e5dedf2ff))
* **test:** support for Node.js familiar API usage ([#352](https://github.com/wellwelwel/poku/issues/352)) ([1c425e1](https://github.com/wellwelwel/poku/commit/1c425e15869e3135f9d47814234d22a32f5e9159))


### Bug Fixes

* **logs:** improve output for `test`, `describe` and `it` ([#357](https://github.com/wellwelwel/poku/issues/357)) ([a6facf0](https://github.com/wellwelwel/poku/commit/a6facf0f66a23eda0b3e5ef74547c2dac50ab575))
* **perf:** improve validations, recursions, logs and imports ([#346](https://github.com/wellwelwel/poku/issues/346)) ([89bcac3](https://github.com/wellwelwel/poku/commit/89bcac34a6f82d1c44c68c5d092e4f75d6d18605))

## [1.14.1](https://github.com/wellwelwel/poku/compare/v1.14.0...v1.14.1) (2024-06-05)


### Bug Fixes

* **cli:** improve performance and indentation ([#333](https://github.com/wellwelwel/poku/issues/333)) ([5efe7d0](https://github.com/wellwelwel/poku/commit/5efe7d0c25a87f7d77bec63f8d78192af3bf11d3))
* **cli:** show external errors without requiring debugging ([#335](https://github.com/wellwelwel/poku/issues/335)) ([f954089](https://github.com/wellwelwel/poku/commit/f9540893f9a71c467b09630c112709802216d994))

## [1.14.0](https://github.com/wellwelwel/poku/compare/v1.13.0...v1.14.0) (2024-05-29)


### Features

* **deno:** allow direct CommonJS execution in Deno ([#300](https://github.com/wellwelwel/poku/issues/300)) ([fa358b5](https://github.com/wellwelwel/poku/commit/fa358b5515d7b1ab70bb807359cca6127e45f900))

## [1.13.0](https://github.com/wellwelwel/poku/compare/v1.12.1...v1.13.0) (2024-05-23)


### Features

* **deno:** support for custom `allow` permissions ([#284](https://github.com/wellwelwel/poku/issues/284)) ([4e551f6](https://github.com/wellwelwel/poku/commit/4e551f6c99fd6b7ff74a671fa441ac8279cf4a3c))
* **deno:** support for custom `deny` permissions ([#286](https://github.com/wellwelwel/poku/issues/286)) ([3172c4b](https://github.com/wellwelwel/poku/commit/3172c4b14be3ca20b52d6dc4efa068cd89766875))

## [1.12.1](https://github.com/wellwelwel/poku/compare/v1.12.0...v1.12.1) (2024-05-19)


### Bug Fixes

* **assert:** improve multi-depth logs ([#265](https://github.com/wellwelwel/poku/issues/265)) ([f7abbfa](https://github.com/wellwelwel/poku/commit/f7abbfac0044995578d4a3b3603465c756a799fb))

## [1.12.0](https://github.com/wellwelwel/poku/compare/v1.11.0...v1.12.0) (2024-05-18)


### Features

* **test runner:** add concurrency limit option ([#260](https://github.com/wellwelwel/poku/issues/260)) ([58c9dc0](https://github.com/wellwelwel/poku/commit/58c9dc0a185d4752c32a6f907be09ecc490cdcf6))

## [1.11.0](https://github.com/wellwelwel/poku/compare/v1.10.2...v1.11.0) (2024-05-16)


### Features

* **kill, getPIDs:** find and kill processes by ports and PIDs ([#247](https://github.com/wellwelwel/poku/issues/247)) ([13305cf](https://github.com/wellwelwel/poku/commit/13305cf82a787b8f2e68abd45d3a3b0f7cfae9ba))

## [1.10.2](https://github.com/wellwelwel/poku/compare/v1.10.1...v1.10.2) (2024-05-15)


### Bug Fixes

* **Bun:** close only listening PIDs ([#245](https://github.com/wellwelwel/poku/issues/245)) ([e9e36a2](https://github.com/wellwelwel/poku/commit/e9e36a2932e8a824249202b7e1b7aaaa7bf40ebf))

## [1.10.1](https://github.com/wellwelwel/poku/compare/v1.10.0...v1.10.1) (2024-05-14)


### Bug Fixes

* **startScript:** disable throw for Bun and Deno ([#242](https://github.com/wellwelwel/poku/issues/242)) ([0619688](https://github.com/wellwelwel/poku/commit/0619688c5062eafefdd3209d78165c218694fece))

## [1.10.0](https://github.com/wellwelwel/poku/compare/v1.9.4...v1.10.0) (2024-05-12)


### Features

* **poku:** add fail-fast option ([#226](https://github.com/wellwelwel/poku/issues/226)) ([c204c5d](https://github.com/wellwelwel/poku/commit/c204c5d47883e1ae08d442da90ff468d08dfa2c7))

## [1.9.4](https://github.com/wellwelwel/poku/compare/v1.9.3...v1.9.4) (2024-04-26)


### Bug Fixes

* **Windows:** adapt for Node.js breaking change ([#210](https://github.com/wellwelwel/poku/issues/210)) ([71d36e9](https://github.com/wellwelwel/poku/commit/71d36e9cebcc76f8fa06e603401e543e299cf57c))

## [1.9.3](https://github.com/wellwelwel/poku/compare/v1.9.2...v1.9.3) (2024-03-24)


### Bug Fixes

* **assert:** allow custom message for `ifError` ([#147](https://github.com/wellwelwel/poku/issues/147)) ([7252fd4](https://github.com/wellwelwel/poku/commit/7252fd45289a91478974a846582b3bd522dfa094))
* **Windows, Bun & Deno:** startService doesn't ends ([#118](https://github.com/wellwelwel/poku/issues/118)) ([2dd7fe0](https://github.com/wellwelwel/poku/commit/2dd7fe02b46772862d2ca78dc98de681e75d285c))

## [1.9.2](https://github.com/wellwelwel/poku/compare/v1.9.1...v1.9.2) (2024-03-16)


### Bug Fixes

* **compatibility:** add support for TypeScript 4.7 or higher ([#114](https://github.com/wellwelwel/poku/issues/114)) ([b44f965](https://github.com/wellwelwel/poku/commit/b44f9652ae4156a982c7886e5094ae2a9ec9e9f2))
* conflict when using "eachs" for both test and assert ([#117](https://github.com/wellwelwel/poku/issues/117)) ([68e72eb](https://github.com/wellwelwel/poku/commit/68e72eb3daaaf5ee4640347b89e823d70a283b71))

## [1.9.1](https://github.com/wellwelwel/poku/compare/v1.9.0...v1.9.1) (2024-03-15)


### Bug Fixes

* **test runner:** ensure all logs when using `debug` option ([#112](https://github.com/wellwelwel/poku/issues/112)) ([42a1e5e](https://github.com/wellwelwel/poku/commit/42a1e5eecc60547226c9539a2adac3d354817fde))

## [1.9.0](https://github.com/wellwelwel/poku/compare/v1.8.1...v1.9.0) (2024-03-10)


### Features

* introduce `startScript` and `startService` ([#91](https://github.com/wellwelwel/poku/issues/91)) ([bc414bb](https://github.com/wellwelwel/poku/commit/bc414bb1bea57209b33334963e198dc155378e3b))

## [1.8.1](https://github.com/wellwelwel/poku/compare/v1.8.0...v1.8.1) (2024-03-05)


### Bug Fixes

* **Windows:** adapt path sanitization and npx.cmd ([#80](https://github.com/wellwelwel/poku/issues/80)) ([a30359d](https://github.com/wellwelwel/poku/commit/a30359d1e2e4b01b5a2479cf28d97cadc5f3f155))

## [1.8.0](https://github.com/wellwelwel/poku/compare/v1.7.0...v1.8.0) (2024-03-04)


### Features

* add `test` helper ([#71](https://github.com/wellwelwel/poku/issues/71)) ([a4ea046](https://github.com/wellwelwel/poku/commit/a4ea046f10e893c262f96fdd4f1c4ac3977cb5f0))

## [1.7.0](https://github.com/wellwelwel/poku/compare/v1.6.1...v1.7.0) (2024-03-03)


### Features

* **docs:** introduce Portuguese BR docs ([#66](https://github.com/wellwelwel/poku/issues/66)) ([9a6dc87](https://github.com/wellwelwel/poku/commit/9a6dc871261fc89203c33de758e946df3f555ab0))
* **logs:** simplify the describe ([#63](https://github.com/wellwelwel/poku/issues/63)) ([790ced0](https://github.com/wellwelwel/poku/commit/790ced0fab67f2e6a5de37e571a4e5343852f548))

## [1.6.1](https://github.com/wellwelwel/poku/compare/v1.6.0...v1.6.1) (2024-03-01)


### Bug Fixes

* **bun:** file path is not parsed ([#58](https://github.com/wellwelwel/poku/issues/58)) ([dad9498](https://github.com/wellwelwel/poku/commit/dad9498b8f6392343da1443d0f7913ec63216126))

## [1.6.0](https://github.com/wellwelwel/poku/compare/v1.5.1...v1.6.0) (2024-02-29)


### Features

* innovating `beforeEach` and `afterEach` ([#53](https://github.com/wellwelwel/poku/issues/53)) ([3ea3a12](https://github.com/wellwelwel/poku/commit/3ea3a1227ee1fd897759fc47b24511f904f6b927))
* support target file and directories ([#47](https://github.com/wellwelwel/poku/issues/47)) ([4353996](https://github.com/wellwelwel/poku/commit/43539969f9f2a444026ba52cc9e77a440953cea1))

## [1.5.1](https://github.com/wellwelwel/poku/compare/v1.5.0...v1.5.1) (2024-02-28)


### Bug Fixes

* **security:** sanitize path and prevent shell scripts ([#33](https://github.com/wellwelwel/poku/issues/33)) ([39f7d8c](https://github.com/wellwelwel/poku/commit/39f7d8c8b6e5e18a66f56581a6e0665132baa04c))

## [1.5.0](https://github.com/wellwelwel/poku/compare/v1.4.0...v1.5.0) (2024-02-26)


### Features

* **assert:** automatic describe it ([#29](https://github.com/wellwelwel/poku/issues/29)) ([77c0b54](https://github.com/wellwelwel/poku/commit/77c0b541607c69e1df7b5ded57e13f274459c130))


### Bug Fixes

* **filter:** include both .test. and .spec. as default ([#27](https://github.com/wellwelwel/poku/issues/27)) ([9172160](https://github.com/wellwelwel/poku/commit/91721608d5c102d81aa05a309743579fdf06b7ae))

## [1.4.0](https://github.com/wellwelwel/poku/compare/v1.3.1...v1.4.0) (2024-02-22)


### Features

* **website:** introduce Poku's website ([#20](https://github.com/wellwelwel/poku/issues/20)) ([172f081](https://github.com/wellwelwel/poku/commit/172f08110aecf9c82ff2120f085334c6c6f5740f))

## [1.3.1](https://github.com/wellwelwel/poku/compare/v1.3.0...v1.3.1) (2024-02-20)


### Bug Fixes

* **cli:** allow no log and log success options ([#15](https://github.com/wellwelwel/poku/issues/15)) ([bff6a15](https://github.com/wellwelwel/poku/commit/bff6a1588a80823ac23ca078faad057a38e2b268))

## [1.3.0](https://github.com/wellwelwel/poku/compare/v1.2.0...v1.3.0) (2024-02-19)


### Features

* **assert:** human readability `assert` ([#14](https://github.com/wellwelwel/poku/issues/14)) ([66e5a52](https://github.com/wellwelwel/poku/commit/66e5a52051d40b741a27c9634e73f380a99d8e0b))
* **CLI:** flexible include ([#12](https://github.com/wellwelwel/poku/issues/12)) ([ec63f28](https://github.com/wellwelwel/poku/commit/ec63f281fe5fe3cc938537b6e167d9416c41c6cd))

## [1.2.0](https://github.com/wellwelwel/poku/compare/v1.1.1...v1.2.0) (2024-02-18)


### Features

* add listFiles method ([#10](https://github.com/wellwelwel/poku/issues/10)) ([0b78815](https://github.com/wellwelwel/poku/commit/0b78815e08722635934a9fef793dd5f11b7458d3))
* add option exclude ([#7](https://github.com/wellwelwel/poku/issues/7)) ([74becbc](https://github.com/wellwelwel/poku/commit/74becbc36e223abc8b580ac1ef8eb86a7ea8621a))
* set platform manually ([#11](https://github.com/wellwelwel/poku/issues/11)) ([e681281](https://github.com/wellwelwel/poku/commit/e681281ffdc08718f96e5b6b4c526d4bf8c8559f))


### Bug Fixes

* **CLI:** support parallel option ([#9](https://github.com/wellwelwel/poku/issues/9)) ([f32d20a](https://github.com/wellwelwel/poku/commit/f32d20ad25707c46044d50500c3db82d40e157b9))

## [1.1.1](https://github.com/wellwelwel/poku/compare/v1.1.0...v1.1.1) (2024-02-15)


### Bug Fixes

* **filter:** support multiple files on CLI ([#5](https://github.com/wellwelwel/poku/issues/5)) ([76da3d1](https://github.com/wellwelwel/poku/commit/76da3d1903c21db984489f07fb5a5de8292abeaa))

## [1.1.0](https://github.com/wellwelwel/poku/compare/v1.0.0...v1.1.0) (2024-02-15)


### Features

* befriend Bun and Deno ([#2](https://github.com/wellwelwel/poku/issues/2)) ([7d11888](https://github.com/wellwelwel/poku/commit/7d1188802f99a8516119764ca9d83f397132fb9c))

## 1.0.0 (2024-02-13)


### Features

* introduce CLI usage ([4e77c0c](https://github.com/wellwelwel/poku/commit/4e77c0cae077215824748ee18adbfdd56e67aac7))
* Poku's birth ([599c73a](https://github.com/wellwelwel/poku/commit/599c73a63af9c329408da78a79b844065d1dbbc5))
* support parallel running ([778350a](https://github.com/wellwelwel/poku/commit/778350aca9fbc8298e8f44a24e038fdb6525eff0))


### Bug Fixes

* process exit on parallel runs ([d4da908](https://github.com/wellwelwel/poku/commit/d4da908ee7ea632f4e15bf81d3a10826d448ac72))
* **types:** expose types ([696b74d](https://github.com/wellwelwel/poku/commit/696b74d3316a01ad149d56387097432a20c2a0a2))
* **types:** remove tests from compilation ([3bc6a65](https://github.com/wellwelwel/poku/commit/3bc6a657fbc039b844585e5de66732782860e3b6))
