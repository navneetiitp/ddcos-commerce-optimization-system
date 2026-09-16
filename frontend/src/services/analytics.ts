import API from "./api";

export const getTopProducts = () =>
  API.get("/analytics/top-products?limit=5");