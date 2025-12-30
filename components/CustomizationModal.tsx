
import React, { useState } from 'react';
import { Product, ProductOption } from '../types';

interface Props {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, options: ProductOption[]) => void;
}

const CustomizationModal: React.FC<Props> = ({ product, onClose, onAdd }) => {
  const [selectedOptions, setSelectedOptions] = useState<ProductOption[]>([]);

  const toggleOption = (option: ProductOption) => {
    setSelectedOptions(prev => 
      prev.find(o => o.id === option.id)
      ? prev.filter(o => o.id !== option.id)
      : [...prev, option]
    );
  };

  const currentPrice = product.price + selectedOptions.reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] animate-scale-in">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left: Product Image */}
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img 
              src={product.image} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" 
              alt={product.name} 
            />
          </div>

          {/* Right: Options */}
          <div className="md:w-1/2 p-8 flex flex-col bg-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">{product.name}</h2>
                <p className="text-gray-500 text-sm mt-2">{product.description}</p>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-3xl text-gray-300 active:scale-90"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              <h3 className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Add Extras</h3>
              <div className="grid grid-cols-1 gap-3 overflow-y-auto max-h-[300px] pr-2">
                {product.options.map(option => {
                  const isSelected = selectedOptions.some(o => o.id === option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(option)}
                      className={`flex justify-between items-center p-5 rounded-3xl border-2 transition-all duration-200 active:scale-95 ${
                        isSelected 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm' 
                        : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-bold">{option.name}</span>
                      <span className={`text-sm font-black ${isSelected ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {option.price > 0 ? `+$${option.price.toFixed(2)}` : 'FREE'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total for item</span>
                <span className="text-3xl font-black text-emerald-600">${currentPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => onAdd(product, selectedOptions)}
                className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] text-xl font-black shadow-xl shadow-emerald-100 active:scale-95 transition-all uppercase tracking-tight"
              >
                Confirm Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
