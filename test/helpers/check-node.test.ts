import { spawn } from 'child_process';
import { padStart } from '../../src/helpers/pad.js';

export const checkNode = (version: number): Promise<number> =>
  new Promise((resolve, reject) => {
    const command = 'npm';
    const args = [
      'run',
      'test:docker',
      '--',
      `node-${padStart(String(version), 2, '0')}`,
    ];

    const process = spawn(command, args, {
      stdio: ['inherit', 'inherit', 'inherit'],
    });

    process.on('close', (exitCode) => {
      resolve(exitCode === 0 ? 0 : 1);
    });

    process.on('error', (error) => {
      reject(error);
    });
  });
