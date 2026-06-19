# Cypress Tests

## Install Cypress binary (run once)

`cypress` is not a global command. Use npm/npx from this folder:

```bash
cd cypress-tests
npm install
npm run cypress:install
```

Or:

```bash
npx cypress install
```

Binary installs to: `~/Library/Caches/Cypress/14.5.4/`

## Run tests

**App must be running** (backend :3020 + frontend :3000).

```bash
# Headless (tries Cypress, falls back on macOS 25+)
npm run test:ci

# Puppeteer fallback only (works on all Macs)
npm run test:fallback

# Interactive UI
npm run cy:open
```

## If `cy:open` fails on macOS 25

Cypress binary may not start on newer macOS. Use:

```bash
npm run test:fallback
```

Same 6 flows, same assertions — valid for your assignment.
