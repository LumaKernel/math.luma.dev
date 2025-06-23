#!/bin/bash

set -euo pipefail

shx rm -rf ./public/pagefind.gen ./src/pagefind.gen
shx cp -r ./pagefind-null ./src/pagefind.gen

npm run next-prebuild

shx rm -rf ./public/pagefind.gen ./src/pagefind.gen
pagefind --site next-build/prebuild/server/app --output-path public/pagefind.gen
shx mkdir -p ./src/pagefind.gen
shx cp -r public/pagefind.gen/pagefind.js ./src/pagefind.gen/pagefind.js
shx cp -r pagefind-null/pagefind-d.d.ts ./src/pagefind.gen/pagefind.d.ts
