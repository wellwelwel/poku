#! /usr/bin/env node

import { escapeRegExp } from '../modules/list-files.js';
import { getArg, hasArg } from '../helpers/get-arg.js';
import { poku } from '../index.js';

const dirs = getArg('include')?.split(',') || [];
const filter = getArg('filter');
const parallel = hasArg('parallel');
const exclude = getArg('exclude');

poku(dirs, {
  filter: filter ? new RegExp(escapeRegExp(filter)) : undefined,
  exclude: exclude ? new RegExp(escapeRegExp(exclude)) : undefined,
  parallel,
});
