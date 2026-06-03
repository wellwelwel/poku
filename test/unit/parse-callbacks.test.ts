import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { test } from '../../src/modules/helpers/test.js';
import { checkNoOnly, checkOnly } from '../../src/parsers/callback.js';

const cbWithOnly = {
  function: function cb() {
    describe.only(() => {});
  },
  function2: function cb() {
    it.only(() => {});
  },
  function3: function cb() {
    test.only(() => {});
  },
  anon: function () {
    describe.only(() => {});
  },
  anon2: function () {
    it.only(() => {});
  },
  anon3: function () {
    test.only(() => {});
  },
  arrow: () => {
    describe.only(() => {});
  },
  arrow2: () => {
    it.only(() => {});
  },
  arrow3: () => {
    test.only(() => {});
  },
};

const cbWithoutOnly = {
  function: function cb() {
    describe(() => {});
  },
  function2: function cb() {
    it(() => {});
  },
  function3: function cb() {
    test(() => {});
  },
  anon: function () {
    describe(() => {});
  },
  anon2: function () {
    it(() => {});
  },
  anon3: function () {
    test(() => {});
  },
  arrow: () => {
    describe(() => {});
  },
  arrow2: () => {
    it(() => {});
  },
  arrow3: () => {
    test(() => {});
  },
};

const cbFalsePositives = {
  stringIt: () => {
    const value = 'it.only';
    return value;
  },
  stringTest: () => {
    const value = 'test.only';
    return value;
  },
  stringDescribe: () => {
    const value = 'describe.only';
    return value;
  },
  prefixedIt: () => {
    const _it = { only: () => {} };
    _it.only();
  },
  prefixedTest: () => {
    const _test = { only: () => {} };
    _test.only();
  },
  prefixedDescribe: () => {
    const _describe = { only: () => {} };
    _describe.only();
  },
};

describe('Parse Callbacks: checkOnly (true)', () => {
  assert.strictEqual(checkOnly(undefined), false, 'No function');

  assert.strictEqual(
    checkOnly(cbWithOnly.function),
    true,
    'Classic Function: describe.only'
  );

  assert.strictEqual(
    checkOnly(cbWithOnly.function2),
    true,
    'Classic Function: it.only'
  );

  assert.strictEqual(
    checkOnly(cbWithOnly.function3),
    true,
    'Classic Function: test.only'
  );

  assert.strictEqual(
    checkOnly(cbWithOnly.anon),
    true,
    'Anonymous Function: describe.only'
  );

  assert.strictEqual(
    checkOnly(cbWithOnly.anon2),
    true,
    'Anonymous Function: it.only'
  );

  assert.strictEqual(
    checkOnly(cbWithOnly.anon3),
    true,
    'Anonymous Function: test.only'
  );

  assert.strictEqual(
    checkOnly(cbWithOnly.arrow),
    true,
    'Arrow Function: describe.only'
  );

  assert.strictEqual(
    checkOnly(cbWithOnly.arrow2),
    true,
    'Arrow Function: it.only'
  );

  assert.strictEqual(
    checkOnly(cbWithOnly.arrow3),
    true,
    'Arrow Function: test.only'
  );
});

describe('Parse Callbacks: checkOnly (false)', () => {
  assert.strictEqual(
    checkOnly(cbWithoutOnly.function),
    false,
    'Classic Function: describe.only'
  );

  assert.strictEqual(
    checkOnly(cbWithoutOnly.function2),
    false,
    'Classic Function: it.only'
  );

  assert.strictEqual(
    checkOnly(cbWithoutOnly.function3),
    false,
    'Classic Function: test.only'
  );

  assert.strictEqual(
    checkOnly(cbWithoutOnly.anon),
    false,
    'Anonymous Function: describe.only'
  );

  assert.strictEqual(
    checkOnly(cbWithoutOnly.anon2),
    false,
    'Anonymous Function: it.only'
  );

  assert.strictEqual(
    checkOnly(cbWithoutOnly.anon3),
    false,
    'Anonymous Function: test.only'
  );

  assert.strictEqual(
    checkOnly(cbWithoutOnly.arrow),
    false,
    'Arrow Function: describe.only'
  );

  assert.strictEqual(
    checkOnly(cbWithoutOnly.arrow2),
    false,
    'Arrow Function: it.only'
  );

  assert.strictEqual(
    checkOnly(cbWithoutOnly.arrow3),
    false,
    'Arrow Function: test.only'
  );
});

