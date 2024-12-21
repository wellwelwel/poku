import { exit } from 'node:process';
import { skip } from '../../../../src/modules/helpers/skip.js';
import { GLOBAL } from '../../../../src/configs/poku.js';

// Mock
GLOBAL.isPoku = false;

skip('Testing');
exit(1);
