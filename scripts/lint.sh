#!/bin/bash

concurrently \
  -n "biome,prettier" \
  "biome lint --error-on-warnings" \
  "prettier --check ."
