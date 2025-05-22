#!/bin/bash

set -euo pipefail

shx rm -rf ./public/pagefind.gen ./src/pagefind.gen
shx cp -r ./pagefind-null ./src/pagefind.gen

NEXT_BUILD_MODE=prebuild npm run next-build

shx rm -rf ./public/pagefind.gen ./src/pagefind.gen
pagefind --site next-build/prebuild --output-path public/pagefind.gen
shx mkdir -p ./src/pagefind.gen
shx cp -r public/pagefind.gen/pagefind.js ./src/pagefind.gen/pagefind.js
