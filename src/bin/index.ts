#! /usr/bin/env node

import { escapeRegExp } from '../modules/get-files.js';
import { getArg } from '../helpers/get-arg.js';
import { poku } from '../index.js';

const rawDirs = getArg('include');
const rawFilter = getArg('filter');

const dirs = rawDirs?.split(',') || [];

poku(dirs, {
  filter: rawFilter ? new RegExp(escapeRegExp(rawFilter)) : undefined,
});
