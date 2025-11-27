import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Menu, Hammer, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { PRODUCTS, APP_NAME } from './constants';
import { Product, CartItem, Category } from './types';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { AssistantChat } from './components/AssistantChat';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Cart logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        {/* Top bar (contact) */}
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex gap-4">
              <span className="flex items-center gap-1 hover:text-white cursor-pointer"><Phone size={12} /> +34 912 345 678</span>
              <span className="flex items-center gap-1 hover:text-white cursor-pointer"><Mail size={12} /> contacto@elmaestro.com</span>
              <span className="flex items-center gap-1 hover:text-white cursor-pointer"><MapPin size={12} /> Av. Principal 123, Madrid</span>
            </div>
            <div className="flex gap-3">
              <span className="hover:text-orange-500 cursor-pointer">Envíos Gratis &gt; $50</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {setSelectedCategory('Todos'); setSearchTerm('');}}>
              <div className="bg-orange-600 p-2 rounded-lg group-hover:bg-orange-700 transition-colors">
                <Hammer className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight hidden sm:block">
                Ferretería <span className="text-orange-600">El Maestro</span>
              </h1>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
              <input
                type="text"
                placeholder="Buscar herramientas, pintura, materiales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
              />
              <Search className="absolute left-3.5 top-2.5 text-slate-400" size={18} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                className="relative p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-700"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={22} />
                {cartTotalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartTotalItems}
                  </span>
                )}
              </button>
              
              <button 
                className="md:hidden p-2.5 hover:bg-slate-100 rounded-full text-slate-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="mt-4 md:hidden relative">
            <input
              type="text"
              placeholder="¿Qué necesitas hoy?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
            />
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
          </div>
        </div>

        {/* Categories Bar */}
        <div className={`md:block border-t border-slate-100 bg-white ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-4">
            <nav className="flex flex-col md:flex-row gap-1 md:gap-6 py-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => { setSelectedCategory('Todos'); setIsMobileMenuOpen(false); }}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selectedCategory === 'Todos' ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'}`}
              >
                Todos
              </button>
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setIsMobileMenuOpen(false); }}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'}`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Hero Section (only show when not searching) */}
        {!searchTerm && selectedCategory === 'Todos' && (
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">Construye tus sueños con las mejores herramientas</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-xl">Encuentra todo lo que necesitas para tus proyectos de hogar, construcción y jardín. Calidad profesional garantizada.</p>
              <div className="flex gap-4">
                 <Button size="lg" onClick={() => {
                    const el = document.getElementById('products-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                 }}>
                   Ver Catálogo
                 </Button>
                 <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white" size="lg"
                    onClick={() => document.querySelector<HTMLButtonElement>('button[aria-label="Chat"]')?.click()}
                 >
                   Consultar a la IA
                 </Button>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6" id="products-grid">
          <h2 className="text-xl font-bold text-slate-800">
            {searchTerm ? `Resultados para "${searchTerm}"` : selectedCategory === 'Todos' ? 'Productos Destacados' : selectedCategory}
          </h2>
          <span className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
            {filteredProducts.length} productos
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">No se encontraron productos</h3>
            <p className="text-slate-500">Intenta con otros términos o cambia la categoría.</p>
            <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}>
              Ver todos los productos
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-orange-600 p-1.5 rounded-lg">
                <Hammer className="text-white" size={18} />
              </div>
              <h3 className="text-white font-bold text-lg">El Maestro</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Tu aliado experto en construcción y mejoras del hogar. Calidad y servicio desde 1995.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Herramientas Eléctricas</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Pinturas y Acabados</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Fontanería</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Jardinería</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Atención al Cliente</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Garantía de Productos</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contactar Soporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Recibe ofertas exclusivas y consejos de expertos.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Tu email" className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm w-full focus:ring-1 focus:ring-orange-500" />
              <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg px-3 py-2 transition-colors">OK</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>© {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          alert('¡Gracias por tu compra! Esta es una demo.');
          setCartItems([]);
          setIsCartOpen(false);
        }}
      />

      {/* AI Assistant */}
      <AssistantChat />
    </div>
  );
};

export default App;