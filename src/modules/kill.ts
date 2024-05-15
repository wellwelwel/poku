/* c8 ignore start */

import { isWindows } from '../helpers/runner.js';
import { findPID, killPID as killPIDService } from '../services/pid.js';

const killPID = async (PID: number) => {
  isWindows
    ? await killPIDService.windows(PID)
    : await killPIDService.unix(PID);
};

const killPort = async (port: number) => {
  const PIDs = isWindows
    ? await findPID.windows(port)
    : await findPID.unix(port);

  for (const PID of PIDs) {
    if (!PID) continue;

    await killPID(PID);
  }
};

export const kill = {
  pid: killPID,
  port: killPort,
};

/* c8 ignore stop */
