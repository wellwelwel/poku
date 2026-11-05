const receivedPrefix = 'reporter received ';

export const receivedEvents = (stdout: string): string[] =>
  stdout
    .split(/\r?\n/)
    .filter((line) => line.startsWith(receivedPrefix))
    .map((line) => line.slice(receivedPrefix.length));
