
import React, { useState } from 'react';
import { Product, Category, Order, OrderStatus } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props {
  products: Product[];
  categories: Category[];
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onToggleStock: (id: string) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ products, categories, orders, onUpdateStatus, onToggleStock, onAddProduct, onDeleteProduct, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'analytics'>('orders');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', categoryId: categories[0].id });

  const generateDescription = async () => {
    if (!newProduct.name) return alert("Enter item name first!");
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, appetizing, one-sentence description for a fast food item named "${newProduct.name}". Make it sound professional and mouth-watering.`
      });
      setNewProduct(prev => ({ ...prev, description: response.text || '' }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter">BACKOFFICE <span className="text-emerald-600">PRO</span></h1>
          <nav className="flex space-x-2">
            {(['orders', 'inventory', 'analytics'] as const).map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={onLogout} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors">Logout</button>
      </header>

      <main className="p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900">Live Kitchen Display</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.filter(o => o.status !== OrderStatus.COMPLETED).map(order => (
                <div key={order.id} className="bg-white rounded-3xl p-6 shadow-sm border-t-8 border-emerald-500 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-black font-mono">#{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === OrderStatus.PENDING ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex-1 space-y-3 mb-6">
                    {order.items.map(item => (
                      <div key={item.cartId} className="flex justify-between items-start">
                        <span className="font-bold text-gray-800">x{item.quantity} {item.product.name}</span>
                        <div className="text-[10px] text-gray-400 flex flex-col text-right">
                          {item.selectedOptions.map(o => <span key={o.id}>{o.name}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    {order.status === OrderStatus.PENDING && (
                      <button onClick={() => onUpdateStatus(order.id, OrderStatus.PREPARING)} className="bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm">Start Cooking</button>
                    )}
                    {order.status === OrderStatus.PREPARING && (
                      <button onClick={() => onUpdateStatus(order.id, OrderStatus.READY)} className="bg-blue-600 text-white py-3 rounded-xl font-bold text-sm">Ready</button>
                    )}
                    <button onClick={() => onUpdateStatus(order.id, OrderStatus.COMPLETED)} className="bg-gray-100 text-gray-600 py-3 rounded-xl font-bold text-sm">Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-xl font-black">Add Menu Item</h3>
                <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" />
                <div className="flex space-x-2">
                  <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="flex-1 p-4 bg-gray-50 rounded-2xl outline-none" />
                  <button onClick={generateDescription} disabled={isGenerating} className="px-4 bg-emerald-50 text-emerald-600 rounded-2xl font-bold text-xs">{isGenerating ? '...' : 'AI ✨'}</button>
                </div>
                <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                <select value={newProduct.categoryId} onChange={e => setNewProduct({...newProduct, categoryId: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <button onClick={() => onAddProduct({ id: `p-${Date.now()}`, ...newProduct, price: parseFloat(newProduct.price), options: [], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' } as any)} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase shadow-xl shadow-emerald-100">Save Item</button>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-6 rounded-3xl flex items-center justify-between shadow-sm border border-transparent hover:border-emerald-100 transition-all">
                  <div className="flex items-center space-x-4">
                    <img src={p.image} className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                      <h4 className="font-black text-lg">{p.name}</h4>
                      <p className="text-xs text-gray-400 font-bold uppercase">{categories.find(c => c.id === p.categoryId)?.name} • ${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => onToggleStock(p.id)} className={`px-4 py-2 rounded-xl text-xs font-bold ${p.isOutOfStock ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {p.isOutOfStock ? 'Out of Stock' : 'In Stock'}
                    </button>
                    <button onClick={() => onDeleteProduct(p.id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
                  <span className="text-gray-400 text-xs font-bold uppercase">Total Revenue</span>
                  <p className="text-3xl font-black text-emerald-600">${orders.reduce((s,o) => s + o.total, 0).toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
                  <span className="text-gray-400 text-xs font-bold uppercase">Orders Today</span>
                  <p className="text-3xl font-black text-blue-600">{orders.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
                  <span className="text-gray-400 text-xs font-bold uppercase">Average Check</span>
                  <p className="text-3xl font-black text-purple-600">${(orders.reduce((s,o) => s + o.total, 0) / (orders.length || 1)).toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
                  <span className="text-gray-400 text-xs font-bold uppercase">Active Tables</span>
                  <p className="text-3xl font-black text-orange-600">8</p>
                </div>
             </div>
             
             <div className="bg-white p-10 rounded-[40px] shadow-sm">
                <h3 className="text-xl font-black mb-8">Weekly Sales Trend</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {[45, 60, 55, 80, 70, 95, 85].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group">
                      <div style={{ height: `${val}%` }} className="w-full bg-emerald-100 rounded-t-xl group-hover:bg-emerald-600 transition-all relative">
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-xs opacity-0 group-hover:opacity-100">${val * 10}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Day {i+1}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
