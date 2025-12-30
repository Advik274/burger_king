
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
    <aside className="w-80 bg-white border-l flex flex-col shadow-2xl shrink-0">
      <div className="p-6 border-b">
        <h2 className="text-xl font-extrabold flex items-center justify-between">
          MY ORDER
          <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-sm">{items.length}</span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50 space-y-4">
            <span className="text-6xl">🛒</span>
            <p className="font-bold">Your cart is empty</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.cartId} className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-800">{item.product.name}</h4>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">
                    {item.selectedOptions.map(o => o.name).join(', ')}
                  </div>
                </div>
                <span className="font-bold text-emerald-700">${(item.totalPrice * item.quantity).toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onUpdateQuantity(item.cartId, -1)}
                  className="w-10 h-10 rounded-full bg-white shadow-sm border flex items-center justify-center text-2xl font-bold"
                >
                  −
                </button>
                <span className="text-lg font-bold w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.cartId, 1)}
                  className="w-10 h-10 rounded-full bg-emerald-600 text-white shadow-sm flex items-center justify-center text-2xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 bg-gray-50 border-t space-y-4">
        <div className="flex justify-between items-center text-2xl font-black">
          <span>Total</span>
          <span className="text-emerald-600">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className={`w-full py-5 rounded-2xl text-xl font-extrabold uppercase tracking-wide transition-all ${
            items.length > 0 
            ? 'bg-emerald-600 text-white shadow-lg active:scale-95' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
};

export default CartSidebar;
