import { poku } from '../../../../src/modules/essentials/poku.js';

process.exitCode = 1;

const extension = process.env.NODE_ENV === 'build' ? 'js' : 'ts';
const code = await poku(`pass.test.${extension}`, {
  noExit: true,
  isolation: 'none',
  quiet: true,
});

console.log(`nested suite exit code: ${code}`);
console.log(`preserved exit code: ${process.exitCode}`);
