export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  affiliateMode: import.meta.env.VITE_AFFILIATE_MODE === "true",
};
