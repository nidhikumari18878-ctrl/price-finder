import { appConfig } from "../config/app";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, options);
  if (!response.ok) {
    throw new Error("API request failed");
  }
  return response.json();
}

export async function getProducts(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== "" && value != null)
  ).toString();
  const data = await apiRequest(`/products${query ? `?${query}` : ""}`);
  return data.products;
}

export async function getProductById(id) {
  try {
    const data = await apiRequest(`/products/${id}`);
    return data.product;
  } catch {
    return null;
  }
}

export async function createPriceAlert(payload) {
  const data = await apiRequest("/alerts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return data.alert;
}

export async function getPriceHistory(id) {
  const data = await apiRequest(`/products/${id}/history`);
  return data.history;
}
