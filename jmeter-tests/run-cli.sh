#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
"$(dirname "$0")/check-backend.sh"
rm -f results.jtl
exec jmeter -n -t redbus-api-load-test.jmx -l results.jtl -e -o html-report "$@"
