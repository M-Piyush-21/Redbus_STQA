#!/usr/bin/env bash
set -euo pipefail
API_URL="${JMETER_API_URL:-http://localhost:3020/v1/api/routes}"

if curl -sf --max-time 5 "$API_URL" > /dev/null; then
  echo "Backend OK: $API_URL"
  exit 0
fi

echo "ERROR: Backend is not reachable at $API_URL"
echo "Start it first:"
echo "  cd back-end-redbus && npm start"
exit 1
