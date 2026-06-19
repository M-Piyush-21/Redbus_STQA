#!/usr/bin/env bash
# Fix "RedBus - Selenium Jenkins" job: Pipeline + master branch + Jenkinsfile
set -euo pipefail

JENKINS_HOME="${JENKINS_HOME:-$HOME/.jenkins}"
JOB_DIR="$JENKINS_HOME/jobs/RedBus - Selenium Jenkins"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [[ ! -d "$JENKINS_HOME" ]]; then
  echo "Jenkins home not found: $JENKINS_HOME"
  exit 1
fi

mkdir -p "$JOB_DIR"
cp "$ROOT/jenkins/jobs/redbus-selenium-pipeline.xml" "$JOB_DIR/config.xml"

echo "Fixed job config at: $JOB_DIR/config.xml"
echo "  - Job type: Pipeline (not Freestyle)"
echo "  - Branch: */master"
echo "  - Script: selenium-tests/Jenkinsfile"
echo ""
echo "Restart Jenkins, then Build Now:"
echo "  brew services restart jenkins-lts"
