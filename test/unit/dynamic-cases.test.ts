import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { toDynamicCase } from '../../src/parsers/to-dynamic-case.js';

describe('Dynamic Flag Cases', () => {
  it('General', () => {
    assert.strictEqual(toDynamicCase('-d'), '-d', 'Short Flag (lower)');
    assert.strictEqual(toDynamicCase('-D'), '-D', 'Short Flag (upper)');
    assert.strictEqual(toDynamicCase('--debug'), '--debug', 'Single Word');
  });

  it('Kebab Case', () => {
    assert.strictEqual(toDynamicCase('--fast-fail'), '--fastfail', 'Two Words');
    assert.strictEqual(
      toDynamicCase('--fast-fail-test'),
      '--fastfailtest',
      'Multiple Words'
    );
    assert.strictEqual(
      toDynamicCase('--fast-fail=test'),
      '--fastfail=test',
      'Arg'
    );
    assert.strictEqual(
      toDynamicCase('--fast-fail=test-Test'),
      '--fastfail=test-Test',
      'Kebab Arg'
    );
    assert.strictEqual(
      toDynamicCase('--fast-fail="test-Test=test-Test"'),
      '--fastfail="test-Test=test-Test"',
      'Deep Args'
    );
  });

  it('Camel Case', () => {
    assert.strictEqual(toDynamicCase('--fastFail'), '--fastfail', 'Two Words');
    assert.strictEqual(
      toDynamicCase('--fastFailTest'),
      '--fastfailtest',
      'Multiple Words'
    );
    assert.strictEqual(
      toDynamicCase('--fastFail=test'),
      '--fastfail=test',
      'Arg'
    );
    assert.strictEqual(
      toDynamicCase('--fastFail=testTest'),
      '--fastfail=testTest',
      'Camel Arg'
    );
    assert.strictEqual(
      toDynamicCase('--fastFail="testTest=testTest"'),
      '--fastfail="testTest=testTest"',
      'Deep Args'
    );
  });
});
