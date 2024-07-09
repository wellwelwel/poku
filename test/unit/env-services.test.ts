import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { assert } from '../../src/modules/essentials/assert.js';
import {
  removeComments,
  parseEnvLine,
  resolveEnvVariables,
} from '../../src/services/env.js';

describe('removeComments', () => {
  it('should remove comments outside of quotes', () => {
    assert.strictEqual(removeComments('value # this is a comment'), 'value');
    assert.strictEqual(
      removeComments('"value" # this is a comment'),
      '"value"'
    );
    assert.strictEqual(
      removeComments('value "quoted # not a comment" # this is a comment'),
      'value "quoted # not a comment"'
    );
    assert.strictEqual(
      removeComments("value 'quoted # not a comment' # this is a comment"),
      "value 'quoted # not a comment'"
    );
  });

  it('should handle empty input', () => {
    assert.strictEqual(removeComments(''), '');
  });

  it('should handle input without comments', () => {
    assert.strictEqual(removeComments('value'), 'value');
  });

  it('should handle escaped quotes', () => {
    assert.strictEqual(
      removeComments(
        '"value with an escaped quote \\" still inside" # comment'
      ),
      '"value with an escaped quote \\" still inside"'
    );
    assert.strictEqual(
      removeComments(
        "'value with an escaped quote \\' still inside' # comment"
      ),
      "'value with an escaped quote \\' still inside'"
    );
  });

  it('should remove comments after variable declaration', () => {
    assert.strictEqual(removeComments('MY_ENV=SOME #test'), 'MY_ENV=SOME');
  });
});

describe('parseEnvLine', () => {
  it('should parse a valid env line', () => {
    assert.deepStrictEqual(parseEnvLine('KEY=value'), {
      arg: 'KEY',
      value: 'value',
    });
    assert.deepStrictEqual(parseEnvLine('KEY="value"'), {
      arg: 'KEY',
      value: 'value',
    });
    assert.deepStrictEqual(parseEnvLine("KEY='value'"), {
      arg: 'KEY',
      value: 'value',
    });
  });

  it('should return null for invalid env line', () => {
    assert.strictEqual(parseEnvLine('invalidline'), null);
    assert.strictEqual(parseEnvLine('KEY'), null);
  });

  it('should handle spaces around the equal sign', () => {
    assert.deepStrictEqual(parseEnvLine('KEY = value'), {
      arg: 'KEY',
      value: 'value',
    });
    assert.deepStrictEqual(parseEnvLine('  KEY=value  '), {
      arg: 'KEY',
      value: 'value',
    });
  });
});

describe('resolveEnvVariables', () => {
  it('should resolve environment variables', () => {
    const env = { MY_VAR: 'resolvedValue' };
    assert.strictEqual(
      resolveEnvVariables('value is ${MY_VAR}', env),
      'value is resolvedValue'
    );
    assert.strictEqual(
      resolveEnvVariables('${MY_VAR} is set', env),
      'resolvedValue is set'
    );
  });

  it('should handle missing environment variables', () => {
    const env = { MY_VAR: 'resolvedValue' };
    assert.strictEqual(
      resolveEnvVariables('value is ${UNKNOWN_VAR}', env),
      'value is '
    );
    assert.strictEqual(
      resolveEnvVariables('${UNKNOWN_VAR} is set', env),
      ' is set'
    );
  });

  it('should handle input without environment variables', () => {
    const env = { MY_VAR: 'resolvedValue' };
    assert.strictEqual(
      resolveEnvVariables('no variables here', env),
      'no variables here'
    );
  });
});
