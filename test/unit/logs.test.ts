import process from 'node:process';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { isQuiet, isDebug, parserOutput } from '../../src/parsers/output.js';
import { Write } from '../../src/services/write.js';

describe('Helper functions in logs.js', () => {
  it('should return true if configs.quiet is true', () => {
    const configs = { quiet: true };
    const result = isQuiet(configs);
    assert.strictEqual(result, true, 'isQuiet should return true');
  });

  it('should return false if configs.quiet is false', () => {
    const configs = { quiet: false };
    const result = isQuiet(configs);
    assert.strictEqual(result, false, 'isQuiet should return false');
  });

  it('should return false if configs.quiet is undefined', () => {
    const configs = {};
    const result = isQuiet(configs);
    assert.strictEqual(result, false, 'isQuiet should return false');
  });
});

describe('Helper functions in logs.js', () => {
  it('should return true if configs.debug is true', () => {
    const configs = { debug: true };
    const result = isDebug(configs);
    assert.strictEqual(result, true, 'isDebug should return true');
  });

  it('should return false if configs.debug is false', () => {
    const configs = { debug: false };
    const result = isDebug(configs);
    assert.strictEqual(result, false, 'isDebug should return false');
  });

  it('should return false if configs.debug is undefined', () => {
    const configs = {};
    const result = isDebug(configs);
    assert.strictEqual(result, false, 'isDebug should return false');
  });
});

describe('Helper functions in logs.js', () => {
  it('should write data to stdout', () => {
    let capturedOutput = '';
    const originalWrite = process.stdout.write;
    process.stdout.write = (data: string) => {
      capturedOutput += data;
      return true;
    };

    Write.log('Test message');
    assert.strictEqual(
      capturedOutput,
      'Test message\n',
      'write should output the message to stdout with a newline'
    );

    process.stdout.write = originalWrite;
  });
});

describe('Helper functions in logs.js', () => {
  it('should print output correctly with debug on', () => {
    const options = {
      output: 'Line1\nLine2\nLine3',
      result: true,
      configs: { debug: true },
    };

    const capturedOutput = parserOutput(options);

    assert.strictEqual(
      JSON.stringify(capturedOutput),
      JSON.stringify(['    Line1', '    Line2', '    Line3']),
      'parserOutput should print all lines with padding'
    );
  });

  it('should filter and print output correctly with debug off', () => {
    const options = {
      output: 'Line1\n\x1b[0mLine2\x1b[0m\nExited with code',
      result: true,
      configs: { debug: false },
    };
    const capturedOutput = parserOutput(options);
    assert.strictEqual(
      JSON.stringify(capturedOutput),
      JSON.stringify(['    \x1b[0mLine2\x1b[0m']),
      'parserOutput should filter lines correctly and print with padding'
    );
  });

  it('should return early if outputs length is 0', () => {
    const options = {
      output: '',
      result: true,
      configs: { debug: false },
    };
    const capturedOutput = parserOutput(options);
    assert.strictEqual(
      capturedOutput,
      undefined,
      'parserOutput should not print anything if outputs length is 0'
    );
  });
});
