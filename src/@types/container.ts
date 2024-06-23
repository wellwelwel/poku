export type DockerfileConfigs = {
  /**
   * ```bash
   * docker build -t name .
   * ```
   *
   * ```bash
   * docker build -t name:tag .
   * ```
   */
  tagName: string;
  /**
   * ```bash
   * docker build -t tagName -f ./Dockerfile .
   * ```
   *
   * @default './Dockerfile'
   */
  file?: string;
  /**
   * ```bash
   * docker run --name containerName tagName
   * ```
   */
  containerName: string;
  /**
   * ```bash
   * docker build -t tagName -f ./Dockerfile ./context
   * ```
   *
   * @default '.'
   */
  context?: string;
  /**
   * ```bash
   * docker run -p expose:port --name containerName tagName
   * ```
   */
  ports?: string[];
  /**
   * ```bash
   * docker run -e VAR1 --name containerName tagName
   * ```
   *
   * ```bash
   * docker run -e VAR1=value1 --name containerName tagName
   * ```
   */
  environments?: string[];
  envFile?: string;
  /**
   * ```bash
   * docker build --no-cache -t tagName .
   * ```
   */
  cache?: boolean;
  detach?: boolean;
  cwd?: string;
  /** Show logs from Docker in real time */
  verbose?: boolean;
};

export type DockerComposeConfigs = {
  file?: string;
  projectName?: string;
  envFile?: string;
  cwd?: string;
  build?: boolean;
  serviceName?: string;
  detach?: boolean;
  /** Show logs from Docker in real time */
  verbose?: boolean;
};
