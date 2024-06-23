/* c8 ignore next */
import type {
  DockerComposeConfigs,
  DockerfileConfigs,
} from '../@types/container.js';
/* c8 ignore next */ // c8 bug
import { spawn, type SpawnOptionsWithoutStdio } from 'node:child_process';
import { write } from '../helpers/logs.js';
import { isWindows } from '../helpers/runner.js';
import { sanitizePath } from '../modules/list-files.js';

const runDockerCommand = (
  command: string,
  args: string[],
  options?: SpawnOptionsWithoutStdio,
  verbose?: boolean
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const dockerProcess = spawn(command, args, {
      ...options,
      /* c8 ignore next */
      shell: isWindows,
    });

    /* c8 ignore start */
    if (verbose) {
      dockerProcess.stdout.on('data', write);
      dockerProcess.stderr.on('data', write);
    }
    /* c8 ignore stop */

    /* c8 ignore start */
    dockerProcess.on('close', (code) => {
      if (code === 0) return resolve();
      return reject(new Error(`Docker "run" failed with exit code ${code}`));
    });
    /* c8 ignore stop */
  });
};

export class DockerContainer {
  private file;
  private context;
  private tagName;
  private containerName;
  private ports;
  private environments;
  private cache;
  private envFile;
  private detach;
  private cwd;
  private verbose;

  constructor(configs: DockerfileConfigs) {
    const {
      context,
      file,
      tagName,
      containerName,
      ports,
      environments,
      cache,
      detach,
      envFile,
      cwd,
      verbose,
    } = configs;

    this.tagName = tagName;
    this.containerName = containerName;
    this.file = file || './Dockerfile';
    this.context = context || '.';
    this.ports = ports || [];
    this.cache = cache;
    this.environments = environments || [];
    this.envFile = envFile;
    this.detach = detach;
    /* c8 ignore next */
    this.cwd = cwd ? sanitizePath(cwd) : undefined;
    this.verbose = verbose;
  }

  public async build() {
    const args: string[] = ['build'];

    if (this.cache === false) args.push('--no-cache');

    await runDockerCommand(
      'docker',
      [...args, '-t', this.tagName, '-f', this.file, this.context],
      { cwd: this.cwd },
      this.verbose
    );
  }

  public async start() {
    const args: string[] = ['run', '--rm'];

    if (this.detach !== false) args.push('-d');

    args.push(...['--name', this.containerName]);

    this.ports.forEach((port) => args.push(...['-p', port]));
    this.environments.forEach((environment) =>
      args.push(...['-e', environment])
    );

    if (this.envFile) args.push(...['--env-file', this.envFile]);

    await runDockerCommand(
      'docker',
      [...args, this.tagName],
      { cwd: this.cwd },
      this.verbose
    );
  }

  public async stop() {
    await runDockerCommand(
      'docker',
      ['stop', this.containerName],
      { cwd: this.cwd },
      this.verbose
    );
  }

  public async remove() {
    await runDockerCommand(
      'docker',
      ['rm', '-f', this.containerName],
      { cwd: this.cwd },
      this.verbose
    );
    await runDockerCommand(
      'docker',
      ['image', 'rm', '-f', this.tagName],
      { cwd: this.cwd },
      this.verbose
    );
  }
}

export class DockerCompose {
  private file;
  private envFile;
  private projectName;
  private cwd;
  private verbose;
  private build;
  private detach;
  private serviceName;

  constructor(configs: DockerComposeConfigs) {
    const {
      file,
      projectName,
      build,
      serviceName,
      envFile,
      detach,
      cwd,
      verbose,
    } = configs;

    this.file = file || './docker-compose.yml';
    this.build = build;
    this.serviceName = serviceName;
    this.envFile = envFile;
    this.projectName = projectName;
    this.detach = detach;
    /* c8 ignore next */
    this.cwd = cwd ? sanitizePath(cwd) : undefined;
    this.verbose = verbose;
  }

  public async up() {
    const args: string[] = ['-f', this.file];

    if (this.envFile) args.push(...['--env-file', this.envFile]);
    if (this.projectName) args.push(...['-p', this.projectName]);

    args.push('up');
    if (this.detach !== false) args.push('-d');

    if (this.build) args.push('--build');
    if (this.serviceName) args.push(this.serviceName);

    await runDockerCommand(
      'docker-compose',
      args,
      { cwd: this.cwd },
      this.verbose
    );
  }

  public async down() {
    const args: string[] = ['-f', this.file];

    if (this.envFile) args.push(...['--env-file', this.envFile]);
    if (this.projectName) args.push(...['-p', this.projectName]);

    await runDockerCommand(
      'docker-compose',
      [...args, 'down'],
      { cwd: this.cwd },
      this.verbose
    );
  }
  /* c8 ignore next */ // c8 bug
}
