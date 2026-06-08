import type {
  AsyncDescribeCb,
  Describe,
  DescribeCb,
} from '../../@types/describe.js';
import type { It } from '../../@types/it.js';
import type {
  DescribeModifier,
  Modifier,
  Todo,
} from '../../@types/modifiers.js';
import type { AsyncTestCb, TestCb } from '../../@types/poku.js';
import { exit } from 'node:process';
import { GLOBAL } from '../../configs/poku.js';
import { checkNoOnly } from '../../parsers/callback.js';
import { hasOnly } from '../../parsers/get-arg.js';
import { format } from '../../services/format.js';
import { log } from '../../services/write.js';

export const todo = (async (
  messageOrCb: string | TestCb | AsyncTestCb,
  _cb?: TestCb | AsyncTestCb
) => {
  const message = typeof messageOrCb === 'string' ? messageOrCb : 'Planning';

  GLOBAL.reporter.onTodoModifier({ message });
}) as Todo;

export const skip = (async (
  messageOrCb: string | TestCb | AsyncTestCb,
  _cb?: TestCb | AsyncTestCb
) => {
  const message = typeof messageOrCb === 'string' ? messageOrCb : 'Skipping';

  GLOBAL.reporter.onSkipModifier({ message });
}) as Modifier;

const assertOnlyEnabled = (message: string) => {
  if (hasOnly) return;

  log(format(message).fail());
  exit(1);
};

export const createOnlyDescribe = (describeBase: Describe): DescribeModifier =>
  (async (
    messageOrCb: string | DescribeCb | AsyncDescribeCb,
    cb?: DescribeCb | AsyncDescribeCb
  ) => {
    assertOnlyEnabled("Can't run `describe.only` tests without `--only` flag");

    const noItOnly = checkNoOnly(
      typeof messageOrCb === 'function' ? messageOrCb : cb
    );

    if (noItOnly) GLOBAL.runAsOnly = true;

    if (typeof messageOrCb === 'string' && cb)
      return describeBase(messageOrCb, cb);
    if (typeof messageOrCb === 'function') return describeBase(messageOrCb);
  }) as DescribeModifier;

export const createOnlyIt = (itBase: It): Modifier =>
  (async (
    messageOrCb: string | TestCb | AsyncTestCb,
    cb?: TestCb | AsyncTestCb
  ) => {
    assertOnlyEnabled(
      "Can't run `it.only` and `test.only` tests without `--only` flag"
    );

    if (typeof messageOrCb === 'string' && cb) return itBase(messageOrCb, cb);
    if (typeof messageOrCb === 'function') return itBase(messageOrCb);
  }) as Modifier;
