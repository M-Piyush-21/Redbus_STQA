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

function registerSampleApiMocks() {
  EXTERNAL_BLOCK.forEach((pattern) => {
    cy.intercept("GET", pattern, { ...OK, body: "", headers: { "content-type": "image/gif" } });
  });

  cy.intercept("GET", "**/local/placeholder.svg*", { ...OK, fixture: "placeholder.svg" });

  cy.intercept("GET", "**/v1/api/routes", { ...OK, fixture: "routes.json" }).as("routesApi");

  cy.intercept("GET", "**/v1/api/routes/Lucknow/Delhi/**", {
    ...OK,
    fixture: "bus-search-lucknow-delhi.json",
  }).as("busSearchApi");

  cy.intercept("GET", "**/v1/api/routes/Lucknow/Allahabad/**", {
    ...OK,
    fixture: "bus-search-lucknow-allahabad.json",
  }).as("busSearchApi");

  // Detail must be registered before list — /busservice/ has an id segment
  cy.intercept("GET", /\/v1\/api\/busservice\/[^/]+$/, {
    ...OK,
    fixture: "bus-service-detail.json",
  }).as("busServiceDetailApi");

  cy.intercept("GET", /\/v1\/api\/busservice\/?(\?.*)?$/, {
    ...OK,
    fixture: "bus-services.json",
  }).as("busServiceApi");

  cy.intercept("GET", "**/v1/api/bookingHire/**", { ...OK, body: [] });
  cy.intercept("GET", "**/v1/api/booking/**", { ...OK, body: [] });

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
