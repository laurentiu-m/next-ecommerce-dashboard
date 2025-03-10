import { faker } from "@faker-js/faker";
import { Product, Customer, Category } from "@/types";

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
    const slug = slugify(product.title);

    const existingProduct = await prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (existingProduct) {
      continue;
    }

    await prisma.product.create({
      data: {
        slug,
        title: product.title,
        description: product.description,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
        thumbnail: product.thumbnail,
        categoryId: await getCategoryId(product.category),
        images: {
          create: product.images.map((imageUrl: string) => ({
            url: imageUrl,
          })),
        },
      },
    });
  }
};

export const createOrders = async () => {
  const customersPrisma = await prisma.customer.findMany();
  const productsPrisma = await prisma.product.findMany();

  for (const customer of customersPrisma) {
    const numberOfOrders = faker.number.int({ min: 1, max: 5 });

    for (let i = 0; i < numberOfOrders; i++) {
      const order = await prisma.order.create({
        data: {
          customerId: customer.id,
          total: 0,
        },
      });

      let orderTotal = 0;

      const numberOfItems = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < numberOfItems; j++) {
        const product = faker.helpers.arrayElement(productsPrisma);
        const quantity = faker.number.int({ min: 1, max: 5 });
        const linePrice = product.price * quantity;
        orderTotal += linePrice;

        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            quantity: quantity,
            price: product.price,
          },
        });
      }

      await prisma.order.update({
        where: { id: order.id },
        data: { total: orderTotal },
      });
    }
  }
};
