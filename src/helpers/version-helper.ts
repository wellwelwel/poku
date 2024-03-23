import process from 'node:process';

const getVersionNumber = () => {
  const versionMatch = process.version.match(/^v(\d+)/);
  return versionMatch ? parseInt(versionMatch[1], 10) : 0;
};

const version = getVersionNumber();

export const isNode12OrHigher = () => version >= 12;
export const isNode14OrHigher = () => version >= 14;

export const supportsESM = () => isNode14OrHigher();
