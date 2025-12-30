
import React from 'react';
import { Product } from '../types';

interface Props {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<Props> = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center space-y-4 opacity-30">
        <span className="text-6xl">🏜️</span>
        <p className="font-black uppercase tracking-widest">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => !product.isOutOfStock && onProductClick(product)}
          className={`group relative bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl active:scale-95 transition-all duration-300 cursor-pointer border border-transparent ${product.isOutOfStock ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:border-emerald-500'}`}
        >
          {product.isOutOfStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-black uppercase text-xs tracking-tighter transform -rotate-12">Sold Out</span>
            </div>
          )}
          
          <div className="h-56 overflow-hidden relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl font-black text-emerald-600 shadow-lg">
              ${product.price.toFixed(2)}
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-black text-gray-900 leading-none mb-2">{product.name}</h3>
            <p className="text-gray-400 text-sm font-medium line-clamp-2 leading-snug">{product.description}</p>
            
            <div className="mt-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Premium Selection</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
