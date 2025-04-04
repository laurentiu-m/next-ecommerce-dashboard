import { categories } from "@/constants";
import { CustomerApi, ProductApi } from "@/types";

import apiClient from "./axios";

export const api = {
  getProducts: async (): Promise<ProductApi[]> => {
    const res = await Promise.all(
      categories.map(async (category) => {
        const { data } = await apiClient.get(
          `/products/category/${category.slug}`
        );
        return data.products;
      })
    );

    return res.flat();
  },

  getCustomers: async (): Promise<CustomerApi[]> => {
    const { data } = await apiClient.get("/users?limit=50");
    return data.users;
  },
};
