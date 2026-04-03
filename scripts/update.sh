#!/bin/bash

set -e

echo '◯ update'
pu && npm i && npm update && (npm audit fix || true)
echo '◉ update'
