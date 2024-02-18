#! /usr/bin/env node

import { escapeRegExp } from '../modules/list-files.js';
import { getArg, getLastParam, hasArg } from '../helpers/get-arg.js';
import { poku } from '../index.js';
import { platformIsValid } from '../helpers/get-runtime.js';

const dirs =
  (hasArg('include')
    ? getArg('include')?.split(',')
    : getLastParam()?.split(',')) || [];
const platform = getArg('platform');
const filter = getArg('filter');
const parallel = hasArg('parallel');
const exclude = getArg('exclude');

poku(dirs, {
  platform: platformIsValid(platform) ? platform : undefined,
  filter: filter ? new RegExp(escapeRegExp(filter)) : undefined,
  exclude: exclude ? new RegExp(escapeRegExp(exclude)) : undefined,
  parallel,
});
