import process from 'node:process';
import { GLOBAL } from '../../../../src/configs/poku.js';
import { assert } from '../../../../src/modules/essentials/assert.js';
import { test } from '../../../../src/modules/helpers/test.js';
import { runtimeVersion } from '../../../../src/parsers/runtime-version.js';

test('Defining Variables', () => {
  const noValue =
    GLOBAL.runtime === 'deno' && runtimeVersion >= 2 ? undefined : '';

  assert.strictEqual(process.env.HOST, '123.123.123.123', 'Basic');
  assert.strictEqual(process.env.USER0, undefined, 'Comented Line');
  assert.strictEqual(process.env.USER1, '#user', 'Using quoted #');
  assert.strictEqual(
    process.env.USER2,
    'support',
    'Comments after the variable'
  );
  assert.strictEqual(
    process.env.PASS1,
    "nmnm@!sdf&*#@'RBUY3efPZpsqufHdhgdfhU!Bi90q.Zm.b7.C-8fpOIUSH&%GN",
    'Complex string double quoted'
  );
  assert.strictEqual(
    process.env.PASS2,
    'nmnm@!sdf&*#@"RBUY3efPZpsqufHdhgdfhU!Bi90q.Zm.b7.C-8fpOIUSH&%GN',
    'Complex single double quoted'
  );
  assert.strictEqual(
    process.env.PASS3,
    'nmnm@!sdf*@RBUY3efPZpsqufHdhgdfhU!Bi90q.Zm.b7.C-8fpOIUSH%GN',
    'Complex string no quoted'
  );
  assert.strictEqual(process.env.PORT1, '8080', 'Using a number');
  assert.strictEqual(
    process.env.PORT2,
    noValue,
    'Valid env with full commented value'
  );
  assert.strictEqual(process.env.PORT3, noValue, 'Undefined local variable');
  assert.strictEqual(
    process.env.WHO_AM_I,
    "I'm Poku",
    'Resolved Env Variables'
  );
  assert.strictEqual(
    process.env.SPACED1,
    'yes',
    'Using space between env and value'
  );
  assert.strictEqual(
    process.env.SPACED2,
    'yes',
    'Using space between env and value with double quotes'
  );
  assert.strictEqual(
    process.env.SPACED3,
    'yes',
    'Using space between env and value with single quotes'
  );
  assert.strictEqual(
    process.env.NO_VALUE1,
    undefined,
    'Undefined value (invalid)'
  );
  assert.strictEqual(process.env.NO_VALUE2, noValue, 'No value (valid)');
  assert.strictEqual(
    process.env.NO_VALUE3,
    noValue,
    'No value (valid with spaces)'
  );
});
