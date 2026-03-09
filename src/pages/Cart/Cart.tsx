import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { notify } from "../../utils/notifications";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart();

  const [isProcessing, setIsProcessing] = useState<number | null>(null);

  // Memorizamos el total para evitar recalcular en renders por estados locales (como isProcessing)
  const finalTotal = useMemo(() => {
    const shippingCost = 0;
    return cartTotal + shippingCost;
  }, [cartTotal]);

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsProcessing(productId);
    try {
      await updateQuantity(productId, newQuantity);
    } finally {
      setIsProcessing(null);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Tu carrito está vacío</h2>
          <p className="text-sm text-gray-500">Añade productos para comenzar tu compra</p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-gray-900 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
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
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Carrito de compras</h1>
          <p className="mt-1 text-sm text-gray-500">
            {cartCount} {cartCount === 1 ? "producto" : "productos"} en tu carrito
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          Vaciar carrito
        </button>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => (
            <article
              key={item.productId}
              className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <Link to={`/products/${item.productId}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted hover:opacity-80 transition-opacity">
                <img src={item.urlImage} alt={item.name} className="h-full w-full object-contain p-2" />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to={`/products/${item.productId}`}>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:underline">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-xs text-gray-500 font-medium">
                      {item.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })} / ud.
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1 || isProcessing === item.productId}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-900 hover:text-gray-900 disabled:opacity-30"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-900">
                        {isProcessing === item.productId ? <Loader2 className="h-3 w-3 animate-spin mx-auto text-gray-300" /> : item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock || isProcessing === item.productId}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-900 hover:text-gray-900 disabled:opacity-30"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 ml-0.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${item.quantity >= item.stock ? "bg-red-500" : "bg-green-500"}`} />
                      <p className={`text-[11px] font-medium tracking-tight ${item.quantity >= item.stock ? "text-red-600" : "text-gray-500"}`}>
                        {item.quantity >= item.stock ? `Máx: ${item.stock}` : `En stock: ${item.stock}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:ml-auto sm:justify-end sm:gap-3">
                    <p className="text-base font-bold tracking-tight text-gray-950">
                      {(item.price * item.quantity).toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
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
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Resumen del pedido</h2>
            <div className="space-y-4 border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  {cartTotal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
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
                {finalTotal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
              </span>
            </div>
            <button
              onClick={() => notify.info("Pasarela de pago en desarrollo.")}
              className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}