describe('Parse Callbacks: checkNoOnly (true)', () => {
  assert.strictEqual(checkNoOnly(undefined), false, 'No function');

  assert.strictEqual(
    checkNoOnly(cbWithoutOnly.function),
    true,
    'Classic Function: describe.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithoutOnly.function2),
    true,
    'Classic Function: it.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithoutOnly.function3),
    true,
    'Classic Function: test.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithoutOnly.anon),
    true,
    'Anonymous Function: describe.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithoutOnly.anon2),
    true,
    'Anonymous Function: it.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithoutOnly.anon3),
    true,
    'Anonymous Function: test.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithoutOnly.arrow),
    true,
    'Arrow Function: describe.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithoutOnly.arrow2),
    true,
    'Arrow Function: it.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithoutOnly.arrow3),
    true,
    'Arrow Function: test.only'
  );
});

describe('Parse Callbacks: checkNoOnly (false)', () => {
  assert.strictEqual(
    checkNoOnly(cbWithOnly.function),
    false,
    'Classic Function: describe.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithOnly.function2),
    false,
    'Classic Function: it.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithOnly.function3),
    false,
    'Classic Function: test.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithOnly.anon),
    false,
    'Anonymous Function: describe.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithOnly.anon2),
    false,
    'Anonymous Function: it.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithOnly.anon3),
    false,
    'Anonymous Function: test.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithOnly.arrow),
    false,
    'Arrow Function: describe.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithOnly.arrow2),
    false,
    'Arrow Function: it.only'
  );

  assert.strictEqual(
    checkNoOnly(cbWithOnly.arrow3),
    false,
    'Arrow Function: test.only'
  );
});

describe('Parse Callbacks: checkOnly (false positives)', () => {
  assert.strictEqual(
    checkOnly(cbFalsePositives.stringIt),
    false,
    "String literal: 'it.only'"
  );

  assert.strictEqual(
    checkOnly(cbFalsePositives.stringTest),
    false,
    "String literal: 'test.only'"
  );

  assert.strictEqual(
    checkOnly(cbFalsePositives.stringDescribe),
    false,
    "String literal: 'describe.only'"
  );

  assert.strictEqual(
    checkOnly(cbFalsePositives.prefixedIt),
    false,
    'Similar identifier: _it.only()'
  );

  assert.strictEqual(
    checkOnly(cbFalsePositives.prefixedTest),
    false,
    'Similar identifier: _test.only()'
  );

  assert.strictEqual(
    checkOnly(cbFalsePositives.prefixedDescribe),
    false,
    'Similar identifier: _describe.only()'
  );
});

describe('Parse Callbacks: checkNoOnly (false positives)', () => {
  assert.strictEqual(
    checkNoOnly(cbFalsePositives.stringIt),
    true,
    "String literal: 'it.only'"
  );

  assert.strictEqual(
    checkNoOnly(cbFalsePositives.stringTest),
    true,
    "String literal: 'test.only'"
  );

  assert.strictEqual(
    checkNoOnly(cbFalsePositives.stringDescribe),
    true,
    "String literal: 'describe.only'"
  );

  assert.strictEqual(
    checkNoOnly(cbFalsePositives.prefixedIt),
    true,
    'Similar identifier: _it.only()'
  );

  assert.strictEqual(
    checkNoOnly(cbFalsePositives.prefixedTest),
    true,
    'Similar identifier: _test.only()'
  );

  assert.strictEqual(
    checkNoOnly(cbFalsePositives.prefixedDescribe),
    true,
    'Similar identifier: _describe.only()'
  );
});
