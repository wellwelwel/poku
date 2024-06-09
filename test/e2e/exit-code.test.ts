import { describe } from '../../src/modules/describe.js';
import { test } from '../../src/modules/test.js';
import { poku } from '../../src/modules/poku.js';
import { assert } from '../../src/modules/assert.js';

describe('Poku Runner Suite', { icon: '🐷' });

test(async () => {
  const code = await poku(['./fixtures/success', 'fixtures/fail'], {
    noExit: true,
    quiet: true,
  });

  assert.deepStrictEqual(code, 1, 'Testing all paths as a string array');
});

test(async () => {
  const code = await poku('./fixtures/fail', {
    noExit: true,
    quiet: true,
  });

  assert.deepStrictEqual(code, 1, 'Testing a fail path as string');
});

test(async () => {
  const code = await poku('./fixtures/success', {
    noExit: true,
    quiet: true,
  });

  assert.deepStrictEqual(code, 0, 'Testing a success path as string');
});

test(async () => {
  const code = await poku(['./fixtures/success'], {
    noExit: true,
    quiet: true,
  });

  assert.deepStrictEqual(code, 0);
});

test(async () => {
  const code = await poku(['./fixtures/success', 'fixtures/fail'], {
    noExit: true,
    filter: /success/,
    quiet: true,
  });

  assert.deepStrictEqual(code, 0, 'Filter paths that contains "success"');
});

test(async () => {
  const code = await poku(['./fixtures/success', 'fixtures/fail'], {
    noExit: true,
    filter: /fail/,
    quiet: true,
  });

  assert.deepStrictEqual(code, 1, 'Filter paths that contains "fail"');
});

test(async () => {
  const code = await poku(['fixtures/fail'], {
    noExit: true,
    filter: /success/,
    quiet: true,
  });

  assert.deepStrictEqual(code, 0, 'No files (success filter)');
});

test(async () => {
  const code = await poku(['./fixtures/success', 'fixtures/fail'], {
    noExit: true,
    filter: /\.(m)?(j|t)?s$/,
    quiet: true,
  });

  assert.deepStrictEqual(code, 1, 'Filter by extension');
});
