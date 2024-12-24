import { isWindows } from '../../parsers/os.js';
import {
  getPIDs as getPIDsService,
  populateRange,
  setPortsAndPIDs,
} from '../../services/pid.js';

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

/** Returns an array containing the ID of all processes listening to the specified port */
export const getPIDs = Object.assign(getPIDsByPorts, {
  /** Returns an array containing the ID of all processes listening to the specified port range */
  range: getPIDsByRange,
});
