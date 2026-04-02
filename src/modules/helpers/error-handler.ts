import process from 'node:process';

type ErrorHandler = (error: unknown) => void;

const handlerStack: ErrorHandler[] = [];

const globalHandler = (error: unknown): void => {
  const handler = handlerStack[handlerStack.length - 1];
  if (handler) handler(error);
};

process.on('uncaughtException', globalHandler);
process.on('unhandledRejection', globalHandler);

export const pushErrorHandler = (handler: ErrorHandler): void => {
  handlerStack.push(handler);
};

export const popErrorHandler = (): void => {
  handlerStack.pop();
};

export const currentErrorHandler = (): ErrorHandler | undefined =>
  handlerStack[handlerStack.length - 1];
