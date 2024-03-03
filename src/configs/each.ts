export type Control = {
  pause: () => void;
  continue: () => void;
  reset: () => void;
};

export type EachConfigs = {
  status: boolean;
  cb?: () => unknown | Promise<unknown>;
};

export const each: {
  before: EachConfigs;
  after: EachConfigs;
} = {
  before: {
    status: true,
    cb: undefined,
  },
  after: {
    status: true,
    cb: undefined,
  },
};
