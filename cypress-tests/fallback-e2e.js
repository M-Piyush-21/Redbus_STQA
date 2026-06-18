/**
 * Fallback E2E runner when Cypress cannot start (e.g. macOS 25+).
 * Runs the same 6 flows with Puppeteer + assertions.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.CYPRESS_baseUrl || "http://localhost:3000";
const DATE = "2026-12-20";
const resultsDir = path.join(__dirname, "cypress", "results");
fs.mkdirSync(resultsDir, { recursive: true });

const tests = [
  {
    name: "Flow 1 - Landing page loads",
    run: async (page) => {
      await page.goto(BASE + "/");
      await page.waitForSelector("[data-testid='search-bus-btn']");
      if (!(await page.$("[data-testid='source-input']"))) throw new Error("source missing");
    },
  },
  {
    name: "Flow 2 - Bus search",
    run: async (page) => {
      await page.goto(BASE + "/");
      await page.type("[data-testid='source-input']", "Lucknow");
      await page.type("[data-testid='destination-input']", "Delhi");
      await page.$eval("[data-testid='date-input']", (el, d) => { el.value = d; el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true })); }, DATE);
      await page.click("[data-testid='search-bus-btn']");
      await page.waitForFunction(() => location.pathname.includes("select-bus"), { timeout: 10000 });
      const url = page.url();
      if (!url.includes("departure=Lucknow") || !url.includes("arrival=Delhi")) throw new Error("bad url " + url);
    },
  },
  {
    name: "Flow 3 - Select bus page",
    run: async (page) => {
      await page.goto(`${BASE}/select-bus?departure=Lucknow&arrival=Delhi&date=${DATE}`);
      const text = await page.$eval("[data-testid='select-bus-header']", (el) => el.textContent);
      if (!text.includes("Lucknow") || !text.includes("Delhi")) throw new Error("header wrong");
    },
  },
  {
    name: "Flow 4 - Bus hire page",
    run: async (page) => {
      await page.goto(BASE + "/");
      await page.click("[data-testid='bus-hire-link']");
      await page.waitForFunction(() => location.pathname.includes("bus-hire"));
    },
  },
  {
    name: "Flow 5 - Bus hire quotations",
    run: async (page) => {
      await page.goto(`${BASE}/bus-hire-card?pickUp=Mumbai&drop=Pune&pickUpDate=2026-12-20&dropDate=2026-12-21&totalPassengers=4`);
      await page.waitForSelector("[data-testid='bus-hire-card-page']");
      const html = await page.content();
      if (!/quotation/i.test(html)) throw new Error("no quotations");
    },
  },
  {
    name: "Flow 6 - Profile and error pages",
    run: async (page) => {
      await page.goto(BASE + "/my-profile");
      await page.waitForSelector("[data-testid='profile-page']");
      await page.goto(BASE + "/bad-route-xyz");
      await page.waitForSelector("[data-testid='error-page']");
    },
  },
];

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  let passed = 0;
  let failed = 0;
  const junit = ['<?xml version="1.0" encoding="UTF-8"?>', `<testsuite name="Redbus E2E Fallback" tests="${tests.length}">`];

  for (const t of tests) {
    const start = Date.now();
    try {
      await t.run(page);
      console.log("PASS", t.name);
      passed++;
      junit.push(`<testcase name="${t.name}" time="${((Date.now()-start)/1000).toFixed(2)}"/>`);
    } catch (e) {
      console.error("FAIL", t.name, e.message);
      failed++;
      junit.push(`<testcase name="${t.name}" time="${((Date.now()-start)/1000).toFixed(2)}"><failure>${e.message}</failure></testcase>`);
    }
  }

  junit.push("</testsuite>");
  fs.writeFileSync(path.join(resultsDir, "junit-fallback.xml"), junit.join("\n"));
  await browser.close();

  console.log(`\nFallback E2E: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
})();
