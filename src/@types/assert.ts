export type ParseAssertionOptions = {
  message?: string | Error;
  defaultMessage?: string;
  actual?: string;
  expected?: string;
  throw?: boolean;
  hideDiff?: boolean;
};
