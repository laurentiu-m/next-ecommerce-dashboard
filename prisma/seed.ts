import { api } from "@/lib/api";
import {
  createCategories,
  createProducts,
  createUsers,
} from "@/lib/createPrisma";
import { prisma } from "@/lib/prisma";

const main = async () => {
  const users = await api.getUsers();
  const categories = await api.getCategories();
  const products = await api.getProducts();

  await createUsers(users);
  await createCategories(categories);
  await createProducts(products);

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
