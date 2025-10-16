import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Heart, TrendingUp, Zap, Package } from "lucide-react";
import api from "../../services/api";
import { useCart } from "../../contexts/CartContext";
import { useTheme } from "../../contexts/ThemeContext";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { fetchCart } = useCart();
    const { darkMode } = useTheme();
    
    // Banners promocionais para o carousel
    const promoBanners = [
        { 
            image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&h=400&fit=crop",
            title: "PCs Gaming com até 30% OFF",
            subtitle: "Os melhores preços em computadores para jogos",
            cta: "Ver Ofertas"
        },
        { 
            image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=1200&h=400&fit=crop",
            title: "Laptops Profissionais",
            subtitle: "Ideal para trabalho e produtividade",
            cta: "Comprar Agora"
        },
        { 
            image: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?w=1200&h=400&fit=crop",
            title: "Desktops All-in-One",
            subtitle: "Design elegante e economia de espaço",
            cta: "Explorar"
        },
        { 
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop",
            title: "Monte seu Setup Completo",
            subtitle: "Tudo que você precisa em um só lugar",
            cta: "Começar"
        }
    ];

    const sampleCategories = [
        { id: 1, name: "Desktop", slug: "desktop", count: 45, icon: "💻" },
        { id: 2, name: "Laptop", slug: "laptop", count: 67, icon: "🖥️" },
        { id: 3, name: "Gaming", slug: "gaming", count: 32, icon: "🎮" },
        { id: 4, name: "Acessórios", slug: "acessorios", count: 128, icon: "⌨️" },
        { id: 5, name: "Monitores", slug: "monitores", count: 54, icon: "🖱️" },
        { id: 6, name: "Componentes", slug: "componentes", count: 89, icon: "🔧" }
    ];

    // Carousel automático
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === promoBanners.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [promoBanners.length]);

    // Carregar produtos e categorias da API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/product_list");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await api.get("/category_list");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories(sampleCategories);
            }
        };

        fetchProducts();
        fetchCategories();
        fetchCart();
    }, [fetchCart]);

    const filteredProducts = selectedCategory 
        ? products.filter(p => p.category === selectedCategory)
        : products;

    const nextSlide = () => setCurrentSlide((prev) => (prev === promoBanners.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? promoBanners.length - 1 : prev - 1));

    return (
        <div className={`min-h-screen pt-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Categories Bar */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm sticky top-16 z-40`}>
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 font-medium ${
                                !selectedCategory 
                                    ? 'bg-primary text-white shadow-md' 
                                    : darkMode
                                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                        >
                            Todos os Produtos
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 font-medium ${
                                    selectedCategory === cat.name
                                        ? 'bg-primary text-white shadow-md'
                                        : darkMode
                                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                            >
                                <span className="mr-2">{cat.icon}</span>
                                {cat.name}
                                <span className="ml-2 text-xs opacity-75">({cat.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hero Banner Carousel */}
            <section className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-blue-100'} py-8`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <div 
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {promoBanners.map((banner, index) => (
                                <div key={index} className="min-w-full relative">
                                    <img 
                                        src={banner.image} 
                                        alt={banner.title}
                                        className="w-full h-64 md:h-96 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
                                        <div className="text-white px-8 md:px-16 max-w-2xl">
                                            <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                                                {banner.title}
                                            </h2>
                                            <p className="text-lg md:text-xl mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                                                {banner.subtitle}
                                            </p>
                                            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                                                {banner.cta}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all shadow-lg hover:scale-110"
                        >
                            <ChevronLeft className="text-gray-900" />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all shadow-lg hover:scale-110"
                        >
                            <ChevronRight className="text-gray-900" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {promoBanners.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Features */}
            <section className={`py-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Package, color: 'blue', title: 'Entrega Rápida', desc: 'Em toda Luanda', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                            { icon: Zap, color: 'green', title: 'Pagamento Seguro', desc: '100% Protegido', bg: 'bg-green-50 dark:bg-green-900/20' },
                            { icon: TrendingUp, color: 'yellow', title: 'Garantia Total', desc: 'Produtos originais', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
                            { icon: Star, color: 'purple', title: '500+ Clientes', desc: 'Satisfeitos', bg: 'bg-purple-50 dark:bg-purple-900/20' }
                        ].map((feature, index) => (
                            <div key={index} className={`flex items-center gap-3 p-4 ${feature.bg} rounded-lg`}>
                                <div className={`bg-${feature.color}-600 text-white p-3 rounded-full`}>
                                    <feature.icon size={24} />
                                </div>
                                <div>
                                    <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{feature.title}</h3>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {selectedCategory ? (
                                    <>Produtos: <span className="text-primary">{selectedCategory}</span></>
                                ) : (
                                    <>Todos os <span className="text-primary">Produtos</span></>
                                )}
                            </h2>
                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                                {filteredProducts.length} produtos encontrados
                            </p>
                        </div>
                        <select className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                            darkMode 
                                ? 'bg-gray-800 border-gray-700 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                        } border-2`}>
                            <option>Mais Relevantes</option>
                            <option>Menor Preço</option>
                            <option>Maior Preço</option>
                            <option>Mais Vendidos</option>
                            <option>Melhor Avaliados</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredProducts.map((product) => (
                            <div 
                                key={product.id}
                                className={`${
                                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                                } rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border`}
                            >
                                <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {product.badge && (
                                        <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            {product.badge}
                                        </span>
                                    )}
                                    {product.discount && (
                                        <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            -{product.discount}%
                                        </span>
                                    )}
                                    {!product.inStock && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                                                Esgotado
                                            </span>
                                        </div>
                                    )}
                                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110">
                                        <Heart size={18} className="text-red-500" />
                                    </button>
                                </div>
                                
                                <div className="p-4">
                                    <h3 className={`font-semibold mb-2 line-clamp-2 h-12 group-hover:text-primary transition-colors ${
                                        darkMode ? 'text-gray-200' : 'text-gray-900'
                                    }`}>
                                        {product.name}
                                    </h3>
                                    
                                    <div className="flex items-center gap-1 mb-3">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    size={14} 
                                                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                />
                                            ))}
                                        </div>
                                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            ({product.reviews})
                                        </span>
                                    </div>

                                    <div className="flex items-end justify-between mb-3">
                                        <div>
                                            {product.discount && (
                                                <div className={`text-sm line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {Math.round(parseFloat(product.price.replace(/\./g, '')) / (1 - product.discount / 100)).toLocaleString()} Kz
                                                </div>
                                            )}
                                            <div className="text-2xl font-bold text-primary">
                                                {product.price} Kz
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        disabled={!product.inStock}
                                        className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                                            product.inStock 
                                                ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg' 
                                                : darkMode
                                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📦</div>
                            <p className={`text-xl font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Nenhum produto encontrado nesta categoria.
                            </p>
                            <button 
                                onClick={() => setSelectedCategory(null)}
                                className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
                            >
                                Ver Todos os Produtos
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* WhatsApp Float Button */}
            <a 
                href="https://wa.me/244926625296" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50 animate-bounce"
            >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            </a>
        </div>
    );
};

export default Home;