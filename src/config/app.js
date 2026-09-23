// Frontend configuration. Replace these values when the backend is connected.
export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
  affiliateMode: import.meta.env.VITE_AFFILIATE_MODE === "true",
};
