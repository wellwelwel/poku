#! /usr/bin/env node

import { escapeRegExp } from '../modules/list-files.js';
import { getArg, getLastParam, hasArg } from '../helpers/get-arg.js';
import { poku } from '../index.js';
import { platformIsValid } from '../helpers/get-runtime.js';
import { format } from '../helpers/format.js';

/* c8 ignore start */
const dirs =
  (hasArg('include')
    ? getArg('include')?.split(',')
    : getLastParam()?.split(',')) || [];
const platform = getArg('platform');
const filter = getArg('filter');
const exclude = getArg('exclude');
const parallel = hasArg('parallel');
const quiet = hasArg('quiet');
const debug = hasArg('debug');

if (hasArg('log-success'))
  console.log(
    `The flag ${format.bold('--log-success')} is deprecated. Use ${format.bold('--debug')} instead.`
  );
/* c8 ignore stop */

poku(dirs, {
  platform: platformIsValid(platform) ? platform : undefined,
  filter: filter ? new RegExp(escapeRegExp(filter)) : undefined,
  exclude: exclude ? new RegExp(escapeRegExp(exclude)) : undefined,
  parallel,
  quiet,
  debug,
});
