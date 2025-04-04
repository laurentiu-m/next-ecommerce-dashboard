export type CustomerApi = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  username: string;
  phone: string;
  role: string;
};

export type ProductApi = {
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  category: string;
};

export type CategoryApi = {
  name: string;
  slug: string;
};
