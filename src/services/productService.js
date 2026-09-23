import products from "../data/products";
import { appConfig } from "../config/app";

// The UI currently uses demo data. Replace these functions with fetch/axios
// calls when the API is ready; component interfaces can stay unchanged.
export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();

  const response = await fetch(
    `http://localhost:5000/api/products${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  const data = await response.json();

  return data.products;
}

export async function getProductById(id) {
  const response = await fetch(
    `http://localhost:5000/api/products/${id}`
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.product;
}