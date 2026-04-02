#!/bin/bash

set -e

echo '◯ update'
pu && npm i && npm update && (npm audit fix || true)
echo '◉ update'

echo '◯ postupdate'
npm run lint:fix
echo '◉ postupdate'
