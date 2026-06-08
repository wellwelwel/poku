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
  unix: (PID: number) =>
    new Promise((resolve) => {
      const service = spawn('kill', ['-9', String(Number(PID))], {
        shell: false,
      });

      service.on('close', () => resolve(undefined));
    }),
  windows: (PID: number) =>
    new Promise((resolve) => {
      const service = spawn(
        'taskkill',
        ['/F', '/T', '/PID', String(Number(PID))],
        { shell: false }
      );

      service.on('close', () => resolve(undefined));
    }),
};

export const getPIDs = {
  unix: (port: number): Promise<number[]> =>
    new Promise((resolve) => {
      const PIDs: Set<number> = new Set();
      const service = spawn(
        'lsof',
        ['-t', '-i', `:${Number(port)}`, '-s', 'TCP:LISTEN'],
        { shell: false }
      );

      service.stdout.on('data', (data: Buffer) => {
        const output = data.toString().trim().split('\n');

        for (const pid of output) {
          if (pid) PIDs.add(Number(pid));
        }
      });

      service.on('close', () => resolve(Array.from(PIDs)));
    }),
  windows: (port: number): Promise<number[]> =>
    new Promise((resolve) => {
      const PIDs: Set<number> = new Set();
      const service = spawn('netstat', ['-aon'], { shell: false });
      const portMatch = `:${Number(port)}`;

      service.stdout.on('data', (data: Buffer) => {
        const output = data.toString().trim();
        const lines = output.trim().split('\n');

        for (const line of lines) {
          if (!line.includes(portMatch)) continue;

          const tokens = line.trim().split(regex.sequentialSpaces);
          const stateIndex = tokens.indexOf('LISTENING');

          if (stateIndex !== -1 && tokens[stateIndex + 1]) {
            const pid = Number(tokens[stateIndex + 1]);

            if (!Number.isNaN(pid)) PIDs.add(pid);
          }
        }
      });

      service.on('close', () => resolve(Array.from(PIDs)));
    }),
};
