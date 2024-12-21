import type {
  DockerComposeConfigs,
  DockerfileConfigs,
} from '../@types/container.js';
import { spawn, type SpawnOptionsWithoutStdio } from 'node:child_process';
import { log } from '../services/write.js';
import { isWindows } from '../parsers/get-runner.js';
import { sanitizePath } from '../modules/helpers/list-files.js';

const runDockerCommand = (
  command: string,
  args: string[],
  options?: SpawnOptionsWithoutStdio,
  verbose?: boolean
): Promise<boolean> => {
  return new Promise((resolve) => {
    const dockerProcess = spawn(command, args, {
      ...options,
      shell: isWindows,
    });

    if (verbose) {
      dockerProcess.stdout.setEncoding('utf8');
      dockerProcess.stderr.setEncoding('utf8');
      dockerProcess.stdout.on('data', log);
      dockerProcess.stderr.on('data', log);
    }

    dockerProcess.on('close', (code) => resolve(code === 0));
    dockerProcess.on('error', () => resolve(false));
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
    this.ports = ports ?? [];
    this.cache = cache;
    this.environments = environments ?? [];
    this.envFile = envFile;
    this.detach = detach;
    this.cwd = cwd ? sanitizePath(cwd) : undefined;
    this.verbose = verbose;
  }

  async build() {
    const args: string[] = ['build'];

    if (this.cache === false) args.push('--no-cache');

    await runDockerCommand(
      'docker',
      [...args, '-t', this.tagName, '-f', this.file, this.context],
      { cwd: this.cwd },
      this.verbose
    );
  }

  async start() {
    const args: string[] = ['run'];

    args.push(this.detach !== false ? '-d' : '--init');
    args.push(...['--name', this.containerName]);

    for (const port of this.ports) args.push(...['-p', port]);
    for (const environment of this.environments)
      args.push(...['-e', environment]);

    if (this.envFile) args.push(...['--env-file', this.envFile]);

    return await runDockerCommand(
      'docker',
      [...args, this.tagName],
      { cwd: this.cwd },
      this.verbose
    );
  }

  async stop() {
    return await runDockerCommand(
      'docker',
      ['stop', this.containerName],
      { cwd: this.cwd },
      this.verbose
    );
  }

  async remove() {
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

    this.file = file ?? './docker-compose.yml';
    this.build = build;
    this.serviceName = serviceName;
    this.envFile = envFile;
    this.projectName = projectName;
    this.detach = detach;
    this.cwd = cwd ? sanitizePath(cwd) : undefined;
    this.verbose = verbose;
  }

  async up() {
    const args: string[] = ['compose', '-f', this.file];

    if (this.envFile) args.push(...['--env-file', this.envFile]);
    if (this.projectName) args.push(...['-p', this.projectName]);

    args.push('up');
    args.push(this.detach !== false ? '-d' : '--abort-on-container-exit');

    if (this.build) args.push('--build');
    if (this.serviceName) args.push(this.serviceName);

    return await runDockerCommand(
      'docker',
      args,
      { cwd: this.cwd },
      this.verbose
    );
  }

  async down() {
    const args: string[] = ['-f', this.file];

    if (this.envFile) args.push(...['--env-file', this.envFile]);
    if (this.projectName) args.push(...['-p', this.projectName]);

    return await runDockerCommand(
      'docker',
      ['compose', ...args, 'down'],
      { cwd: this.cwd },
      this.verbose
    );
  }
}
