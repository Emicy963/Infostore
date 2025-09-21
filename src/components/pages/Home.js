import React, { useEffect, useState } from "react";
import Carousel from "../common/Carousel";
import ProductCard from "../common/ProductCard";
import api from "../../services/api";
import { useCart } from "../../context/CartContext";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [slides, setSlides] = useState([
        { image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "PC Gaming Moderno" },
        { image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Laptop Profissional" },
        { image: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Desktop All-in-One" },
        { image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Setup Completo" },
    ]);
    const { fetchCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await api.get("/product_list");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        };

        fetchProducts();
        fetchCart();
    }, [fetchCart]);

    return (
        <div>
            {/* Hero Section */}
            <section className="pt-16 gradient-bg text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-on-scroll">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Vendas e Soluções <span className="text-yellow-300">Tecnológicas</span>
                            </h1>
                            <p className="text-xl mb-8 text-blue-100 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                                Na Infostore, oferecemos os melhores computadores e soluções tecnológicas em Angola. Qualidade, garantia e suporte técnico especializado.
                            </p>
                                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                                    <a href="#produtos" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg">
                                    Ver Produtos
                                    </a>
                                    <a href="tel:+244926625296" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 text-center hover:scale-105 hover:shadow-lg">
                                    <i className="fas fa-phone mr-2"></i>Ligar Agora
                                    </a>
                                </div>
                            </div>
                        <div className="relative animate-on-scroll">
                            <Carousel slides={slides} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 hover-lift animate-on-scroll">
                            <div className="bg-primary-light text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in glow">
                                <i className="fas fa-shield-alt text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
                            <p className="text-gray-600">Entregamos em toda Luanda com rapidez e segurança diretamente na sua casa ou escritório.</p>
                        </div>
                        <div className="text-center p-6 hover-lift animate-on-scroll" style={{animationDelay: "0.4s"}}>
                            <div className="bg-primary-light text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in glow">
                                <i className="fas fa-tools text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Instalação & Suporte</h3>
                            <p className="text-gray-600">Oferecemos instalação completa e suporte técnico contínuo para todos os clientes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="produtos" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 animate-on-scroll">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossos Produtos em <span className="text-primary">Destaque</span></h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Descubra nossa seleção de computadores de alta qualidade, perfeitos para trabalho, estudos e entretenimento.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} style={{animationDelay: `${index * 0.2}s`}} />
                        ))}
                    </div>
                    <div className="text-center mt-12 animate-on-scroll">
                        <a href="tel:+244926625296" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block hover:scale-105 hover:shadow-lg">
                            <i className="fab fa-whatsapp mr-2"></i>Ver Mais Produtos no WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
