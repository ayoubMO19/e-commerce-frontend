import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService, orderService } from '../../services/api';
import type { CartResponseDTO } from '../../types/api';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartResponseDTO | null>(null);
  const [shippingAddress, setShippingAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await cartService.getCart();
        setCart(data);
        if (data.items.length === 0) {
          navigate('/cart'); // Redirigir si el carrito está vacío
        }
      } catch (error) {
        console.error("Error al cargar el carrito", error);
      }
    };
    fetchCart();
  }, [navigate]);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.trim()) return;

    setIsLoading(true);
    try {
      // Creamos la orden en el backend
      const order = await orderService.createOrder({ shippingAddress });
      
      //  Navegamos a la página de pago pasando el ID de la orden
      navigate(`/payment/${order.orderId}`);
    } catch {
      alert("Error al crear el pedido. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!cart) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LADO IZQUIERDO: FORMULARIO */}
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Envío</h1>
            <p className="text-zinc-400 text-xs font-black uppercase tracking-widest mt-2">Introduce los detalles de entrega</p>
          </div>

          <form onSubmit={handleCreateOrder} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Dirección Completa</label>
              <textarea
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Calle, Número, Piso, Ciudad y Código Postal"
                className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-[24px] text-sm font-bold focus:outline-none focus:border-black focus:bg-white transition-all min-h-[120px] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !shippingAddress.trim()}
              className="w-full bg-black text-white py-5 rounded-[24px] font-black uppercase tracking-[3px] text-xs hover:bg-zinc-800 transition-all disabled:opacity-50"
            >
              {isLoading ? "Procesando..." : "Continuar al Pago"}
            </button>
          </form>
        </div>

        {/* LADO DERECHO: RESUMEN DEL PEDIDO */}
        <div className="bg-zinc-50 rounded-[40px] p-8 h-fit space-y-8">
          <h2 className="text-xl font-black uppercase tracking-tighter">Resumen</h2>
          
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4">
                <img 
                  src={item.urlImage} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-2xl object-cover bg-white border border-zinc-100" 
                />
                <div className="flex-1">
                  <h4 className="text-sm font-black uppercase tracking-tight leading-none">{item.name}</h4>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Cant: {item.quantity}</p>
                </div>
                <span className="text-sm font-black italic">{item.total.toFixed(2)}€</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-200 space-y-2">
            <div className="flex justify-between text-zinc-400 text-[10px] font-black uppercase tracking-widest">
              <span>Subtotal</span>
              <span>{cart.totalPrice.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-[10px] font-black uppercase tracking-widest">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-sm font-black uppercase tracking-widest">Total</span>
              <span className="text-2xl font-black tracking-tighter">{cart.totalPrice.toFixed(2)}€</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;