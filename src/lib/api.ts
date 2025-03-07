import { Category, Product, Customer } from "@/types";

import apiClient from "./axios";

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await apiClient.get("/products?limit=50");
    return data.products;
  },

  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get("/products/categories");
    return data;
  },

  getCustomers: async (): Promise<Customer[]> => {
    const { data } = await apiClient.get("/users?limit=50");
    return data.users;
  },
};
