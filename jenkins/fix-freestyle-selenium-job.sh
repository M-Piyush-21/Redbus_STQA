#!/usr/bin/env bash
# Apply working Freestyle config to a Jenkins Selenium job
set -euo pipefail

JENKINS_HOME="${JENKINS_HOME:-$HOME/.jenkins}"
JOB_NAME="${1:-RedBus -Seleium Jenkins stqa}"
JOB_DIR="$JENKINS_HOME/jobs/$JOB_NAME"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [[ ! -d "$JENKINS_HOME" ]]; then
  echo "Jenkins home not found: $JENKINS_HOME"
  exit 1
fi

mkdir -p "$JOB_DIR"
cp "$ROOT/jenkins/jobs/redbus-selenium-freestyle.xml" "$JOB_DIR/config.xml"

echo "Fixed Freestyle job: $JOB_NAME"
echo "  - Removed broken 'Invoke Maven' step (mvn not in Jenkins PATH)"
echo "  - Added shell script: jenkins/run-selenium-freestyle.sh"
echo "  - Starts backend + frontend, then runs mvn in selenium-tests/"
echo ""
echo "Restart Jenkins and rebuild:"
echo "  brew services restart jenkins-lts"
