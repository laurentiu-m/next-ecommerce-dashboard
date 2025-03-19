import { Prisma } from "@prisma/client";

import { Role } from "@/constants/user";

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
};

export type ProductType = {
  id: string;
  title: string;
  createdAt: Date;
  slug: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  categoryId: string;
  category: CategoryType;
};

export type CustomerType = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  username: string;
  phone: string;
  createdAt: Date;
  Order: OrderType;
};

export type ImageType = {
  id: string;
  url: string;
  product: ProductType;
};

export type OrderType = {
  id: string;
  createdAt: Date;
  total: number;
  customer: CustomerType;
  items?: Prisma.OrderItemCreateNestedManyWithoutOrderInput;
};

export type OrderItemType = {
  id: string;
  quantity: number;
  price: number;
  order: OrderType;
  product: ProductType;
};

export type UserType = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  role: Role;
};
