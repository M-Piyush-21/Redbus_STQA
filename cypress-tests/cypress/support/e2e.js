// Cypress — sample fixtures, explicit 200 responses, fast, no external CDN.
Cypress.on("uncaught:exception", () => false);

Cypress.on("window:before:load", (win) => {
  win.__DISABLE_SAMPLE_API__ = true;
});

const OK = { statusCode: 200 };

const EXTERNAL_BLOCK = [
  "**/googleapis.com/**",
  "**/gstatic.com/**",
  "**/redbus.in/**",
  "**/rdbuz.com/**",
  "**/cloudflare.com/**",
  "**/duckduckgo.com/**",
];

function apiPath(url) {
  try {
    return new URL(url).pathname.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
}

function registerSampleApiMocks() {
  EXTERNAL_BLOCK.forEach((pattern) => {
    cy.intercept("GET", pattern, { ...OK, body: "", headers: { "content-type": "image/gif" } });
  });

  cy.intercept("GET", "**/local/placeholder.svg", { ...OK, fixture: "placeholder.svg" });

  cy.intercept("GET", "**/v1/api/**", (req) => {
    const path = apiPath(req.url);

    if (path === "/v1/api/routes") {
      req.reply({ ...OK, fixture: "routes.json" });
      return;
    }
    if (path.includes("/Lucknow/Delhi/")) {
      req.reply({ ...OK, fixture: "bus-search-lucknow-delhi.json" });
      return;
    }
    if (path.includes("/Lucknow/Allahabad/")) {
      req.reply({ ...OK, fixture: "bus-search-lucknow-allahabad.json" });
      return;
    }
    if (path === "/v1/api/busservice") {
      req.reply({ ...OK, fixture: "bus-services.json" });
      return;
    }
    if (path.startsWith("/v1/api/busservice/")) {
      req.reply({ ...OK, fixture: "bus-service-detail.json" });
      return;
    }
    if (path.startsWith("/v1/api/bookingHire/")) {
      req.reply({ ...OK, body: [] });
      return;
    }
    if (path.startsWith("/v1/api/booking/")) {
      req.reply({ ...OK, body: [] });
      return;
    }

    req.reply({ ...OK, body: {} });
  }).as("apiCall");

  cy.intercept("POST", "**/v1/api/customers", {
    ...OK,
    body: { _id: "sample-customer-1", name: "Demo User", email: "demo@redbus.test" },
  });
  cy.intercept("POST", "**/v1/api/bookingHire", { ...OK, body: { _id: "sample-hire-booking-1" } });
  cy.intercept("POST", "**/v1/api/booking", { ...OK, body: { _id: "sample-booking-1" } });
}

beforeEach(() => {
  registerSampleApiMocks();
});
