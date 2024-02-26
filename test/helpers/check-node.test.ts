import { spawn } from 'node:child_process';
import path from 'node:path';

export const executeDockerCompose = (serviceName: string): Promise<number> => {
  const cwd = path.resolve('./test/docker');
  const command = 'docker';
  const argsDown = ['compose', 'down', serviceName];
  const argsUp = [
    'compose',
    'up',
    '--build',
    '--abort-on-container-exit',
    '--remove-orphans',
    serviceName,
  ];

  return new Promise((resolve, reject) => {
    const downProcess = spawn(command, argsDown, { cwd });

    downProcess.on('close', () => {
      const upProcess = spawn(command, argsUp, { cwd });

      upProcess.on('close', (exitCode) => {
        if (exitCode !== 0) {
          const logsProcess = spawn(command, ['logs', '-f', serviceName], {
            cwd,
            stdio: 'inherit',
          });

          logsProcess.on('close', () => resolve(1));

          logsProcess.on('error', (error) => reject(error));
        } else resolve(exitCode === 0 ? 0 : 1);
      });

      upProcess.on('error', (error) => reject(error));
    });

    downProcess.on('error', (error) => reject(error));
  });
};
