#!/bin/sh
# shellcheck disable=SC1091
. "$(dirname "$0")/_/husky.sh"

cd "$(dirname "$0")" || exit

yarn lint-staged
