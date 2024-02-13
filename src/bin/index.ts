#! /usr/bin/env node

import { getArg } from '../helpers/get-arg.js';
import { poku } from '../index.js';

const rawDirs = getArg('include');
const dirs = rawDirs?.split(',') || [];

poku(dirs);
