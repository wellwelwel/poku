const fs = require('node:fs');
const path = require('node:path');

const jsonFilePath = path.resolve('./test-before-and-after-each.json');

const data = fs.readFileSync(jsonFilePath, 'utf-8');
const json = JSON.parse(data);

json.value += 1;

fs.writeFileSync(jsonFilePath, JSON.stringify(json));
