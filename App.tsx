
import React, { useState, useCallback, useMemo } from 'react';
import { AppState, Category, Product, CartItem, ProductOption } from './types';
import { CATEGORIES, PRODUCTS } from './constants';
import CategorySidebar from './components/CategorySidebar';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import CustomizationModal from './components/CustomizationModal';
import OrderConfirmation from './components/OrderConfirmation';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [lastOrderNumber, setLastOrderNumber] = useState<string>('');

  const startOrder = () => setAppState(AppState.MENU);

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
    
    // Simulate API Call
    const orderNum = Math.floor(Math.random() * 900 + 100).toString();
    setLastOrderNumber(orderNum);
    setAppState(AppState.CONFIRMATION);
    
    // In a real app, we would POST to Flask backend here
    // const response = await fetch('/api/orders', { method: 'POST', body: JSON.stringify({ items: cart, total: totalPrice }) });
  };

  const resetOrder = () => {
    setCart([]);
    setAppState(AppState.HOME);
    setSelectedCategory(CATEGORIES[0].id);
  };

  if (appState === AppState.HOME) {
    return (
      <div 
        className="h-screen w-screen flex flex-col items-center justify-center bg-emerald-600 text-white p-8 cursor-pointer"
        onClick={startOrder}
      >
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-black uppercase tracking-tighter">QuickBite</h1>
          <p className="text-2xl font-medium opacity-90">Fresh • Fast • Delicious</p>
          <div className="mt-12 animate-pulse">
            <div className="bg-white text-emerald-600 px-12 py-6 rounded-full text-3xl font-bold shadow-2xl">
              TAP TO START ORDER
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 flex space-x-4">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">EN</span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">ES</span>
        </div>
      </div>
    );
  }

  if (appState === AppState.CONFIRMATION) {
    return <OrderConfirmation orderNumber={lastOrderNumber} onReset={resetOrder} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm shrink-0">
        <h2 className="text-2xl font-bold text-emerald-600">QuickBite</h2>
        <button 
          onClick={() => setAppState(AppState.HOME)}
          className="text-gray-500 font-semibold"
        >
          Cancel
        </button>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Categories */}
        <CategorySidebar 
          categories={CATEGORIES} 
          selectedId={selectedCategory} 
          onSelect={setSelectedCategory} 
        />

        {/* Products */}
        <div className="flex-1 overflow-y-auto p-6">
          <ProductGrid 
            products={PRODUCTS.filter(p => p.categoryId === selectedCategory)} 
            onProductClick={setCustomizingProduct} 
          />
        </div>

        {/* Cart */}
        <CartSidebar 
          items={cart} 
          totalPrice={totalPrice} 
          onUpdateQuantity={updateQuantity} 
          onCheckout={placeOrder} 
        />
      </main>

      {/* Customization Modal */}
      {customizingProduct && (
        <CustomizationModal 
          product={customizingProduct} 
          onClose={() => setCustomizingProduct(null)} 
          onAdd={addToCart} 
        />
      )}
    </div>
  );
};

export default App;
