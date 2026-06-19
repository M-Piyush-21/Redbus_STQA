# JMeter API Load Tests

6 API endpoints (JM-01 … JM-06). See [TESTING_GUIDE.md](../TESTING_GUIDE.md).

**Prerequisite:** backend running on `localhost:3020`.

```bash
cd back-end-redbus && npm start
```

Verify backend before JMeter:

```bash
cd jmeter-tests && ./check-backend.sh
```

## Run from this folder (`jmeter-tests/`)

```bash
cd jmeter-tests
./run-gui.sh          # open JMeter GUI (checks backend first)
./run-cli.sh          # headless load test + HTML report
```

### GUI mode — how to see responses

1. Run `./run-gui.sh` (or `jmeter -t redbus-api-load-test.jmx`)
2. Click the green **Start** button (▶) in the toolbar
3. Open **View Results Tree** in the left panel
4. Click any request (e.g. `JM-01 GET All Routes`) → **Response data** tab shows JSON

Green = HTTP 200. Red = backend not running or API error.

Or directly:

```bash
jmeter -t redbus-api-load-test.jmx
```

## Run from repo root

```bash
jmeter -t jmeter-tests/redbus-api-load-test.jmx
```

> Do **not** use `jmeter-tests/redbus-api-load-test.jmx` when you are already inside `jmeter-tests/` — that path does not exist there.
