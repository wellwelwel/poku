/* c8 ignore start */

import { isWindows } from '../helpers/runner.js';
import {
  getPIDs as getPIDsService,
  killPID as killPIDService,
  setPortsAndPIDs,
} from '../services/pid.js';

/**
 * Returns an array containing the ID of all processes listening to the specified port
 */
export const getPIDs = async (port: number | number[]): Promise<number[]> => {
  const ports = setPortsAndPIDs(port);
  const PIDs: number[] = [];

  await Promise.all(
    ports.map(async (p) => {
      PIDs.push(
        ...(await (isWindows
          ? getPIDsService.windows(p)
          : getPIDsService.unix(p)))
      );
    })
  );

  return PIDs;
};

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

const killPort = async (port: number | number[]): Promise<void> => {
  const PIDs = await getPIDs(port);

  for (const PID of PIDs) {
    if (!PID) continue;

    await killPID(PID);
  }
};

export const kill = {
  /**
   * Terminates the specified process ID
   */
  pid: killPID,
  /**
   * Terminates all processes listening on the specified port
   */
  port: killPort,
};

/* c8 ignore stop */
