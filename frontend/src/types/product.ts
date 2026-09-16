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

export type StockStatus =
  | "In Stock"
  | "Limited"
  | "Low Stock"
  | "Out of Stock";