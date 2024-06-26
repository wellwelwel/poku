/* c8 ignore start */ // This module is entirely process-based
import { spawn } from 'node:child_process';

const regex = {
  sequentialSpaces: /\s+/,
} as const;

export const setPortsAndPIDs = (portOrPID: number | number[]) =>
  Array.isArray(portOrPID)
    ? portOrPID
    : [portOrPID].map((p) => Number(p)).filter((p) => !Number.isNaN(p));

export const populateRange = (startsAt: number, endsAt: number) => {
  const first = Number(startsAt);
  const last = Number(endsAt);

  return Array.from({ length: last - first + 1 }, (_, i) => first + i);
};

export const killPID = {
  unix: (PID: number): Promise<void> =>
    new Promise((resolve) => {
      const service = spawn('kill', ['-9', String(Number(PID))]);

      service.on('close', () => {
        resolve(undefined);
      });
    }),
  windows: (PID: number): Promise<void> =>
    new Promise((resolve) => {
      const service = spawn('taskkill', [
        '/F',
        '/T',
        '/PID',
        String(Number(PID)),
      ]);

      service.on('close', () => {
        resolve(undefined);
      });
    }),
};

export const getPIDs = {
  unix: (port: number): Promise<number[]> =>
    new Promise((resolve) => {
      const PIDs: Set<number> = new Set();
      const service = spawn('lsof', [
        '-t',
        '-i',
        `:${Number(port)}`,
        '-s',
        'TCP:LISTEN',
      ]);

      service.stdout.on('data', (data: Buffer) => {
        const output = data.toString().trim().split('\n');

        for (const pid of output) {
          if (pid) {
            PIDs.add(Number(pid));
          }
        }
      });

      service.on('close', () => {
        resolve(Array.from(PIDs));
      });
    }),
  windows: (port: number): Promise<number[]> =>
    new Promise((resolve) => {
      const PIDs: Set<number> = new Set();
      const service = spawn('cmd.exe', [
        '/c',
        `netstat -aon | findstr :${Number(port)}`,
      ]);

      service.stdout.on('data', (data: Buffer) => {
        const output = data.toString().trim();
        const lines = output.trim().split('\n');

        /**
         * TODO: Chack line for "/:\d+\s+\w+\s+\d+\s+(\d+)/" regex match to safe support multiple Windows versions
         * (Tested against ReDos Checker)
         */
        lines.map((line) => {
          const tokens = line.trim().split(regex.sequentialSpaces);
          const stateIndex = tokens.indexOf('LISTENING');

          if (stateIndex !== -1 && tokens[stateIndex + 1]) {
            const pid = Number(tokens[stateIndex + 1]);

            if (!Number.isNaN(pid)) {
              PIDs.add(pid);
            }
          }
        });
      });

      service.on('close', () => {
        resolve(Array.from(PIDs));
      });
    }),
};
/* c8 ignore stop */
