
import React, { useState, useMemo, useEffect } from 'react';
import { AppState, Category, Product, CartItem, ProductOption, UserRole, Order, OrderStatus } from './types';
import { CATEGORIES, PRODUCTS as INITIAL_PRODUCTS } from './constants';
import CategorySidebar from './components/CategorySidebar';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import CustomizationModal from './components/CustomizationModal';
import OrderConfirmation from './components/OrderConfirmation';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import OrderTracking from './components/OrderTracking';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [lastOrderId, setLastOrderId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setAppState(role === UserRole.ADMIN ? AppState.ADMIN_DASHBOARD : AppState.HOME);
  };

  const logout = () => {
    setUserRole(null);
    setAppState(AppState.LOGIN);
    setCart([]);
  };

  const addToCart = (product: Product, options: ProductOption[]) => {
    const optionPrice = options.reduce((sum, opt) => sum + opt.price, 0);
    const newItem: CartItem = {
      cartId: `${product.id}-${Date.now()}`,
      product,
      quantity: 1,
      selectedOptions: options,
      totalPrice: product.price + optionPrice
    };
    setCart(prev => [...prev, newItem]);
    setCustomizingProduct(null);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
  }, [cart]);

  const placeOrder = async () => {
    if (cart.length === 0) return;
    const orderId = Math.floor(Math.random() * 900 + 100).toString();
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      total: totalPrice,
      status: OrderStatus.PENDING,
      timestamp: Date.now()
    };
    setActiveOrders(prev => [newOrder, ...prev]);
    setLastOrderId(orderId);
    setAppState(AppState.CONFIRMATION);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setActiveOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const toggleStock = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isOutOfStock: !p.isOutOfStock } : p));
  };

  const filteredProducts = useMemo(() => {
    const categoryFiltered = products.filter(p => p.categoryId === selectedCategory);
    if (!searchQuery) return categoryFiltered;
    return categoryFiltered.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, selectedCategory, searchQuery]);

  if (appState === AppState.LOGIN) return <LoginPage onLogin={handleLogin} />;
  if (appState === AppState.ADMIN_DASHBOARD) {
    return (
      <AdminDashboard 
        products={products} 
        categories={CATEGORIES} 
        orders={activeOrders}
        onUpdateStatus={updateOrderStatus}
        onToggleStock={toggleStock}
        onAddProduct={(p) => setProducts([p, ...products])}
        onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
        onLogout={logout}
      />
    );
  }

  if (appState === AppState.HOME) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-emerald-600 text-white cursor-pointer relative overflow-hidden" onClick={() => setAppState(AppState.MENU)}>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <button onClick={(e) => { e.stopPropagation(); logout(); }} className="absolute top-8 right-8 bg-white/10 px-6 py-2 rounded-full font-bold border border-white/20 z-10">Exit Kiosk</button>
        <button onClick={(e) => { e.stopPropagation(); setAppState(AppState.ORDER_TRACKING); }} className="absolute top-8 left-8 bg-white/10 px-6 py-2 rounded-full font-bold border border-white/20 z-10">Track Orders</button>
        
        <div className="text-center z-10 space-y-6 animate-in fade-in zoom-in duration-700">
          <div className="text-9xl mb-4">🍔</div>
          <h1 className="text-8xl font-black uppercase tracking-tighter">QuickBite</h1>
          <p className="text-2xl font-medium tracking-widest opacity-80 uppercase">The Future of Fast Food</p>
          <div className="mt-16 bg-white text-emerald-600 px-12 py-6 rounded-3xl text-3xl font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-bounce">
            TAP TO ORDER
          </div>
        </div>
      </div>
    );
  }

  if (appState === AppState.ORDER_TRACKING) return <OrderTracking orders={activeOrders} onBack={() => setAppState(AppState.HOME)} />;
  if (appState === AppState.CONFIRMATION) return <OrderConfirmation orderNumber={lastOrderId} onReset={() => { setCart([]); setAppState(AppState.HOME); }} />;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="h-20 bg-white border-b flex items-center justify-between px-8 shadow-sm shrink-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-black text-emerald-600 tracking-tighter">QuickBite</h2>
          <div className="h-8 w-px bg-gray-200"></div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            <input 
              type="text" 
              placeholder="Search menu..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 bg-gray-100 rounded-2xl w-80 focus:ring-2 focus:ring-emerald-500 outline-none font-medium transition-all"
            />
          </div>
        </div>
        <button onClick={() => setAppState(AppState.HOME)} className="text-gray-400 font-bold hover:text-red-500 transition-colors">Cancel Order</button>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <CategorySidebar categories={CATEGORIES} selectedId={selectedCategory} onSelect={(id) => { setSelectedCategory(id); setSearchQuery(''); }} />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900">{CATEGORIES.find(c => c.id === selectedCategory)?.name}</h1>
            <p className="text-gray-500 font-medium">Select your favorites below</p>
          </div>
          <ProductGrid products={filteredProducts} onProductClick={setCustomizingProduct} />
        </div>
        <CartSidebar items={cart} totalPrice={totalPrice} onUpdateQuantity={updateQuantity} onCheckout={placeOrder} />
      </main>

      {customizingProduct && (
        <CustomizationModal product={customizingProduct} onClose={() => setCustomizingProduct(null)} onAdd={addToCart} />
      )}
    </div>
  );
};

export default App;
