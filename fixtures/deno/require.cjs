// eslint-disable-next-line @typescript-eslint/no-var-requires
const asModule = require('./module.cjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { message: asExports } = require('./exports.cjs');

console.log(asModule);
console.log(asExports);
