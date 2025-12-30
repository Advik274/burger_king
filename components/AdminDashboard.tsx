
import React, { useState } from 'react';
import { Product, Category } from '../types';

interface Props {
  products: Product[];
  categories: Category[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ products, categories, onAddProduct, onDeleteProduct, onLogout }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: categories[0].id,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    onAddProduct({
      id: `p-${Date.now()}`,
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      categoryId: newProduct.categoryId,
      image: newProduct.image,
      options: []
    });

    setNewProduct({
      name: '',
      description: '',
      price: '',
      categoryId: categories[0].id,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'
    });
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 text-white p-2 rounded-lg font-bold">QB</div>
          <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">Admin Console</h1>
        </div>
        <button 
          onClick={onLogout}
          className="text-gray-500 font-bold hover:text-red-500 transition-colors flex items-center space-x-1"
        >
          <span>Logout</span>
          <span>🚪</span>
        </button>
      </header>

      <div className="max-w-6xl w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar / Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-2xl">
                <span className="block text-2xl font-black text-emerald-600">{products.length}</span>
                <span className="text-xs font-bold text-emerald-800/60 uppercase">Items</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl">
                <span className="block text-2xl font-black text-blue-600">{categories.length}</span>
                <span className="text-xs font-bold text-blue-800/60 uppercase">Cats</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-200 active:scale-95 transition-all"
          >
            {isAdding ? 'Close Form' : '+ Add New Item'}
          </button>

          {isAdding && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 space-y-4 animate-in slide-in-from-top duration-300">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Item Name</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                  placeholder="e.g. Veggie Wrap"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                <select 
                  value={newProduct.categoryId}
                  onChange={e => setNewProduct({...newProduct, categoryId: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Price ($)</label>
                <input 
                  type="number" step="0.01"
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="0.00"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold">Save Item</button>
            </form>
          )}
        </div>

        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-black text-gray-900">Current Inventory</h2>
          <div className="grid grid-cols-1 gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <img src={product.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                  <div>
                    <h4 className="font-bold text-gray-900">{product.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-gray-400 uppercase">{categories.find(c => c.id === product.categoryId)?.name}</span>
                      <span className="text-emerald-600 font-black">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onDeleteProduct(product.id)}
                  className="p-3 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
