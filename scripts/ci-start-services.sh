#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

echo "Starting backend..."
cd "$ROOT/back-end-redbus"
npm install --silent
nohup npm start > /tmp/redbus-backend.log 2>&1 &
echo $! > /tmp/redbus-backend.pid

echo "Starting frontend..."
cd "$ROOT/front-end-redbus"
npm install --silent
BROWSER=none CI=true PORT=3000 nohup npm start > /tmp/redbus-frontend.log 2>&1 &
echo $! > /tmp/redbus-frontend.pid

bash "$ROOT/scripts/ci-wait-for-url.sh" "http://localhost:3020/v1/api/routes" 120
bash "$ROOT/scripts/ci-wait-for-url.sh" "http://localhost:3000" 120
sleep 5
echo "App services are up."
