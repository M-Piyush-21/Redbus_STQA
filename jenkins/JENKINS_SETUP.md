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

> **Important:** Create a **Pipeline** job — **not** Freestyle / Maven project.
> Freestyle fails with `Cannot run program "mvn"` because Jenkins does not have Homebrew in PATH,
> and it never starts the frontend/backend before tests.

### Quick fix (if job already exists but fails)

```bash
bash jenkins/fix-selenium-job.sh
brew services restart jenkins-lts
```

Then Jenkins → **RedBus - Selenium Jenkins** → **Build Now**

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
   - Branch: `*/master` (**not** `main` — this repo uses `master`)
   - Script Path: `selenium-tests/Jenkinsfile`
3. **Build Triggers:** ☑ Poll SCM → `H/15 * * * *`
4. Save → **Build Now**

> **Common failure:** `fatal: couldn't find remote ref refs/heads/main` → change Branch Specifier from `*/main` to `*/master`.

**Job 2: redbus-cypress**
- Same as above, Script Path: `cypress-tests/Jenkinsfile`

### Option C — Freestyle job (if you already created one)

Do **not** use **Invoke top-level Maven targets** — Jenkins cannot find `mvn`.

Apply the fixed Freestyle config:

```bash
bash jenkins/fix-freestyle-selenium-job.sh "RedBus -Seleium Jenkins stqa"
brew services restart jenkins-lts
```

**Manual Freestyle setup:**
1. New Item → **Freestyle project**
2. Git → URL `https://github.com/M-Piyush-21/Redbus_STQA.git`, branch **`*/master`**
3. Build → **Execute shell** (paste from `jenkins/jobs/redbus-selenium-freestyle.xml`)
4. Post-build → **Publish JUnit test result report** → `selenium-tests/target/surefire-reports/*.xml`
5. Post-build → **Publish TestNG Results** → `selenium-tests/target/surefire-reports/testng-results.xml`

**Never set Maven goals to `mvn clean test`** — that runs `mvn mvn clean test` and fails.

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

## 9. Troubleshooting

| Error | Cause | Fix |
|-------|--------|-----|
| `couldn't find remote ref refs/heads/main` | Branch set to `main` | Use **`*/master`** in job Git config |
| `Couldn't find any revision to build` | Same as above | Branch → `*/master` |
| `Cannot run program "mvn"` | Freestyle job; Jenkins PATH missing Homebrew | Use **Pipeline** job (`fix-selenium-job.sh`) |
| Build finishes in &lt;1 second | Wrong branch or job type | Use **Pipeline** job, not Freestyle |
| `Did not find any matching files` for TestNG | Tests never ran (checkout failed) | Fix branch first, then rebuild |
| Maven can't find `pom.xml` | Freestyle job at repo root | Use Pipeline with `selenium-tests/Jenkinsfile` |

**Correct job setup:**
- Job type: **Pipeline** (not Freestyle / Maven project)
- Branch: **`*/master`**
- Script Path: **`selenium-tests/Jenkinsfile`**

After fixing config, click **Build Now** again (or restart Jenkins: `brew services restart jenkins-lts`).
