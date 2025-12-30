
import React from 'react';
import { Category } from '../types';

interface Props {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CategorySidebar: React.FC<Props> = ({ categories, selectedId, onSelect }) => {
  return (
    <aside className="w-28 bg-white border-r flex flex-col items-center py-6 space-y-6 shadow-[inset_-2px_0_10px_rgba(0,0,0,0.02)] overflow-y-auto shrink-0 z-10">
      {categories.map((cat, index) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 group animate-slide-up ${
            selectedId === cat.id 
            ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100 scale-110' 
            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:scale-105 active:scale-90'
          }`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <span className={`text-3xl mb-1 transition-transform group-hover:rotate-12 ${selectedId === cat.id ? 'animate-bounce' : ''}`}>
            {cat.icon}
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest">
            {cat.name}
          </span>
        </button>
      ))}
    </aside>
  );
};

export default CategorySidebar;
