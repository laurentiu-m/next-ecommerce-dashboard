export const RouteTitles = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/products/categories": "Categories",
  "/orders": "Orders",
  "/customers": "Customers",
} as const;

export enum ROUTES {
  Dashboard = "/dashboard",
  Products = "/products",
  Categories = "/products/categories",
  Orders = "/orders",
  Customers = "/customers",
}
