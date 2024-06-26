/* c8 ignore start */
import { isWindows } from '../helpers/runner.js';
import {
  getPIDs as getPIDsService,
  killPID as killPIDService,
  populateRange,
  setPortsAndPIDs,
} from '../services/pid.js';

const getPIDsByPorts = async (port: number | number[]): Promise<number[]> => {
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

const getPIDsByRange = async (
  startsAt: number,
  endsAt: number
): Promise<number[]> => {
  const ports = populateRange(startsAt, endsAt);

  return await getPIDs(ports);
};

/**
 * Returns an array containing the ID of all processes listening to the specified port
 */
export const getPIDs = Object.assign(getPIDsByPorts, {
  /**
   * Returns an array containing the ID of all processes listening to the specified range port
   */
  range: getPIDsByRange,
});

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
    if (!PID) {
      continue;
    }

    await killPID(PID);
  }
};

const killRange = async (startsAt: number, endsAt: number): Promise<void> => {
  const PIDs = await getPIDs.range(startsAt, endsAt);

  for (const PID of PIDs) {
    if (!PID) {
      continue;
    }

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
  /**
   * Terminates all processes listening on the specified range ports
   */
  range: killRange,
};
/* c8 ignore stop */
