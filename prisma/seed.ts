import { api } from "@/lib/api";
import {
  createCategories,
  createProducts,
  createCustomers,
  createOrders,
} from "@/lib/create-prisma";
import { prisma } from "@/lib/prisma";

const main = async () => {
  const customers = await api.getCustomers();
  const categories = await api.getCategories();
  const products = await api.getProducts();

  await createCustomers(customers);
  await createCategories(categories);
  await createProducts(products);
  await createOrders();

  console.log("Database seeded successfully");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
