/* c8 ignore start */

import { spawn } from 'node:child_process';
import { EOL } from 'node:os';

export const killPID = {
  unix: (PID: number): Promise<void> =>
    new Promise((resolve) => {
      try {
        const service = spawn('kill', ['-9', String(PID)]);

        service.on('close', () => {
          resolve(undefined);
        });
      } catch {
        resolve(undefined);
      }
    }),
  windows: (PID: number): Promise<void> =>
    new Promise((resolve) => {
      try {
        const service = spawn('taskkill', ['/F', '/T', '/PID', String(PID)]);

        service.on('close', () => {
          resolve(undefined);
        });
      } catch {
        resolve(undefined);
      }
    }),
};

export const getPIDs = {
  unix: (port: number): Promise<number[]> =>
    new Promise((resolve) => {
      try {
        const PIDs: Set<number> = new Set();
        const service = spawn('lsof', [
          '-t',
          '-i',
          `:${Number(port)}`,
          '-s',
          'TCP:LISTEN',
        ]);

        service.stdout.on('data', (data: Buffer) => {
          const output = data.toString().trim().split(EOL);

          output.forEach((pid) => {
            if (pid) PIDs.add(Number(pid));
          });
        });

        service.on('close', () => {
          resolve(Array.from(PIDs));
        });
      } catch {
        resolve([]);
      }
    }),
  windows: (port: number): Promise<number[]> =>
    new Promise((resolve) => {
      try {
        const PIDs: Set<number> = new Set();
        const service = spawn('cmd.exe', [
          '/c',
          `netstat -aon | findstr :${Number(port)}`,
        ]);

        service.stdout.on('data', (data: Buffer) => {
          const output = data.toString().trim();
          const lines = output.trim().split(EOL);

          /**
           * TODO: Chack line for "/:\d+\s+\w+\s+\d+\s+(\d+)/" regex match to safe support multiple Windows versions
           * (Tested against ReDos Checker)
           */
          lines.map((line) => {
            const tokens = line.trim().split(/\s+/);
            const stateIndex = tokens.indexOf('LISTENING');

            if (stateIndex !== -1 && tokens[stateIndex + 1]) {
              const pid = Number(tokens[stateIndex + 1]);

              if (!isNaN(pid)) PIDs.add(pid);
            }
          });
        });

        service.on('close', () => {
          resolve(Array.from(PIDs));
        });
      } catch {
        resolve([]);
      }
    }),
};

/* c8 ignore stop */
