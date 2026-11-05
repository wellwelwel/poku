import {
  afterEach,
  assert,
  beforeEach,
  describe,
  it,
  retry,
  test,
} from '../../../../src/modules/index.js';

let hookCalls = 0;

beforeEach(() => {
  hookCalls++;
});

afterEach(() => {
  hookCalls++;
});

describe('sync suite', () => {
  it('first', () => {
    assert.ok(true, 'first passes');
  });

  it('second', () => {
    it('nested', () => {
      assert.ok(true, 'nested passes');
    });
  });
});

await describe('async suite', async () => {
  it('fails', () => {
    assert.strictEqual(1, 2, 'failure');
  });

  await test('recovers', async () => {
    let attempt = 0;

    await retry(2, () => {
      attempt++;
      assert.strictEqual(attempt, 2, 'second attempt');
    });
  });

  it.skip('skipped', () => {});
  it.todo('pending');

  it(() => {
    assert.ok(true, 'untitled passes');
  });
});

assert.strictEqual(hookCalls, 12, 'hooks ran around every test');
