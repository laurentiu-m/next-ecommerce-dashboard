export type Customer = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  username: string;
  phone: string;
  role: string;
};

export type Product = {
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  category: string;
};

export type Category = {
  name: string;
  slug: string;
};
