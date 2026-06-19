/**
 * Puppeteer fallback — runs the same 6 UNIQUE Cypress flows when Cypress won't start.
 */
const puppeteer = require("puppeteer");
const http = require("http");
const fs = require("fs");
const path = require("path");

function findChrome() {
  const fromEnv = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH;
  if (fromEnv && fs.existsSync(fromEnv)) return fromEnv;
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];
  return candidates.find((p) => fs.existsSync(p));
}

const BASE = process.env.CYPRESS_baseUrl || "http://localhost:3000";
const API = process.env.API_URL || "http://localhost:3020";
const DATE = "2026-12-20";
const resultsDir = path.join(__dirname, "cypress", "results");
fs.mkdirSync(resultsDir, { recursive: true });

function apiGet(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(API + urlPath, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => resolve(JSON.parse(d)));
    }).on("error", reject);
  });
}

function setDateInput(page, selector, value) {
  return page.$eval(
    selector,
    (el, v) => {
      el.value = v;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    },
    value
  );
}

const tests = [
  {
    name: "CY-01 Bus search Lucknow to Allahabad",
    run: async (page) => {
      await page.goto(BASE + "/");
      await page.type("[data-testid='source-input']", "Lucknow");
      await page.type("[data-testid='destination-input']", "Allahabad");
      await setDateInput(page, "[data-testid='date-input']", DATE);
      await page.click("[data-testid='search-bus-btn']");
      await page.waitForFunction(() => location.href.includes("arrival=Allahabad"), { timeout: 10000 });
    },
  },
  {
    name: "CY-02 Select bus loads bus list",
    run: async (page) => {
      await page.goto(`${BASE}/select-bus?departure=Lucknow&arrival=Delhi&date=${DATE}`);
      await page.waitForSelector("[data-testid='bus-list-container']", { timeout: 15000 });
      const text = await page.$eval("[data-testid='bus-list-container']", (el) => el.textContent);
      if (text.includes("Unable to load buses")) throw new Error("bus list error");
    },
  },
  {
    name: "CY-03 Bus hire form submit",
    run: async (page) => {
      await page.goto(BASE + "/bus-hire?showForm=1", { waitUntil: "networkidle0" });
      await page.waitForSelector("[data-testid='bus-hire-form']", { visible: true });
      await page.type("[data-testid='hire-pickup-input']", "Mumbai");
      await page.type("[data-testid='hire-drop-input']", "Pune");
      await page.click("[data-testid='hire-proceed-btn']");
      await page.waitForFunction(() => location.pathname.includes("bus-hire-card"), { timeout: 10000 });
    },
  },
  {
    name: "CY-04 Bus hire details page",
    run: async (page) => {
      await page.goto(
        `${BASE}/bus-hire-details/sample-hire-1?pickUp=Mumbai&drop=Pune&pickUpDate=2026-12-20&dropDate=2026-12-21&totalPassengers=2`
      );
      await page.waitForSelector("[data-testid='bus-hire-details-page']", { timeout: 15000 });
      const html = await page.content();
      if (!html.includes("Trip Summary")) throw new Error("Trip Summary missing");
    },
  },
  {
    name: "CY-05 Profile hired bus tab",
    run: async (page) => {
      await page.goto(BASE + "/my-profile");
      await page.click("[data-testid='hired-bus-tab']");
      await page.waitForSelector("[data-testid='hired-bus-section']");
    },
  },
  {
    name: "CY-06 Profile my profile tab",
    run: async (page) => {
      await page.goto(BASE + "/my-profile");
      await page.click("[data-testid='my-profile-tab']");
      await page.waitForSelector("[data-testid='my-profile-section']");
      const html = await page.content();
      if (!html.includes("Contact Details")) throw new Error("Contact Details missing");
    },
  },
];

(async () => {
  const chromePath = findChrome();
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
    ...(chromePath ? { executablePath: chromePath } : {}),
  });
  const page = await browser.newPage();
  let passed = 0;
  let failed = 0;
  const junit = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<testsuite name="Redbus Cypress Fallback" tests="${tests.length}">`,
  ];

  for (const t of tests) {
    const start = Date.now();
    try {
      await t.run(page);
      console.log("PASS", t.name);
      passed++;
      junit.push(`<testcase name="${t.name}" time="${((Date.now() - start) / 1000).toFixed(2)}"/>`);
    } catch (e) {
      console.error("FAIL", t.name, e.message);
      failed++;
      junit.push(
        `<testcase name="${t.name}" time="${((Date.now() - start) / 1000).toFixed(2)}"><failure>${e.message}</failure></testcase>`
      );
    }
  }

  junit.push("</testsuite>");
  fs.writeFileSync(path.join(resultsDir, "junit-fallback.xml"), junit.join("\n"));
  await browser.close();
  console.log(`\nCypress fallback: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
})();
