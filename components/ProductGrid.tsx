
import React from 'react';
import { Product } from '../types';

interface Props {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<Props> = ({ products, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onProductClick(product)}
          className="bg-white rounded-3xl overflow-hidden shadow-md active:scale-95 transition-transform cursor-pointer border border-transparent active:border-emerald-500"
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-800 leading-tight">{product.name}</h3>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
