import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart();

  const shippingCost = 0; // Envío gratis
  const finalTotal = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Tu carrito está vacío
          </h2>
          <p className="text-sm text-gray-500">
            Añade productos para comenzar tu compra
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-gray-900 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          Explorar productos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Carrito de compras
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {cartCount} {cartCount === 1 ? "producto" : "productos"} en tu
            carrito
          </p>
        </div>
        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            Vaciar carrito
          </button>
        )}
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Columna izquierda: Lista de productos */}
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => (
            <article
              key={item.productId}
              className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <img
                  src={item.urlImage}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {item.price.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-900 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-900 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {(item.price * item.quantity).toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Columna derecha: Resumen */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Resumen del pedido
            </h2>

            <div className="space-y-4 border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  {cartTotal.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium text-green-600">Gratis</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-base font-semibold text-gray-900">Total</span>
              <span className="text-xl font-semibold text-gray-900">
                {finalTotal.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-xl border-2 border-gray-900 bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              Finalizar compra
            </button>

            <Link
              to="/products"
              className="mt-3 block w-full text-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
