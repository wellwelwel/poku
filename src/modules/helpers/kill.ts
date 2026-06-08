import { isWindows } from '../../parsers/os.js';
import {
  killPID as killPIDService,
  setPortsAndPIDs,
} from '../../services/pid.js';
import { getPIDs } from './get-pids.js';

const killPID = async (PID: number | number[]) => {
  const PIDs = setPortsAndPIDs(PID);

  await Promise.all(
    PIDs.map(async (p) =>
      isWindows ? killPIDService.windows(p) : killPIDService.unix(p)
    )
  );
};

const killPIDs = async (PIDs: number[]) => {
  for (const PID of PIDs) {
    if (!PID) continue;

    await killPID(PID);
  }
};

const killPort = async (port: number | number[]) =>
  killPIDs(await getPIDs(port));

const killRange = async (startsAt: number, endsAt: number) =>
  killPIDs(await getPIDs.range(startsAt, endsAt));

/** Kill processes by PIDs, ports, and port ranges */
export const kill = {
  pid: killPID,
  port: killPort,
  range: killRange,
};
