#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
"$(dirname "$0")/check-backend.sh"
echo "Opening JMeter GUI — click the green Start button, then open 'View Results Tree'."
exec jmeter -t redbus-api-load-test.jmx "$@"
