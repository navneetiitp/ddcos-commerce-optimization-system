import API, { type OptimizationResult } from "./api";
export const optimizePrice = async (product_id: number): Promise<OptimizationResult> => (await API.post("/optimize/price", { product_id })).data;
