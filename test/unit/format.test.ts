import { assert } from '../../src/modules/assert.js';
import { test } from '../../src/modules/test.js';
import { format, getLargestStringLength } from '../../src/helpers/format.js';

test('Format', () => {
  assert.strictEqual(
    `${format('').counter(3, 100)}`,
    '003\u001b[0m',
    'counter'
  );

  assert.strictEqual(
    `${format('dim text').dim()}`,
    '\x1b[2mdim text\x1b[0m',
    'dim'
  );

  assert.strictEqual(
    `${format('bold text').bold()}`,
    '\x1b[1mbold text\x1b[0m',
    'bold'
  );

  assert.strictEqual(
    `${format('underline text').underline()}`,
    '\x1b[4munderline text\x1b[0m',
    'underline'
  );

  assert.strictEqual(
    `${format('info text').info()}`,
    '\x1b[94minfo text\x1b[0m',
    'info'
  );

  assert.strictEqual(
    `${format('italic text').italic()}`,
    '\x1b[3mitalic text\x1b[0m',
    'italic'
  );

  assert.strictEqual(
    `${format('success text').success()}`,
    '\x1b[32msuccess text\x1b[0m',
    'success'
  );

  assert.strictEqual(
    `${format('gray text').gray()}`,
    '\x1b[90mgray text\x1b[0m',
    'gray'
  );

  assert.strictEqual(
    `${format('fail text').fail()}`,
    '\x1b[91mfail text\x1b[0m',
    'fail'
  );

  assert.strictEqual(
    `${format(' bg text ').bg('red')}`,
    '\x1b[41m\x1b[1m bg text \x1b[0m',
    'bg'
  );

  assert.strictEqual(
    `${format('combined text').bold().underline().dim()}`,
    '\u001b[1m\u001b[4m\u001b[2mcombined text\u001b[0m',
    'chainable'
  );
});

test('Format: Get the largest string length', () => {
  assert.strictEqual(getLargestStringLength([]), 0, 'Empty array');

  assert.strictEqual(getLargestStringLength(['']), 0, 'Empty String');

  assert.strictEqual(getLargestStringLength(['a']), 1, 'One array item');

  assert.strictEqual(
    getLargestStringLength(['short', 'longer', 'longest']),
    7,
    'Should return the length of the longest string'
  );

  assert.strictEqual(
    getLargestStringLength(['short', 'longer', 'longest']),
    7,
    'Should return the length of the longest string'
  );

  assert.strictEqual(
    getLargestStringLength(['short', 'longer', 'longest'].reverse()),
    7,
    'Should return the length of the longest string (reverse)'
  );

  assert.strictEqual(
    getLargestStringLength(['same', 'same']),
    4,
    'Should return the length of the longest string (same size)'
  );
});
