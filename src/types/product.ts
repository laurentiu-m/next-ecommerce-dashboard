export type ProductType = {
  category: {
    name: string;
    id: string;
    slug: string;
  };
} & {
  id: string;
  createdAt: Date;
  price: number;
  slug: string;
  title: string;
  description: string;
  rating: number;
  stock: number;
  thumbnail: string;
  categoryId: string;
};
