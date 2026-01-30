import type { ImportMember } from '../../../@types/shared-resources.js';

export const sort = (members: ImportMember[]) => {
  const order = {
    named: 0,
    namespace: 1,
    default: 2,
  };

  return members.sort((a, b) => order[a.type] - order[b.type]);
};
