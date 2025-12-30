
import React from 'react';
import { Category } from '../types';

interface Props {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CategorySidebar: React.FC<Props> = ({ categories, selectedId, onSelect }) => {
  return (
    <aside className="w-32 bg-white border-r flex flex-col items-center py-4 space-y-4 shadow-inner overflow-y-auto shrink-0">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all ${
            selectedId === cat.id 
            ? 'bg-emerald-600 text-white shadow-lg scale-105' 
            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          <span className="text-3xl mb-1">{cat.icon}</span>
          <span className="text-xs font-bold uppercase">{cat.name}</span>
        </button>
      ))}
    </aside>
  );
};

export default CategorySidebar;
