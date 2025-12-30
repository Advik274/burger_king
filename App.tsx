
import React, { useState, useMemo } from 'react';
import { AppState, Category, Product, CartItem, ProductOption, UserRole } from './types';
import { CATEGORIES, PRODUCTS as INITIAL_PRODUCTS } from './constants';
import CategorySidebar from './components/CategorySidebar';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import CustomizationModal from './components/CustomizationModal';
import OrderConfirmation from './components/OrderConfirmation';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [lastOrderNumber, setLastOrderNumber] = useState<string>('');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === UserRole.ADMIN) {
      setAppState(AppState.ADMIN_DASHBOARD);
    } else {
      setAppState(AppState.HOME);
    }
  };

  const logout = () => {
    setUserRole(null);
    setAppState(AppState.LOGIN);
    setCart([]);
  };

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
    const orderNum = Math.floor(Math.random() * 900 + 100).toString();
    setLastOrderNumber(orderNum);
    setAppState(AppState.CONFIRMATION);
  };

  const resetOrder = () => {
    setCart([]);
    setAppState(AppState.HOME);
    setSelectedCategory(CATEGORIES[0].id);
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Router-like logic
  if (appState === AppState.LOGIN) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (appState === AppState.ADMIN_DASHBOARD) {
    return (
      <AdminDashboard 
        products={products} 
        categories={CATEGORIES} 
        onAddProduct={addProduct} 
        onDeleteProduct={deleteProduct}
        onLogout={logout}
      />
    );
  }

  if (appState === AppState.HOME) {
    return (
      <div 
        className="h-screen w-screen flex flex-col items-center justify-center bg-emerald-600 text-white p-8 cursor-pointer relative"
        onClick={startOrder}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); logout(); }}
          className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-bold border border-white/30 transition-colors"
        >
          Logout
        </button>
        <div className="text-center space-y-8">
          <h1 className="text-7xl font-black uppercase tracking-tighter">QuickBite</h1>
          <p className="text-2xl font-medium opacity-90">Fresh • Fast • Delicious</p>
          <div className="mt-12 animate-pulse">
            <div className="bg-white text-emerald-600 px-12 py-6 rounded-full text-3xl font-bold shadow-2xl">
              TAP TO START ORDER
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (appState === AppState.CONFIRMATION) {
    return <OrderConfirmation orderNumber={lastOrderNumber} onReset={resetOrder} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm shrink-0">
        <h2 className="text-2xl font-bold text-emerald-600">QuickBite</h2>
        <div className="flex items-center space-x-4">
           <button 
            onClick={() => setAppState(AppState.HOME)}
            className="text-gray-500 font-semibold px-4 py-1 hover:bg-gray-100 rounded-lg"
          >
            Cancel Order
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <CategorySidebar 
          categories={CATEGORIES} 
          selectedId={selectedCategory} 
          onSelect={setSelectedCategory} 
        />

        <div className="flex-1 overflow-y-auto p-6">
          <ProductGrid 
            products={products.filter(p => p.categoryId === selectedCategory)} 
            onProductClick={setCustomizingProduct} 
          />
        </div>

        <CartSidebar 
          items={cart} 
          totalPrice={totalPrice} 
          onUpdateQuantity={updateQuantity} 
          onCheckout={placeOrder} 
        />
      </main>

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
