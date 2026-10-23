export type AssertionCaptureContext = {
  bind: <Receiver, Arguments extends unknown[], Result>(
    callback: (this: Receiver, ...args: Arguments) => Result
  ) => (this: Receiver, ...args: Arguments) => Result;
};

export type AssertionCaptureResult<Value> = (
  | { status: 'passed'; value: Value }
  | { status: 'failed'; error: unknown }
) & { report: () => void };

export type AssertionCaptureState = {
  parent: AssertionCaptureState | undefined;
  closed: boolean;
  failed: boolean;
  error: unknown;
  reports: Array<() => void>;
};
