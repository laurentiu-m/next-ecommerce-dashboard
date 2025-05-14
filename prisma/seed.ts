import { categoriesPrisma } from "@/constants";
import { api } from "@/lib/api";
import {
  createCategories,
  createCustomers,
  createOrders,
  createProducts,
  prisma,
} from "@/lib/prisma";

const main = async () => {
  const categories = categoriesPrisma;
  const customers = await api.getCustomers();
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
