export type Control = {
  pause: () => void;
  continue: () => void;
  reset: () => void;
};

export type EachConfigs = {
  status: boolean;
  cb?: () => unknown | Promise<unknown>;
};

export type EachOptions = {
  immediate?: boolean;
};
