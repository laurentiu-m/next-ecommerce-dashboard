import apiClient from "./axios";
import { Category, Product, User } from "@/types";

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await apiClient.get("/products?limit=50");
    return data.products;
  },

  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get("/products/categories");
    return data;
  },

  getUsers: async (): Promise<User[]> => {
    const { data } = await apiClient.get("/users?limit=50");
    return data.users;
  },
};
