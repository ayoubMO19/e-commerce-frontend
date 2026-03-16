import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../services/api';
import type { OrdersResponseDTO } from '../../types/api';
import { CreditCard, Package, Clock, XCircle, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

// My Orders page
const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrdersResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getMyOrders();
        setOrders(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error("Error al cargar pedidos", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Toggle order expansion
  const toggleOrder = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Get status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-50 text-green-600 border-green-100';
      case 'PENDING': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-zinc-50 text-zinc-600 border-zinc-100';
    }
  };

  // Show loading spinner
  if (isLoading) return <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-b-2 border-black rounded-full" /></div>;

  // Render orders
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Mis Pedidos</h1>
        <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[3px] mt-2">Gestiona tus compras y envíos</p>
      </header>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 rounded-[32px] border-2 border-dashed border-zinc-200">
          <Package className="mx-auto h-12 w-12 text-zinc-300 mb-4" />
          <p className="text-sm font-bold uppercase text-zinc-500">Aún no tienes pedidos</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className={`bg-white border transition-all duration-300 rounded-[32px] overflow-hidden ${expandedOrder === order.orderId ? 'border-black shadow-2xl shadow-black/5' : 'border-zinc-100'
                }`}
            >
              <div
                onClick={() => toggleOrder(order.orderId)}
                className="p-6 cursor-pointer flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${order.status === 'PAID' ? 'bg-green-50' : 'bg-zinc-50'}`}>
                    <Package size={20} className={order.status === 'PAID' ? 'text-green-600' : 'text-zinc-400'} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black uppercase tracking-tighter italic">Orden #{order.orderId}</span>
                      <span className={`px-3 py-0.5 rounded-full text-[8px] font-black uppercase border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Clock size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-xl font-black tracking-tighter italic">{order.totalPrice.toFixed(2)}€</p>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase">Total</p>
                  </div>
                  {expandedOrder === order.orderId ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              {expandedOrder === order.orderId && (
                <div className="border-t border-zinc-50 bg-zinc-50/50 p-6 space-y-8 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Productos en este pedido</h4>
                    <div className="grid gap-4">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-zinc-100">
                          <img src={item.imageUrl} alt={item.productName} className="w-12 h-12 rounded-xl object-cover bg-zinc-50" />
                          <div className="flex-1">
                            <p className="text-xs font-black uppercase tracking-tight">{item.productName}</p>
                            <p className="text-[10px] text-zinc-400 font-bold italic">Cant: {item.quantity} x {item.priceAtPurchase.toFixed(2)}€</p>
                          </div>
                          <p className="text-sm font-black italic">{(item.quantity * item.priceAtPurchase).toFixed(2)}€</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-8 pt-4 border-t border-zinc-100">
                    <div className="space-y-2 max-w-xs">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        <MapPin size={12} /> Dirección de Envío
                      </h4>
                      <p className="text-xs font-bold text-zinc-600 leading-relaxed">
                        {order.shippingAddress}
                      </p>
                    </div>
                    <div className="flex items-end gap-3">
                      {order.status === 'PENDING' && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate(`/payment/${order.orderId}`); }}
                            className="bg-black text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-xl shadow-black/10"
                          >
                            <CreditCard size={14} /> Pagar ahora
                          </button>
                          <button className="p-3 border border-zinc-200 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      {order.status === 'PAID' && (
                        <div className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest bg-green-100/50 px-4 py-3 rounded-2xl border border-green-100">
                          <Package size={14} /> Listo para enviar
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;