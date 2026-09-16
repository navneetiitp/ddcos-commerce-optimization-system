import API from "./api";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface ProductInput {
  name: string;
  price: number;
  stock: number;
}

export const getProducts = async (): Promise<Product[]> => (await API.get("/products/")).data;
export const getProduct = async (id: number): Promise<Product> => (await API.get(`/products/${id}`)).data;
export const addProduct = async (product: ProductInput): Promise<Product> => (await API.post("/products/", product)).data;
export const updateProduct = async (id: number, product: ProductInput): Promise<Product> => (await API.put(`/products/${id}`, product)).data;
export const deleteProduct = async (id: number): Promise<boolean> => {
  await API.delete(`/products/${id}`);
  return true;
};
export const updateProductPrice = async (productId: number, newPrice: number): Promise<Product> =>
  (await API.put(`/products/${productId}/price`, undefined, { params: { new_price: newPrice } })).data;
