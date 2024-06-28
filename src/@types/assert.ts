export type ProcessAssertionOptions = {
  message?: string | Error;
  defaultMessage?: string;
  actual?: string;
  expected?: string;
  throw?: boolean;
  hideDiff?: boolean;
};
