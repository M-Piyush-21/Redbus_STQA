# Jenkins Setup — RedBus STQA

Repo: **https://github.com/M-Piyush-21/Redbus_STQA.git**

## 1. Install Jenkins (one time)

```bash
brew install jenkins-lts
brew services start jenkins-lts
```

Open **http://localhost:8080** → complete setup wizard → install suggested plugins.

## 2. Install required plugins

Go to **Manage Jenkins → Plugins → Available** and install:

- Maven Integration
- JUnit
- TestNG Results
- HTML Publisher
- Pipeline
- Git / GitHub
- Timestamper

Restart Jenkins after installing.

## 3. Create pipeline jobs

### Option A — Script (fast)

After Jenkins wizard is done:

```bash
bash jenkins/create-jobs.sh
brew services restart jenkins-lts
```

### Option B — Manual UI

**Job 1: redbus-selenium**
1. New Item → **Pipeline** → name: `redbus-selenium`
2. **Pipeline** section:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/M-Piyush-21/Redbus_STQA.git`
   - Branch: `*/master`
   - Script Path: `selenium-tests/Jenkinsfile`
3. **Build Triggers:** ☑ Poll SCM → `H/15 * * * *`
4. Save → **Build Now**

**Job 2: redbus-cypress**
- Same as above, Script Path: `cypress-tests/Jenkinsfile`

## 4. Post-build actions (auto in Jenkinsfile)

Both pipelines already include:

| Action | Selenium | Cypress |
|--------|----------|---------|
| Poll SCM `H/15 * * * *` | ✅ | ✅ |
| Start app (backend + frontend) | ✅ | ✅ |
| Publish JUnit XML | ✅ `target/surefire-reports/*.xml` | ✅ `cypress/results/*.xml` |
| TestNG dashboard | ✅ `testng-results.xml` | — |
| Archive artifacts | ✅ surefire reports | ✅ screenshots/results |

## 5. View TestNG dashboard (Selenium job)

After a successful `redbus-selenium` build:

1. Open the build number
2. Left sidebar → **TestNG Results** (from TestNG plugin)
3. Or open **TestNG HTML Report** link

## 6. What each pipeline runs

**redbus-selenium:** 6 flows, Maven, TestNG assertions  
**redbus-cypress:** 6 flows, Cypress (or Puppeteer fallback on macOS 25+)

## 7. Run locally (same as Jenkins)

```bash
bash scripts/ci-start-services.sh
cd selenium-tests && mvn clean test
cd ../cypress-tests && npm install && npm run test:ci
jmeter -n -t jmeter-tests/redbus-api-load-test.jmx -l jmeter-tests/results.jtl
bash scripts/ci-stop-services.sh
```

## 8. Prerequisites on Jenkins machine

- Java 11+, Maven, Node.js 16+, Chrome
- Ports 3000 and 3020 free during build
- Internet (MongoDB Atlas for backend)
