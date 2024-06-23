/* c8 ignore next */
import {
  DockerComposeConfigs,
  DockerfileConfigs,
} from '../@types/container.js';
import { DockerCompose, DockerContainer } from '../services/container.js';

const dockerfile = (configs: DockerfileConfigs) => new DockerContainer(configs);
const compose = (configs: DockerComposeConfigs) => new DockerCompose(configs);

/* c8 ignore next */ // c8 bug
export const docker = { dockerfile, compose };
