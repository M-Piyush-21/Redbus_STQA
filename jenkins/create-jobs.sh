#!/bin/bash
# Create Jenkins pipeline jobs (run AFTER Jenkins setup wizard is complete)
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

JENKINS_HOME="${JENKINS_HOME:-/opt/homebrew/var/jenkins/home}"
if [ ! -d "$JENKINS_HOME" ]; then
  JENKINS_HOME="$HOME/.jenkins"
fi

JOBS_DIR="$JENKINS_HOME/jobs"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

mkdir -p "$JOBS_DIR/redbus-selenium" "$JOBS_DIR/redbus-cypress"
cp "$ROOT/jenkins/jobs/redbus-selenium.xml" "$JOBS_DIR/redbus-selenium/config.xml"
cp "$ROOT/jenkins/jobs/redbus-cypress.xml" "$JOBS_DIR/redbus-cypress/config.xml"

echo "Jobs created:"
echo "  - redbus-selenium  (selenium-tests/Jenkinsfile)"
echo "  - redbus-cypress   (cypress-tests/Jenkinsfile)"
echo ""
echo "Restart Jenkins to load jobs:"
echo "  brew services restart jenkins-lts"
echo ""
echo "Then open http://localhost:8080 and click 'Build Now' on each job."
