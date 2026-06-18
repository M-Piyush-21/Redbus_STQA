# RedBus College Assignment - Testing Guide

This project includes **6 UI flows** (Selenium + Cypress), **6 API load tests** (JMeter), and **Jenkins CI/CD** setup.

---

## Prerequisites

1. **Java 11+** and **Maven** (for Selenium)
2. **Node.js 16+** (for frontend, backend, Cypress)
3. **Chrome browser** (for Selenium)
4. **JMeter 5.6+** (for API load testing)
5. **Jenkins** (for CI/CD pipelines)

---

## Step 1: Start the Application

Open **3 terminals**:

```bash
# Terminal 1 - Backend (port 3020)
cd back-end-redbus
npm start

# Terminal 2 - Frontend (port 3000)
cd front-end-redbus
npm start

# Terminal 3 - Run tests (see below)
```

---

## 6 User Flows (What We Test)

| # | Flow | Selenium Test | Cypress Test |
|---|------|---------------|--------------|
| 1 | Landing page loads | `flow1_landingPageLoads` | Flow 1 |
| 2 | Bus search (Lucknow → Delhi) | `flow2_busSearch` | Flow 2 |
| 3 | Select bus results page | `flow3_selectBusPage` | Flow 3 |
| 4 | Bus hire page | `flow4_busHirePage` | Flow 4 |
| 5 | Bus hire quotations | `flow5_busHireQuotations` | Flow 5 |
| 6 | Profile + 404 error page | `flow6_profileAndErrorPage` | Flow 6 |

---

## Selenium (Maven + TestNG)

```bash
cd selenium-tests
mvn clean test
```

Run with visible browser (non-headless):

```bash
mvn clean test -Dheadless=false
```

**Assertions:** TestNG `Assert.assertTrue()` used in all 6 flows.

**Reports:** `selenium-tests/target/surefire-reports/`

---

## Cypress

```bash
cd cypress-tests
npm install
npm run cy:run        # headless
npm run cy:open       # interactive UI
```

**Assertions:** Cypress `.should()` chains used in all 6 flows.

**Reports:** `cypress-tests/cypress/results/` (JUnit XML for Jenkins)

---

## JMeter (6 API Load Tests)

| # | API | Method |
|---|-----|--------|
| 1 | `/v1/api/routes` | GET |
| 2 | `/v1/api/routes/Lucknow/Delhi/{date}` | GET |
| 3 | `/v1/api/customers` | POST |
| 4 | `/v1/api/busservice` | GET |
| 5 | `/v1/api/booking/{customerId}` | GET |
| 6 | `/v1/api/bookingHire` | POST |

**GUI mode:**

```bash
jmeter -t jmeter-tests/redbus-api-load-test.jmx
```

**CLI mode (load test):**

```bash
jmeter -n -t jmeter-tests/redbus-api-load-test.jmx -l jmeter-tests/results.jtl -e -o jmeter-tests/html-report
```

Open `jmeter-tests/html-report/index.html` for dashboard.

> Backend must be running on `localhost:3020` before JMeter tests.

---

## Jenkins CI/CD Setup

### Plugins to Install in Jenkins

1. **Git** / **GitHub**
2. **Maven Integration**
3. **Pipeline**
4. **JUnit** (publish test results)
5. **TestNG Results Analyzer** (dashboard for Selenium)

### Selenium Pipeline Job

1. New Item → **Pipeline** → name: `redbus-selenium`
2. **Pipeline script from SCM** → Git → your GitHub repo URL
3. Script Path: `selenium-tests/Jenkinsfile`
4. **Build Triggers:** Poll SCM `H/15 * * * *` (every 15 min) or GitHub webhook
5. **Post-build Actions:**
   - Publish JUnit test result report → `selenium-tests/target/surefire-reports/*.xml`
   - Archive artifacts → `selenium-tests/target/surefire-reports/**`
6. After build, open **TestNG Results** tab (from TestNG Results Analyzer plugin)

### Cypress Pipeline Job

1. New Item → **Pipeline** → name: `redbus-cypress`
2. Script Path: `cypress-tests/Jenkinsfile`
3. Post-build: Publish JUnit → `cypress-tests/cypress/results/*.xml`

### Important for Jenkins

- Jenkins agent machine must have Chrome, Node, Maven, JDK installed
- Frontend (`localhost:3000`) and backend (`localhost:3020`) must be running on Jenkins machine **or** use a staging server URL and update `BASE_URL` in Jenkinsfile

---

## GitHub Setup (Selenium requirement)

```bash
git init
git add .
git commit -m "Add RedBus testing suite"
git remote add origin https://github.com/YOUR_USERNAME/redbus-master.git
git push -u origin main
```

Point Jenkins to this GitHub repo for source code management.

---

## Quick Demo Checklist (For Viva / Submission)

- [ ] Show frontend running on `localhost:3000`
- [ ] Show backend running on `localhost:3020`
- [ ] Run `mvn test` in `selenium-tests` → 6 tests pass
- [ ] Run `npm run cy:run` in `cypress-tests` → 6 tests pass
- [ ] Open JMeter `.jmx` → run → show Summary Report
- [ ] Show Jenkins pipeline green build + TestNG dashboard
- [ ] Explain TestNG assertions (Selenium) vs Cypress `.should()` assertions

---

## Project Structure

```
redbus-master/
├── front-end-redbus/     # React app
├── back-end-redbus/      # Express API
├── selenium-tests/       # Maven + TestNG + Selenium (6 flows)
├── cypress-tests/        # Cypress E2E (6 flows)
├── jmeter-tests/         # JMeter load test (6 APIs)
└── TESTING_GUIDE.md      # This file
```
