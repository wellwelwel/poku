/* c8 ignore start */

import { isWindows } from '../helpers/runner.js';
import {
  getPIDs as getPIDsService,
  killPID as killPIDService,
} from '../services/pid.js';

/**
 * Returns an array containing the ID of all processes listening to the specified port
 */
export const getPIDs = async (port: number): Promise<number[]> => {
  const sanitizedPort = Number(port);

  if (isNaN(sanitizedPort)) return [];

  return await (isWindows
    ? getPIDsService.windows(sanitizedPort)
    : getPIDsService.unix(sanitizedPort));
};

const killPID = async (PID: number): Promise<void> => {
  const sanitizedPID = Number(PID);

  if (isNaN(sanitizedPID)) return;

  isWindows
    ? await killPIDService.windows(sanitizedPID)
    : await killPIDService.unix(sanitizedPID);
};

const killPort = async (port: number): Promise<void> => {
  const sanitizedPort = Number(port);

  if (isNaN(sanitizedPort)) return;

  const PIDs = await getPIDs(sanitizedPort);

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
