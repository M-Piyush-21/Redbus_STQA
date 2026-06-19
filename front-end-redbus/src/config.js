export const USE_SAMPLE_DATA =
  process.env.REACT_APP_USE_SAMPLE_DATA === "true" ||
  process.env.NODE_ENV === "development";

export const API_BASE_URL = USE_SAMPLE_DATA
  ? ""
  : process.env.NODE_ENV === "development"
    ? ""
    : process.env.REACT_APP_BACKEND_URL || "";

export const GOOGLE_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ||
  "446362734274-cq1j14nuk3ov3elpe64dbnosinakaoof.apps.googleusercontent.com";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
