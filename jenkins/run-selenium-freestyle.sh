#!/usr/bin/env bash
# Freestyle Jenkins job entrypoint — same flow as selenium-tests/Jenkinsfile
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:${PATH:-}"

ROOT="${WORKSPACE:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$ROOT"

cleanup() {
  bash "$ROOT/scripts/ci-stop-services.sh" || true
}
trap cleanup EXIT

echo "=== Start backend + frontend ==="
chmod +x scripts/*.sh
bash scripts/ci-start-services.sh

echo "=== Run Selenium tests ==="
cd "$ROOT/selenium-tests"
mvn clean test -Dheadless=true -DbaseUrl=http://localhost:3000

echo "=== All tests finished ==="
