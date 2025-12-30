
import React from 'react';
import { Order, OrderStatus } from '../types';

interface Props {
  orders: Order[];
  onBack: () => void;
}

const OrderTracking: React.FC<Props> = ({ orders, onBack }) => {
  const pendingOrders = orders.filter(o => o.status !== OrderStatus.COMPLETED);

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col p-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-6xl font-black italic tracking-tighter">ORDER <span className="text-emerald-500">STATUS</span></h1>
        <button onClick={onBack} className="bg-white/10 px-8 py-4 rounded-3xl font-black uppercase text-sm tracking-widest border border-white/20">Go Back</button>
      </div>

      <div className="grid grid-cols-2 gap-12 flex-1">
        <div className="bg-white/5 rounded-[60px] p-12 space-y-8">
          <div className="flex items-center space-x-4 border-b border-white/10 pb-6">
             <div className="w-4 h-4 rounded-full bg-orange-500 animate-pulse"></div>
             <h2 className="text-3xl font-bold uppercase tracking-widest text-orange-500">PREPARING</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {pendingOrders.filter(o => [OrderStatus.PENDING, OrderStatus.PREPARING].includes(o.status)).map(o => (
              <span key={o.id} className="text-6xl font-mono font-black text-white/30">{o.id}</span>
            ))}
          </div>
        </div>

        <div className="bg-emerald-500 rounded-[60px] p-12 space-y-8 text-white shadow-[0_0_100px_rgba(16,185,129,0.3)]">
          <div className="flex items-center space-x-4 border-b border-white/20 pb-6">
             <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
             <h2 className="text-3xl font-bold uppercase tracking-widest">READY TO PICKUP</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {pendingOrders.filter(o => o.status === OrderStatus.READY).map(o => (
              <div key={o.id} className="bg-white text-emerald-600 p-8 rounded-[40px] text-center shadow-xl">
                <span className="text-8xl font-black font-mono">{o.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 font-bold uppercase tracking-[0.5em] text-sm">
        Thank you for choosing QuickBite
      </div>
    </div>
  );
};

export default OrderTracking;
