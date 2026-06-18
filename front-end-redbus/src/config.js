export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? ""
    : process.env.REACT_APP_BACKEND_URL ||
      "https://redbus-backend-udit.herokuapp.com";

export const GOOGLE_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ||
  "446362734274-cq1j14nuk3ov3elpe64dbnosinakaoof.apps.googleusercontent.com";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
