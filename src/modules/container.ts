/* c8 ignore next */
import type {
  DockerComposeConfigs,
  DockerfileConfigs,
} from '../@types/container.js';
import { DockerCompose, DockerContainer } from '../services/container.js';

/**
 *
 * A minimal API to assist tests that require containers or tests that run inside containers using a **Dockerfile**.
 */
const dockerfile = (configs: DockerfileConfigs) => new DockerContainer(configs);

/**
 *
 * A minimal API to assist tests that require containers or tests that run inside containers using a **docker-compose.yml**.
 */
const compose = (configs: DockerComposeConfigs) => new DockerCompose(configs);

/* c8 ignore next */ // c8 bug
export const docker = { dockerfile, compose };
