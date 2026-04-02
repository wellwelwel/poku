#!/bin/bash

biome lint --write && \
  concurrently \
    -n "poku,website" \
    "prettier --write .github/workflows/*.yml ." \
    "npm --prefix website run lint:fix"
