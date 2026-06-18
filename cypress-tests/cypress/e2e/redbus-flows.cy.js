const SEARCH_DATE = "2026-12-20";

describe("Flow 1 - Landing page loads", () => {
  it("shows search form elements", () => {
    cy.visit("/");
    cy.get("[data-testid='search-bus-btn']").should("be.visible");
    cy.get("[data-testid='source-input']").should("be.visible");
    cy.get("[data-testid='destination-input']").should("be.visible");
    cy.get("[data-testid='date-input']").should("be.visible");
  });
});

describe("Flow 2 - Bus search", () => {
  it("navigates to select-bus for Lucknow to Delhi", () => {
    cy.visit("/");
    cy.get("[data-testid='source-input']").type("Lucknow");
    cy.get("[data-testid='destination-input']").type("Delhi");
    cy.get("[data-testid='date-input']").type(SEARCH_DATE);
    cy.get("[data-testid='search-bus-btn']").click();
    cy.url().should("include", "/select-bus");
    cy.url().should("include", "departure=Lucknow");
    cy.url().should("include", "arrival=Delhi");
  });
});

describe("Flow 3 - Select bus page", () => {
  it("shows route header with cities and date", () => {
    cy.visit(`/select-bus?departure=Lucknow&arrival=Delhi&date=${SEARCH_DATE}`);
    cy.get("[data-testid='select-bus-header']")
      .should("contain", "Lucknow")
      .and("contain", "Delhi")
      .and("contain", SEARCH_DATE);
  });
});

describe("Flow 4 - Bus hire page", () => {
  it("opens bus hire from navbar", () => {
    cy.visit("/");
    cy.get("[data-testid='bus-hire-link']").click();
    cy.url().should("include", "/bus-hire");
    cy.contains("Bus Hire").should("be.visible");
  });
});

describe("Flow 5 - Bus hire quotations", () => {
  it("loads hire card page with quotations", () => {
    cy.visit(
      "/bus-hire-card?pickUp=Mumbai&drop=Pune&pickUpDate=2026-12-20&dropDate=2026-12-21&totalPassengers=4"
    );
    cy.get("[data-testid='bus-hire-card-page']").should("be.visible");
    cy.contains(/quotation/i).should("exist");
  });
});

describe("Flow 6 - Profile and error pages", () => {
  it("loads profile page and 404 page", () => {
    cy.visit("/my-profile");
    cy.get("[data-testid='profile-page']").should("be.visible");

    cy.visit("/this-route-does-not-exist");
    cy.get("[data-testid='error-page']").should("be.visible");
  });
});
