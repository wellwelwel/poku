export type DockerfileConfigs = {
  /**
   * Specifies the imange name
   *
   * E.g., `"name"`, `"name:tag"`.
   */
  tagName: string;

  /**
   * Specifies the container name.
   */
  containerName: string;

  /**
   * Specifies the **Dockerfile** path
   *
   * ---
   *
   * @default "./Dockerfile"
   */
  file?: string;

  /**
   * Specifies the context path of the Dockerfile
   *
   * - It's different from `cwd`.
   *
   * ---
   *
   * @default "."
   */
  context?: string;

  /**
   * Specifies the ports to expose.
   *
   * E.g., `"6000:6000"`, `"8080:80"`, `"127.0.0.1:3306:3306"`.
   */
  ports?: string[];

  /**
   * Specifies the container environments variables.
   *
   * E.g, `"VAR1"`, `"VAR1=value1"`
   */
  environments?: string[];

  /**
   * Specifies a `.env` path to **Dockerfile**.
   */
  envFile?: string;

  /**
   * Forces the image build without cache.
   */
  cache?: boolean;

  /**
   * Doesn't run the container in the background and returns the container's process exit result (boolean).
   *
   * - Set to `false` to test whether a container was executed and finished successfully.
   *
   * ---
   *
   * @default true
   */
  detach?: boolean;

  /**
   * Defines the root directory where the process will run.
   *
   * ---
   *
   * @default "."
   */
  cwd?: string;

  /**
   * Show logs from **Docker** in real time.
   */
  verbose?: boolean;
};

export type DockerComposeConfigs = {
  /**
   * Specifies the **docker-compose.yml** path
   *
   * ---
   *
   * @default "./docker-compose.yml"
   */
  file?: string;

  /**
   * Specifies the project name.
   */
  projectName?: string;

  /**
   * Specifies a `.env` path to **docker-compose.yml**.
   */
  envFile?: string;

  /**
   * Defines the root directory where the process will run.
   *
   * ---
   *
   * @default "."
   */
  cwd?: string;

  /**
   * Forces the images (**Dockerfile**) to be rebuilt.
   */
  build?: boolean;

  /**
   * Starts only a specific **docker-compose.yml** service.
   */
  serviceName?: string;

  /**
   * Doesn't run the container in the background and returns the container's process exit result (boolean).
   *
   * - Set to `false` to test whether a container was executed and finished successfully.
   *
   * ---
   *
   * @default true
   */
  detach?: boolean;

  /**
   * Show logs from **Docker** in real time.
   */
  verbose?: boolean;
};
