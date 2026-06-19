const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: false,
    screenshotOnRunFailure: false,
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    env: {
      API_URL: "http://localhost:3020",
    },
    reporter: "junit",
    reporterOptions: {
      mochaFile: "cypress/results/junit-[hash].xml",
    },
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium") {
          launchOptions.args.push("--disable-cache");
          launchOptions.args.push("--disk-cache-size=0");
        }
        return launchOptions;
      });
      return config;
    },
  },
});
