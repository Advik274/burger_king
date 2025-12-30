
import React, { useEffect } from 'react';

interface Props {
  orderNumber: string;
  onReset: () => void;
}

const OrderConfirmation: React.FC<Props> = ({ orderNumber, onReset }) => {
  useEffect(() => {
    const timer = setTimeout(onReset, 10000);
    return () => clearTimeout(timer);
  }, [onReset]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-emerald-600 text-white p-8 animate-in fade-in duration-500">
      <div className="bg-white text-gray-900 rounded-[50px] p-12 text-center max-w-lg w-full shadow-2xl space-y-8">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-6xl mx-auto">
          ✓
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">Order Success!</h2>
          <p className="text-gray-500 font-medium">Please take your receipt and wait for your number.</p>
        </div>

        <div className="py-8 border-y-2 border-dashed border-gray-200">
          <span className="block text-gray-400 font-bold uppercase text-sm mb-2">Your Order Number</span>
          <span className="text-8xl font-black text-emerald-600 font-mono tracking-widest">{orderNumber}</span>
        </div>

        <button
          onClick={onReset}
          className="w-full py-5 bg-emerald-600 text-white rounded-2xl text-xl font-bold active:scale-95 transition-transform"
        >
          DONE
        </button>

        <p className="text-gray-400 text-sm animate-pulse">Automatically resetting in 10 seconds...</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
