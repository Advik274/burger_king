
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left: Product Image */}
          <div className="md:w-1/2 h-64 md:h-auto">
            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
          </div>

          {/* Right: Options */}
          <div className="md:w-1/2 p-8 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.description}</p>
              </div>
              <button onClick={onClose} className="text-3xl text-gray-300">&times;</button>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Add Extras</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.options.map(option => {
                  const isSelected = selectedOptions.some(o => o.id === option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(option)}
                      className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${
                        isSelected 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                        : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <span className="font-bold">{option.name}</span>
                      <span className="text-sm font-semibold">
                        {option.price > 0 ? `+$${option.price.toFixed(2)}` : 'FREE'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-semibold">Total for item</span>
                <span className="text-2xl font-black text-emerald-600">${currentPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => onAdd(product, selectedOptions)}
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl text-xl font-bold shadow-xl active:scale-95 transition-transform uppercase"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
