import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService, orderService } from '../../services/api';
import type { CartResponseDTO } from '../../types/api';
import { AddressForm } from '../../components/AddressForm';

// Checkout page component
const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartResponseDTO | null>(null);
  const [shippingAddress, setShippingAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await cartService.getCart();
        setCart(data);
        if (data.items.length === 0) {
          navigate('/cart');
        }
      } catch (error) {
        console.error("Error al cargar el carrito", error);
      }
    };
    fetchCart();
  }, [navigate]);

  // Handle address change
  const handleAddressChange = useCallback((fullAddr: string, isValid: boolean) => {
    setShippingAddress(fullAddr);
    setIsAddressValid(isValid);
  }, []);

  // Handle create order
  const handleCreateOrder = async () => {
    if (!isAddressValid || isLoading) return;

    setIsLoading(true);
    try {
      const order = await orderService.createOrder({ shippingAddress });
      navigate(`/payment/${order.orderId}`); // Redirect to payment page
    } catch {
      alert("Error al crear el pedido. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!cart) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Envío</h1>
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[3px] mt-3 ml-1">
              Detalles de entrega
            </p>
          </div>

          <div className="bg-white border border-zinc-100 rounded-[32px] p-6 sm:p-10 shadow-sm shadow-zinc-200/50">
            <AddressForm onAddressChange={handleAddressChange} />
          </div>
        </div>
        <div className="lg:sticky lg:top-24 space-y-8">
          <div className="bg-zinc-50 rounded-[40px] p-8 space-y-8">
            <h2 className="text-xl font-black uppercase tracking-tighter italic">Tu Pedido</h2>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 group">
                  <img
                    src={item.urlImage}
                    alt={item.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-white border border-zinc-100"
                  />
                  <div className="flex-1">
                    <h4 className="text-[11px] font-black uppercase tracking-tight leading-none">{item.name}</h4>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1 italic">Vexa Line</p>
                  </div>
                  <span className="text-sm font-black italic">{item.total.toFixed(2)}€</span>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-zinc-200 space-y-3">
              <div className="flex justify-between text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{cart.totalPrice.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                <span>Logística Envío</span>
                <span className="text-black italic">Gratis</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-zinc-100 mt-2">
                <span className="text-sm font-black uppercase tracking-widest leading-none">Total</span>
                <span className="text-3xl font-black tracking-tighter italic leading-none">{cart.totalPrice.toFixed(2)}€</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={handleCreateOrder}
                disabled={isLoading || !isAddressValid}
                className="w-full bg-black text-white py-6 rounded-[24px] font-black uppercase tracking-[3px] text-xs hover:bg-zinc-800 transition-all disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed shadow-xl shadow-black/5"
              >
                {isLoading ? "Validando Datos..." : "Pagar Ahora"}
              </button>

              {!isAddressValid && (
                <p className="text-[9px] text-center text-zinc-400 font-bold uppercase tracking-widest mt-4">
                  * Completa la dirección para habilitar el pago
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-zinc-400 px-4">
            <div className="h-[1px] flex-1 bg-zinc-100"></div>
            <span className="text-[8px] font-black uppercase tracking-widest">Secure Checkout</span>
            <div className="h-[1px] flex-1 bg-zinc-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;