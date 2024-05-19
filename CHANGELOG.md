# Changelog

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
