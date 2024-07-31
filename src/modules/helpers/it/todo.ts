import { Write } from '../../../services/write.js';
import { indentation } from '../../../configs/indentation.js';
import { format } from '../../../services/format.js';

export const todo = (message: string, _cb?: () => unknown) => {
  Write.log(
    `${indentation.hasDescribe ? '  ' : ''}${format(`● ${message}`).cyan().bold()}`
  );
};
