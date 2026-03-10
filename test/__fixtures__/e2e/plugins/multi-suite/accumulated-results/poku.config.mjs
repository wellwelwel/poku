import { multiSuite } from '../../../../../../src/plugins/multi-suite/index.js';

export default {
  plugins: [multiSuite([{ include: 'suite-a' }, { include: 'suite-b' }])],
};
