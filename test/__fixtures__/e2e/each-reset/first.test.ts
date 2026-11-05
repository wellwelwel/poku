import {
  afterEach,
  assert,
  beforeEach,
  it,
} from '../../../../src/modules/index.js';

const callsKey = Symbol.for('@pokujs/poku.test.each-reset');
const readCalls = () => Number(Reflect.get(globalThis, callsKey) ?? 0);
const countCall = () => {
  Reflect.set(globalThis, callsKey, readCalls() + 1);
};

const initialCalls = readCalls();

it('runs before this file registers hooks', () => {});

assert.strictEqual(
  readCalls(),
  initialCalls,
  'hooks from a previous file do not run'
);

beforeEach(countCall);
afterEach(countCall);

it('runs with the hooks of this file', () => {});

assert.strictEqual(
  readCalls(),
  initialCalls + 2,
  'hooks of this file run once each'
);
