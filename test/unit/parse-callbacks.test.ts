import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { test } from '../../src/modules/helpers/test.js';
import { CheckNoOnly, checkOnly } from '../../src/parsers/callback.js';

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

describe('Parse Callbacks: checkOnly — true', () => {
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

describe('Parse Callbacks: checkOnly — false', () => {
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

describe('Parse Callbacks: CheckNoOnly — true', () => {
  assert.strictEqual(CheckNoOnly(undefined), false, 'No function');

  assert.strictEqual(
    CheckNoOnly(cbWithoutOnly.function),
    true,
    'Classic Function: describe.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithoutOnly.function2),
    true,
    'Classic Function: it.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithoutOnly.function3),
    true,
    'Classic Function: test.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithoutOnly.anon),
    true,
    'Anonymous Function: describe.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithoutOnly.anon2),
    true,
    'Anonymous Function: it.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithoutOnly.anon3),
    true,
    'Anonymous Function: test.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithoutOnly.arrow),
    true,
    'Arrow Function: describe.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithoutOnly.arrow2),
    true,
    'Arrow Function: it.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithoutOnly.arrow3),
    true,
    'Arrow Function: test.only'
  );
});

describe('Parse Callbacks: CheckNoOnly — false', () => {
  assert.strictEqual(
    CheckNoOnly(cbWithOnly.function),
    false,
    'Classic Function: describe.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithOnly.function2),
    false,
    'Classic Function: it.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithOnly.function3),
    false,
    'Classic Function: test.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithOnly.anon),
    false,
    'Anonymous Function: describe.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithOnly.anon2),
    false,
    'Anonymous Function: it.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithOnly.anon3),
    false,
    'Anonymous Function: test.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithOnly.arrow),
    false,
    'Arrow Function: describe.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithOnly.arrow2),
    false,
    'Arrow Function: it.only'
  );

  assert.strictEqual(
    CheckNoOnly(cbWithOnly.arrow3),
    false,
    'Arrow Function: test.only'
  );
});
