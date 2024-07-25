# Changelog

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
