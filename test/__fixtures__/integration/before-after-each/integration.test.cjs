const fs = require('node:fs');
const path = require('node:path');

const jsonFilePath = path.resolve(
  'test/__fixtures__/.temp/external-file-update.json'
);

const data = fs.readFileSync(jsonFilePath, 'utf8');
const json = JSON.parse(data);

json.value += 1;

fs.writeFileSync(jsonFilePath, JSON.stringify(json));
