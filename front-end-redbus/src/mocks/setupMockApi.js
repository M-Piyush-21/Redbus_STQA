import axios from "axios";
import { USE_SAMPLE_DATA } from "../config";
import { getSampleResponse } from "./sampleData";

export function setupMockApi() {
  if (!USE_SAMPLE_DATA) return;

  axios.interceptors.request.use((config) => {
    // Let Cypress cy.intercept() stub APIs with explicit 200 responses
    if (typeof window !== "undefined" && (window.Cypress || window.__DISABLE_SAMPLE_API__)) {
      return config;
    }

    let body = config.data;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = undefined;
      }
    }
    const sample = getSampleResponse(config.url, config.method, body);
    if (sample === null) return config;

    config.adapter = () =>
      Promise.resolve({
        data: sample,
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/json" },
        config,
      });

    return config;
  });
}
