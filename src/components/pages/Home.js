import React, { useEffect, useState } from "react";
import ProductCard from "../common/ProductCard";
import api from "../../services/api";
import { useCart } from "../../contexts/CartContext";

const Home = () => {
    const [products, setProducts] = useState([]);
    const { fetchCart } = useCart();

    // Estado para o carrossel
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "PC Gaming Moderno" },
        { image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Laptop Profissional" },
        { image: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Desktop All-in-One" },
        { image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Setup Completo" },
    ];

    // Funções do carrossel
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Auto-slide do carrossel
    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    // Animações de rolagem
    useEffect(() => {
        const handleScrollAnimations = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animate');
                }
            });
        };

        const toggleBackToTop = () => {
            const backToTopButton = document.getElementById('backToTop');
            if (backToTopButton) {
                if (window.scrollY > 300) {
                    backToTopButton.style.opacity = '1';
                    backToTopButton.style.pointerEvents = 'auto';
                } else {
                    backToTopButton.style.opacity = '0';
                    backToTopButton.style.pointerEvents = 'none';
                }
            }
        };

        // Rolagem suave para links âncora
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Fechar menu mobile se estiver aberto
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Botão "Voltar ao topo"
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Menu mobile
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Contador animado
        const animateCounter = (element, target, duration = 2000) => {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }
            
            updateCounter();
        };

        // Ativar contador quando visível
        const clientCounter = document.querySelector('.client-counter');
        if (clientCounter) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(clientCounter, 500);
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(clientCounter);
        }

        // Inicializar eventos de rolagem
        window.addEventListener('scroll', () => {
            handleScrollAnimations();
            toggleBackToTop();
        });

        // Inicializar ao carregar a página
        handleScrollAnimations();
        toggleBackToTop();

        // Limpar eventos ao desmontar
        return () => {
            window.removeEventListener('scroll', handleScrollAnimations);
        };
    }, []);

    // Carregar produtos
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
        <div className="bg-gray-50 overflow-x-hidden">
            {/* Particles Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="particle w-2 h-2 top-1/4 left-1/4" style={{animationDelay: '0s', animationDuration: '6s'}}></div>
                <div className="particle w-3 h-3 top-1/3 right-1/4" style={{animationDelay: '1s', animationDuration: '8s'}}></div>
                <div className="particle w-1 h-1 top-1/2 left-1/2" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
                <div className="particle w-2 h-2 top-3/4 right-1/3" style={{animationDelay: '3s', animationDuration: '7s'}}></div>
                <div className="particle w-1 h-1 top-1/5 right-1/5" style={{animationDelay: '4s', animationDuration: '5s'}}></div>
            </div>

            {/* Hero Section */}
            <section id="inicio" className="pt-16 gradient-bg text-white relative overflow-hidden">
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

                        {/* Carousel Container */}
                        <div className="relative animate-on-scroll">
                            <div className="carousel-container overflow-hidden rounded-lg shadow-2xl hover-lift glow">
                                <div className="carousel-track flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                    {slides.map((slide, index) => (
                                        <div key={index} className="carousel-slide w-full flex-shrink-0">
                                            <img src={slide.image} alt={slide.title} className="w-full h-80 object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Navigation Arrows */}
                            <button onClick={prevSlide} className="carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all hover:scale-110">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button onClick={nextSlide} className="carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all hover:scale-110">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                            
                            {/* Dots Indicators */}
                            <div className="carousel-dots flex justify-center mt-4 space-x-2">
                                {slides.map((_, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => goToSlide(index)}
                                        className={`dot w-3 h-3 rounded-full ${currentSlide === index ? 'bg-opacity-100' : 'bg-opacity-50'} bg-white hover:bg-opacity-100 transition-all hover:scale-125`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 hover-lift animate-on-scroll">
                            <div className="bg-primary-light text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in glow">
                                <i className="fas fa-shield-alt text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Garantia Completa</h3>
                            <p className="text-gray-600">Todos os nossos produtos vêm com garantia completa e suporte técnico especializado.</p>
                        </div>
                        <div className="text-center p-6 hover-lift animate-on-scroll" style={{animationDelay: '0.2s'}}>
                            <div className="bg-primary-light text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in glow">
                                <i className="fas fa-truck text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
                            <p className="text-gray-600">Entregamos em toda Luanda com rapidez e segurança diretamente na sua casa ou escritório.</p>
                        </div>
                        <div className="text-center p-6 hover-lift animate-on-scroll" style={{animationDelay: '0.4s'}}>
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
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <ProductCard key={product.id} product={product} style={{animationDelay: `${index * 0.2}s`}} />
                            ))
                        ) : (
                            // Produtos estáticos caso a API não retorne dados
                            <>
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift animate-on-scroll product-card">
                                    <div className="relative overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Computador Gaming" className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm animate-pulse">
                                            Novo
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">PC Gaming Pro</h3>
                                        <p className="text-gray-600 mb-4">Intel i5, 16GB RAM, GTX 1660 Super, 512GB SSD - Perfeito para jogos e trabalho pesado.</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-primary animate-pulse-slow">450.000 Kz</span>
                                            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                Consultar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift animate-on-scroll product-card" style={{animationDelay: '0.2s'}}>
                                    <div className="relative overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Laptop Business" className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
                                        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm animate-pulse">
                                            Popular
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Laptop Business</h3>
                                        <p className="text-gray-600 mb-4">Intel i7, 8GB RAM, 256GB SSD - Ideal para profissionais e estudantes universitários.</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-primary animate-pulse-slow">320.000 Kz</span>
                                            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                Consultar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift animate-on-scroll product-card" style={{animationDelay: '0.4s'}}>
                                    <div className="relative overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="All-in-One Desktop" className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
                                        <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-sm animate-pulse">
                                            Oferta
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Desktop All-in-One</h3>
                                        <p className="text-gray-600 mb-4">Intel i3, 8GB RAM, 1TB HDD - Solução completa para casa e escritório com design elegante.</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-primary animate-pulse-slow">180.000 Kz</span>
                                            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                Consultar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="text-center mt-12 animate-on-scroll">
                        <a href="tel:+244926625296" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block hover:scale-105 hover:shadow-lg">
                            <i className="fab fa-whatsapp mr-2"></i>Ver Mais Produtos no WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="servicos" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 animate-on-scroll">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossos <span className="text-primary">Serviços</span></h2>
                        <p className="text-xl text-gray-600">Soluções completas para todas as suas necessidades tecnológicas</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 hover-lift animate-on-scroll service-card">
                            <div className="bg-blue-100 text-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary hover:text-white transition-all duration-300 animate-float">
                                <i className="fas fa-laptop text-3xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Venda de Computadores</h3>
                            <p className="text-gray-600 text-sm">Ampla variedade de desktops e laptops para todas as necessidades.</p>
                        </div>

                        <div className="text-center p-6 hover-lift animate-on-scroll service-card" style={{animationDelay: '0.2s'}}>
                            <div className="bg-blue-100 text-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary hover:text-white transition-all duration-300 animate-float">
                                <i className="fas fa-wrench text-3xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Suporte Técnico</h3>
                            <p className="text-gray-600 text-sm">Manutenção e reparo de computadores com técnicos especializados.</p>
                        </div>

                        <div className="text-center p-6 hover-lift animate-on-scroll service-card" style={{animationDelay: '0.4s'}}>
                            <div className="bg-blue-100 text-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary hover:text-white transition-all duration-300 animate-float">
                                <i className="fas fa-cog text-3xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Instalação</h3>
                            <p className="text-gray-600 text-sm">Instalação de sistemas operativos e software especializado.</p>
                        </div>

                        <div className="text-center p-6 hover-lift animate-on-scroll service-card" style={{animationDelay: '0.6s'}}>
                            <div className="bg-blue-100 text-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary hover:text-white transition-all duration-300 animate-float">
                                <i className="fas fa-shipping-fast text-3xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Entrega</h3>
                            <p className="text-gray-600 text-sm">Entrega rápida e segura em toda a região de Luanda.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="sobre" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-on-scroll">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Sobre a <span className="text-primary">Infostore</span></h2>
                            <p className="text-lg text-gray-600 mb-6">
                                A Infostore é uma empresa angolana especializada em vendas e soluções tecnológicas. Atendemos desde gamers profissionais até estudantes e engenheiros, oferecendo produtos de qualidade com garantia completa.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                Nossa missão é democratizar o acesso à tecnologia em Angola, fornecendo computadores e soluções tecnológicas com os melhores preços do mercado, sem comprometer a qualidade.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-white rounded-lg hover-lift animate-scale-in">
                                    <div className="text-2xl font-bold text-primary animate-pulse-slow">
                                        <span className="client-counter">500</span>+
                                    </div>
                                    <div className="text-sm text-gray-600">Clientes Satisfeitos</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg hover-lift animate-scale-in" style={{animationDelay: '0.2s'}}>
                                    <div className="text-2xl font-bold text-primary animate-pulse-slow">2+</div>
                                    <div className="text-sm text-gray-600">Anos de Experiência</div>
                                </div>
                            </div>
                        </div>
                        <div className="animate-on-scroll" style={{animationDelay: '0.3s'}}>
                            <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Equipe Infostore" className="rounded-lg shadow-lg hover-lift glow" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contacto" className="py-16 gradient-bg text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 animate-on-scroll">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em <span className="text-yellow-300">Contacto</span></h2>
                        <p className="text-xl text-blue-100">Estamos aqui para ajudar com suas necessidades tecnológicas</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center animate-on-scroll hover-lift">
                            <div className="bg-white text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-all duration-300 animate-bounce-in glow">
                                <i className="fas fa-phone text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                            <p className="text-blue-100">+244 926 625 296</p>
                            <a href="tel:+244926625296" className="inline-block mt-2 bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                                Ligar Agora
                            </a>
                        </div>

                        <div className="text-center animate-on-scroll hover-lift" style={{animationDelay: '0.2s'}}>
                            <div className="bg-white text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-all duration-300 animate-bounce-in glow">
                                <i className="fas fa-envelope text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Email</h3>
                            <p className="text-blue-100">info@infostore.ao</p>
                            <a href="mailto:info@infostore.ao" className="inline-block mt-2 bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                                Enviar Email
                            </a>
                        </div>

                        <div className="text-center animate-on-scroll hover-lift" style={{animationDelay: '0.4s'}}>
                            <div className="bg-white text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-all duration-300 animate-bounce-in glow">
                                <i className="fas fa-map-marker-alt text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Localização</h3>
                            <p className="text-blue-100">Luanda, Angola</p>
                            <button className="mt-2 bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105" onClick={() => window.open('https://maps.google.com/?q=Luanda,Angola', '_blank')}>
                                Ver no Mapa
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-12 animate-on-scroll">
                        <h3 className="text-2xl font-semibold mb-6">Siga-nos nas Redes Sociais</h3>
                        <div className="flex justify-center space-x-6">
                            <a href="https://www.facebook.com/profile.php?id=100088151083799" className="bg-white text-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                <i className="fab fa-facebook-f text-xl"></i>
                            </a>
                            <a href="https://www.instagram.com/infostore_tecnology/" className="bg-white text-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="https://wa.me/244926625296" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                <i className="fab fa-whatsapp text-xl"></i>
                            </a>
                        </div>
                        <p className="text-blue-100 mt-4 animate-fade-in">@infostore_tecnology</p>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-on-scroll">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Fique por Dentro das <span className="text-primary">Novidades</span></h2>
                        <p className="text-gray-600 mb-8">Receba as últimas ofertas e novidades tecnológicas diretamente no seu WhatsApp</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="https://wa.me/244926625296?text=Olá! Quero receber as novidades da Infostore." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <i className="fab fa-whatsapp mr-2"></i>Receber Novidades
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* WhatsApp Float Button */}
            <a href="https://wa.me/244926625296" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 z-50 animate-bounce-in hover:scale-110">
                <i className="fab fa-whatsapp text-2xl"></i>
            </a>

            {/* Back to Top Button */}
            <button id="backToTop" className="fixed bottom-6 left-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-all duration-300 z-50 opacity-0 pointer-events-none">
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    );
};

export default Home;