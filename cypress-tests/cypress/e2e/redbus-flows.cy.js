const SEARCH_DATE = "2026-12-20";

// 6 UNIQUE Cypress flows — sample fixtures return 200, no live backend needed

describe("CY-01 Bus search Lucknow to Allahabad", () => {
  it("navigates to select-bus for a different route", () => {
    cy.visit("/");
    cy.wait("@apiCall").its("response.statusCode").should("eq", 200);
    cy.get("[data-testid='source-input']").type("Lucknow", { force: true });
    cy.get("[data-testid='destination-input']").type("Allahabad", { force: true });
    cy.get("[data-testid='date-input']").type(SEARCH_DATE, { force: true });
    cy.get("[data-testid='search-bus-btn']").click();
    cy.url().should("include", "/select-bus");
    cy.url().should("include", "arrival=Allahabad");
    cy.wait("@apiCall").its("response.statusCode").should("eq", 200);
  });
});

describe("CY-02 Select bus loads bus list", () => {
  it("shows bus list container after API loads", () => {
    cy.visit(`/select-bus?departure=Lucknow&arrival=Delhi&date=${SEARCH_DATE}`);
    cy.wait("@apiCall").its("response.statusCode").should("eq", 200);
    cy.get("[data-testid='bus-list-container']").should("be.visible");
    cy.get("[data-testid='bus-list-container']").should("not.contain", "Unable to load buses");
    cy.get("[data-testid='bus-list-container']").should("not.contain", "No Bus Found");
  });
});

describe("CY-03 Bus hire form submit", () => {
  it("fills hire form and proceeds to quotations", () => {
    cy.visit("/bus-hire?showForm=1");
    cy.get("[data-testid='bus-hire-form']").should("be.visible");
    cy.get("[data-testid='hire-pickup-input']").type("Mumbai");
    cy.get("[data-testid='hire-drop-input']").type("Pune");
    cy.get("[data-testid='hire-proceed-btn']").scrollIntoView().click({ force: true });
    cy.url().should("include", "/bus-hire-card");
    cy.url().should("include", "pickUp=Mumbai");
    cy.wait("@apiCall").its("response.statusCode").should("eq", 200);
  });
});

describe("CY-04 Bus hire details page", () => {
  it("loads vehicle details from API", () => {
    cy.visit(
      "/bus-hire-details/sample-hire-1?pickUp=Mumbai&drop=Pune&pickUpDate=2026-12-20&dropDate=2026-12-21&totalPassengers=2"
    );
    cy.wait("@apiCall").its("response.statusCode").should("eq", 200);
    cy.get("[data-testid='bus-hire-details-page']").should("be.visible");
    cy.contains("Trip Summary").should("be.visible");
  });
});

describe("CY-05 Profile hired bus tab", () => {
  it("switches to hired bus section", () => {
    cy.visit("/my-profile");
    cy.get("[data-testid='hired-bus-tab']").click();
    cy.get("[data-testid='hired-bus-section']").should("be.visible");
  });
});

describe("CY-06 Profile my profile tab", () => {
  it("shows contact details section", () => {
    cy.visit("/my-profile");
    cy.get("[data-testid='my-profile-tab']").click();
    cy.get("[data-testid='my-profile-section']").should("be.visible");
    cy.contains("Contact Details").should("be.visible");
  });
});
