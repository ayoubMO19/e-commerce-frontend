import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { FeaturedProducts } from "../components/FeaturedProducts";
import type { ProductResponseDTO } from "../types/api";

const mockProducts: ProductResponseDTO[] = [
  {
    productId: 1,
    name: "Zapatillas Urban Classic White",
    price: 89.99,
    description:
      "Diseño minimalista en blanco con suela de goma cómoda. Perfectas para el día a día.",
    urlImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    stock: 18,
  },
  {
    productId: 2,
    name: "Sneakers Sport Black",
    price: 119.0,
    description:
      "Zapatillas deportivas en negro con tecnología de amortiguación avanzada.",
    urlImage:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    stock: 12,
  },
  {
    productId: 3,
    name: "Running Shoes Gray",
    price: 99.5,
    description:
      "Zapatillas de running en gris con suela antideslizante y transpirable.",
    urlImage:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
    stock: 25,
  },
  {
    productId: 4,
    name: "Casual Sneakers Beige",
    price: 79.99,
    description:
      "Estilo casual en beige, ideales para combinar con cualquier outfit.",
    urlImage:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
    stock: 9,
  },
  {
    productId: 5,
    name: "High-Top Sneakers Navy",
    price: 129.0,
    description:
      "Zapatillas altas en azul marino con diseño moderno y cómodo.",
    urlImage:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
    stock: 34,
  },
  {
    productId: 6,
    name: "Minimalist White Sneakers",
    price: 95.99,
    description:
      "Diseño ultra minimalista en blanco, perfectas para un estilo limpio.",
    urlImage:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop",
    stock: 0,
  },
  {
    productId: 7,
    name: "Sport Running Shoes Red",
    price: 109.0,
    description:
      "Zapatillas deportivas en rojo con tecnología de respiración mejorada.",
    urlImage:
      "https://images.unsplash.com/photo-1605348532760-6753d4c5ca60?w=800&h=800&fit=crop",
    stock: 7,
  },
  {
    productId: 8,
    name: "Casual Canvas Sneakers",
    price: 69.99,
    description:
      "Zapatillas de lona casuales, ligeras y cómodas para uso diario.",
    urlImage:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop",
    stock: 41,
  },
  {
    productId: 9,
    name: "Premium Leather Sneakers",
    price: 149.99,
    description:
      "Zapatillas premium en cuero genuino con acabado de lujo.",
    urlImage:
      "https://images.unsplash.com/photo-1605348532760-6753d4c5ca60?w=800&h=800&fit=crop",
    stock: 15,
  },
  {
    productId: 10,
    name: "Trail Running Shoes",
    price: 139.0,
    description:
      "Zapatillas de trail running con suela de agarre superior para terrenos difíciles.",
    urlImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    stock: 22,
  },
  {
    productId: 11,
    name: "Retro Style Sneakers",
    price: 89.5,
    description:
      "Estilo retro con diseño clásico y colores vintage para un look único.",
    urlImage:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
    stock: 18,
  },
  {
    productId: 12,
    name: "Eco-Friendly Sneakers",
    price: 99.99,
    description:
      "Zapatillas sostenibles fabricadas con materiales reciclados.",
    urlImage:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
    stock: 30,
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <Categories />
      <FeaturedProducts products={mockProducts} />
    </div>
  );
}
