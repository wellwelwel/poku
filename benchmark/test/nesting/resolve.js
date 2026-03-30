export const resolve = (value) =>
  new Promise((r) => queueMicrotask(() => r(value)));
