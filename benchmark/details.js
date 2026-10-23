import { readFile } from 'node:fs/promises';
import { formatBenchmarkDetails } from './results.js';

const source = process.argv[2];
const input = JSON.parse(await readFile(source, 'utf8'));
process.stdout.write(`${formatBenchmarkDetails(input, source)}\n`);
