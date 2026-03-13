import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import type { StripeElementsOptions, Appearance } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import { paymentService } from '../../services/api';
import { notify } from '../../utils/notifications';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface StripeCheckoutProps {
  orderId: number;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ orderId }) => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const initPayment = async () => {
      try {
        const secret = await paymentService.createIntent(orderId);
        setClientSecret(secret);
      } catch (error) {
        console.error("Error al inicializar el pago:", error);
        // Notificamos y redirigimos
        notify.error("No pudimos conectar con la pasarela. Gestiona el pago desde tus pedidos.");
        setTimeout(() => navigate('/my-orders'), 3000);
      }
    };
    initPayment();
  }, [orderId, navigate]);
  
  // Configuración de apariencia
  const appearance: Appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#000000',
      colorBackground: '#f4f4f5',
      colorText: '#000000',
      borderRadius: '20px',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
    },
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm">
        <div className="text-center mb-10">
          <div className="bg-black text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-4">
            V
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Finalizar Pago</h1>
          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[3px] mt-2">
            Orden #{orderId}
          </p>
        </div>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm orderId={orderId} />
          </Elements>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-8 h-8 border-4 border-zinc-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Conectando con Stripe...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeCheckout;