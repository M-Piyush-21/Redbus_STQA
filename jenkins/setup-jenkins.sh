#!/bin/bash
# One-time Jenkins setup for RedBus STQA project
# Run: bash jenkins/setup-jenkins.sh

set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
REPO="https://github.com/M-Piyush-21/Redbus_STQA.git"
JENKINS_URL="http://localhost:8080"

echo "=== Installing Jenkins LTS ==="
if ! command -v jenkins-lts &>/dev/null; then
  brew install jenkins-lts
fi

echo "=== Starting Jenkins ==="
brew services start jenkins-lts 2>/dev/null || true
sleep 15

echo "=== Waiting for Jenkins UI ==="
for i in $(seq 1 60); do
  if curl -sf "$JENKINS_URL/login" > /dev/null 2>&1; then
    echo "Jenkins is up at $JENKINS_URL"
    break
  fi
  sleep 3
done

JENKINS_HOME="${JENKINS_HOME:-/opt/homebrew/var/jenkins/home}"
if [ ! -d "$JENKINS_HOME" ]; then
  JENKINS_HOME="$HOME/.jenkins"
fi

INITIAL_PASS=""
if [ -f "$JENKINS_HOME/secrets/initialAdminPassword" ]; then
  INITIAL_PASS=$(cat "$JENKINS_HOME/secrets/initialAdminPassword")
  echo "Initial admin password: $INITIAL_PASS"
fi

echo ""
echo "=== MANUAL STEPS (first time only) ==="
echo "1. Open $JENKINS_URL"
if [ -n "$INITIAL_PASS" ]; then
  echo "2. Use password: $INITIAL_PASS"
fi
echo "3. Install suggested plugins"
echo "4. Create admin user"
echo ""
echo "=== After setup wizard, run: ==="
echo "  bash jenkins/create-jobs.sh"
echo ""
echo "Or create jobs manually:"
echo "  - New Item > Pipeline > redbus-selenium"
echo "    Script Path: selenium-tests/Jenkinsfile"
echo "    SCM: Git > $REPO"
echo "  - New Item > Pipeline > redbus-cypress"
echo "    Script Path: cypress-tests/Jenkinsfile"
echo "    SCM: Git > $REPO"
