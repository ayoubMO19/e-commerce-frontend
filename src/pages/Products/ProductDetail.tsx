import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { productService } from "../../services/api";
import { useCart } from "../../hooks/useCart";
import type { ProductResponseDTO } from "../../types/api";

// Product detail page
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await productService.getById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error al cargar el producto", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Add product to cart
  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    await addToCart(product);
    setIsAdding(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <p className="text-gray-500">Producto no encontrado</p>
        <Link to="/products" className="font-bold text-black underline">Volver a la tienda</Link>
      </div>
    );
  }

  // Render product detail
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <img
            src={product.urlImage}
            alt={product.name}
            className="h-full w-full object-contain p-8 transition-transform duration-500 hover:scale-110"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute left-6 top-6 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
              ¡Últimas {product.stock} unidades!
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center space-y-8">
          <header className="space-y-4">
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gray-500">
              {product.categoryName}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              {product.name}
            </h1>
            <p className="text-3xl font-light text-gray-900">
              {product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </p>
          </header>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Descripción</h3>
            <p className="leading-relaxed text-gray-600">
              {product.description || "Sin descripción disponible para este producto."}
            </p>
          </div>
          <div className="space-y-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-black py-5 text-sm font-bold text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-500"
            >
              {product.stock === 0 ? (
                "Sin Stock"
              ) : isAdding ? (
                "Añadiendo..."
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Añadir al carrito
                </>
              )}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-3">
            <div className="flex items-center gap-3 text-gray-500">
              <Truck className="h-5 w-5 text-black" />
              <span className="text-xs font-medium">Envío Gratis</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <RotateCcw className="h-5 w-5 text-black" />
              <span className="text-xs font-medium">30 días devolución</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <ShieldCheck className="h-5 w-5 text-black" />
              <span className="text-xs font-medium">Garantía VEXA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}