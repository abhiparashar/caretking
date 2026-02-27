export interface Product {
  id: string;
  name: string;
  category: "rings" | "necklaces" | "earrings" | "bracelets";
  price: number;
  materials: Material[];
  description: string;
  image: string;
  model3d?: string;
  featured?: boolean;
}

export type Material = "gold" | "silver" | "rose-gold" | "platinum";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMaterial: Material;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  image: string;
  products: string[];
}
