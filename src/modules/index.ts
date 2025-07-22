import type { ConfigFile } from '../@types/poku.js';

export { poku } from './essentials/poku.js';
export { assert } from './essentials/assert.js';
export { strict } from './essentials/strict.js';
export { test } from './helpers/test.js';
export { describe } from './helpers/describe.js';
export { it } from './helpers/it/core.js';
export { envFile } from './helpers/env.js';
export { skip } from './helpers/skip.js';
export { beforeEach, afterEach } from './helpers/each.js';
export { docker } from './helpers/container.js';
export { startScript, startService } from './helpers/create-service.js';
export {
  waitForExpectedResult,
  waitForPort,
  sleep,
} from './helpers/wait-for.js';
export { kill } from './helpers/kill.js';
export { getPIDs } from './helpers/get-pids.js';
export { exit } from './helpers/exit.js';
export { log } from './helpers/log.js';
export { listFiles } from './helpers/list-files.js';
export {
  createSharedResource,
  dispatchSharedResourceAction,
  subscribeToSharedResource,
  getSharedResource,
  setupSharedResourceIPC,
} from './helpers/shared-resources.js';
export { VERSION as version } from '../configs/poku.js';

export type { Code } from '../@types/code.js';
export type { Configs } from '../@types/poku.js';
export type {
  DockerComposeConfigs,
  DockerfileConfigs,
} from '../@types/container.js';
export type {
  StartServiceOptions,
  StartScriptOptions,
} from '../@types/background-process.js';
export type {
  WaitForExpectedResultOptions,
  WaitForPortOptions,
} from '../@types/wait-for.js';
export type { Configs as ListFilesConfigs } from '../@types/list-files.js';

/** 🐷 Auxiliary function to define the `poku` configurations */
export const defineConfig = (options: ConfigFile) => options;
