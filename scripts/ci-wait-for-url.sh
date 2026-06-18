#!/bin/bash
URL=$1
MAX=${2:-120}
for i in $(seq 1 "$MAX"); do
  if curl -sf "$URL" > /dev/null 2>&1; then
    echo "Ready: $URL"
    exit 0
  fi
  sleep 2
done
echo "Timeout waiting for $URL"
exit 1
