# RedBus College Assignment - Testing Guide

This project includes **18 unique test cases** — 6 Selenium, 6 Cypress, 6 JMeter — with **no overlap** between tools. See [TEST_CASES.md](TEST_CASES.md) for the full matrix.

---

## Sample data mode (no live API)

The frontend uses **local sample data** in development (`REACT_APP_USE_SAMPLE_DATA=true` in `front-end-redbus/.env`). No MongoDB or external CDN images are required for UI or Cypress.

- Sample data: `front-end-redbus/src/mocks/sampleData.js`
- Cypress fixtures: `cypress-tests/cypress/fixtures/`
- External fonts/CDN removed from `public/index.html`

---

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

Or use the CI helper (starts backend + frontend, waits until ready):

```bash
bash scripts/ci-start-services.sh
# ... run tests ...
bash scripts/ci-stop-services.sh
```

---

## 18 Unique Test Cases (by tool)

| Tool | IDs | Focus |
|------|-----|--------|
| **Selenium** | SL-01 … SL-06 | Navbar, Lucknow→Delhi search, select-bus, invalid route modal, bus hire nav, 404 |
| **Cypress** | CY-01 … CY-06 | Lucknow→Allahabad search, bus list, hire form, hire details, profile tabs |
| **JMeter** | JM-01 … JM-06 | Routes API, Lucknow→Faizabad route, customers, busservice, bookingHire |

Full descriptions: [TEST_CASES.md](TEST_CASES.md)

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
npm run test:ci        # tries Cypress, falls back to Puppeteer on macOS 25+
npm run test:fallback  # Puppeteer (same 6 CY-* tests)
npm run cy:run         # native Cypress (Linux/Windows Jenkins)
npm run cy:open        # interactive UI
```

> On macOS 25+, native Cypress may fail (`--no-sandbox`). Use `npm run test:fallback` — it runs the same 6 unique CY-* tests.

**Assertions:** Cypress `.should()` chains used in all 6 flows.

**Reports:** `cypress-tests/cypress/results/` (JUnit XML for Jenkins)

---

## JMeter (6 Unique API Tests)

| ID | API | Method |
|----|-----|--------|
| JM-01 | `/v1/api/routes` | GET |
| JM-02 | `/v1/api/routes/Lucknow/Faizabad/{date}` | GET |
| JM-03 | `/v1/api/customers` | POST |
| JM-04 | `/v1/api/busservice` | GET |
| JM-05 | `/v1/api/busservice/{id}` | GET |
| JM-06 | `/v1/api/bookingHire` | POST |

Plan: 5 threads × 1 loop = **30 HTTP samples** (6 APIs per thread).

**GUI mode** (pick one — depends on your current folder):

```bash
# from repo root
jmeter -t jmeter-tests/redbus-api-load-test.jmx

# OR from jmeter-tests/
cd jmeter-tests && ./run-gui.sh
```

**CLI mode (load test):**

```bash
# from repo root
rm -f jmeter-tests/results.jtl
jmeter -n -t jmeter-tests/redbus-api-load-test.jmx -l jmeter-tests/results.jtl -e -o jmeter-tests/html-report

# OR from jmeter-tests/
cd jmeter-tests && ./run-cli.sh
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
- [ ] Run `mvn test` in `selenium-tests` → 6 SL-* tests pass
- [ ] Run `npm run test:ci` in `cypress-tests` → 6 CY-* tests pass
- [ ] Run JMeter CLI → 30 samples, 0% errors (6 JM-* APIs)
- [ ] Show Jenkins pipeline green build + TestNG dashboard
- [ ] Explain TestNG assertions (Selenium) vs Cypress `.should()` assertions

---

## Project Structure

```
redbus-master/
├── front-end-redbus/     # React app
├── back-end-redbus/      # Express API
├── selenium-tests/       # Maven + TestNG + Selenium (SL-01 … SL-06)
├── cypress-tests/        # Cypress E2E (CY-01 … CY-06)
├── jmeter-tests/         # JMeter API load test (JM-01 … JM-06)
├── TEST_CASES.md         # 18 unique test case matrix
└── TESTING_GUIDE.md      # This file
```
