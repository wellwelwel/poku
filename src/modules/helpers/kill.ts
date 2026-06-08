import { isWindows } from '../../parsers/os.js';
import {
  killPID as killPIDService,
  setPortsAndPIDs,
} from '../../services/pid.js';
import { getPIDs } from './get-pids.js';

const killPID = async (PID: number | number[]): Promise<void> => {
  const PIDs = setPortsAndPIDs(PID);

  await Promise.all(
    PIDs.map(async (p) => {
      isWindows
        ? await killPIDService.windows(p)
        : await killPIDService.unix(p);
    })
  );
};

const killPIDs = async (PIDs: number[]): Promise<void> => {
  for (const PID of PIDs) {
    if (!PID) continue;

    await killPID(PID);
  }
};

const killPort = async (port: number | number[]): Promise<void> => {
  await killPIDs(await getPIDs(port));
};

const killRange = async (startsAt: number, endsAt: number): Promise<void> => {
  await killPIDs(await getPIDs.range(startsAt, endsAt));
};

/** Kill processes by PIDs, ports and port ranges. */
export const kill = {
  /** Kill the specified process ID */
  pid: killPID,
  /** Kill all processes listening on the specified port */
  port: killPort,
  /** Kill all processes listening on the specified range ports */
  range: killRange,
};
