import { Category, Product, User } from "@/types";

import { prisma } from "./prisma";
import { slugify } from "./slugify";

export const createCategories = async (categories: Category[]) => {
  for (const category of categories) {
    await prisma.category.create({
      data: { name: category.name, slug: category.slug },
    });
  }
};

export const createUsers = async (users: User[]) => {
  for (const user of users) {
    await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        email: user.email,
        username: user.username,
        phone: user.phone,
        role: "USER",
      },
    });
  }

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "Admin",
      age: 99,
      gender: "Male",
      email: "admin@email.com",
      username: "admin",
      phone: "123456",
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
