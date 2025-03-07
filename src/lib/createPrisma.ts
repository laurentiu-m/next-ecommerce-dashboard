import { Category, Product, Customer } from "@/types";

import { prisma } from "./prisma";
import { slugify } from "./slugify";

export const createCategories = async (categories: Category[]) => {
  for (const category of categories) {
    await prisma.category.create({
      data: { name: category.name, slug: category.slug },
    });
  }
};

export const createCustomers = async (customers: Customer[]) => {
  for (const customer of customers) {
    await prisma.customer.create({
      data: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        age: customer.age,
        gender: customer.gender,
        email: customer.email,
        username: customer.username,
        phone: customer.phone,
      },
    });
  }

  await prisma.user.create({
    data: {
      email: "admin@email.com",
      username: "admin",
      role: "ADMIN",
    },
  });
};

export const createProducts = async (products: Product[]) => {
  const getCategoryId = async (categoryName: string) => {
    const category = await prisma.category.findUnique({
      where: {
        slug: categoryName,
      },
      select: {
        id: true,
      },
    });

    return category?.id as string;
  };

  for (const product of products) {
    await prisma.product.create({
      data: {
        slug: slugify(product.title),
        title: product.title,
        description: product.description,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
        thumbnail: product.thumbnail,
        categoryId: await getCategoryId(product.category),
      },
    });
  }
};
