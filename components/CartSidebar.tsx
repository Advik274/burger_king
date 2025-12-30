
import React from 'react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  totalPrice: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<Props> = ({ items, totalPrice, onUpdateQuantity, onCheckout }) => {
  return (
    <aside className="w-80 bg-white border-l flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.05)] shrink-0 z-10">
      <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
        <h2 className="text-xl font-black tracking-tight">
          MY ORDER
        </h2>
        <span className="bg-emerald-600 text-white px-3 py-1 rounded-xl text-xs font-black animate-pop" key={items.length}>
          {items.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4 animate-fade-in">
            <span className="text-7xl grayscale opacity-20">🛒</span>
            <p className="font-bold uppercase text-xs tracking-widest">Your cart is empty</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div 
              key={item.cartId} 
              className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 animate-slide-right overflow-hidden group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-2">
                  <h4 className="font-black text-gray-800 leading-tight">{item.product.name}</h4>
                  <div className="text-[9px] text-gray-400 uppercase font-black tracking-tighter mt-1 space-x-1">
                    {item.selectedOptions.length > 0 ? (
                      item.selectedOptions.map(o => (
                        <span key={o.id} className="bg-gray-100 px-1.5 py-0.5 rounded-md inline-block mb-1">{o.name}</span>
                      ))
                    ) : (
                      <span className="text-gray-300">No extras</span>
                    )}
                  </div>
                </div>
                <span className="font-black text-emerald-600 whitespace-nowrap">${(item.totalPrice * item.quantity).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-gray-100 p-1 rounded-2xl">
                  <button 
                    onClick={() => onUpdateQuantity(item.cartId, -1)}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg font-black text-gray-400 hover:text-red-500 transition-colors active:scale-90"
                  >
                    −
                  </button>
                  <span className="text-sm font-black w-10 text-center animate-pop" key={item.quantity}>{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.cartId, 1)}
                    className="w-10 h-10 rounded-xl bg-emerald-600 text-white shadow-md flex items-center justify-center text-lg font-black hover:bg-emerald-700 transition-colors active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 bg-white border-t border-gray-100 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Grand Total</span>
          <span className="text-3xl font-black text-emerald-600 tracking-tight animate-pop" key={totalPrice}>
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className={`w-full py-6 rounded-[2rem] text-xl font-black uppercase tracking-tight transition-all duration-300 transform ${
            items.length > 0 
            ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100 active:scale-95 hover:bg-emerald-700' 
            : 'bg-gray-100 text-gray-300 cursor-not-allowed grayscale'
          }`}
        >
          Check out
        </button>
      </div>
    </aside>
  );
};

export default CartSidebar;
